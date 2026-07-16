const fs = require('fs');
const translate = require('translate').default;
const glob = require('glob');

translate.engine = 'google';

async function translateText(text, from = 'en', to = 'it') {
  await new Promise(r => setTimeout(r, 200));
  try {
    return await translate(text, { from, to });
  } catch (e) {
    console.error('Translation error:', e.message);
    return text;
  }
}

async function processRegionPage(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract the English block
  const enBlockMatch = content.match(/en:\s*\{([\s\S]*?)\}\s*,\s*fr:/);
  if (!enBlockMatch) {
    console.log('Could not find EN block in', filePath);
    return;
  }

  // Parse key data from English block using regex
  const en = {};
  const slugMatch = content.match(/en:\s*\{[^}]*slug:\s*'([^']+)'/);
  const regionNameMatch = content.match(/en:\s*\{[^}]*regionName:\s*'([^']+)'/);
  const seoTitleMatch = content.match(/en:\s*\{[^}]*seoTitle:\s*'([^']+)'/);
  const metaDescMatch = content.match(/en:\s*\{[^}]*metaDescription:\s*'([^']+)'/);
  const h1Match = content.match(/en:\s*\{[^}]*h1:\s*'([^']+)'/);
  const mapQueryMatch = content.match(/en:\s*\{[^}]*mapQuery:\s*'([^']+)'/);
  
  // Extract localKeywords (same for all languages)
  const localKwMatch = content.match(/en:\s*\{[\s\S]*?localKeywords:\s*(\[[^\]]+\])/);
  
  // Extract introParagraphs
  const introMatch = content.match(/en:\s*\{[\s\S]*?introParagraphs:\s*\[([\s\S]*?)\]\s*,\s*faqs/);
  
  // Extract faqs
  const faqsMatch = content.match(/en:\s*\{[\s\S]*?faqs:\s*\[([\s\S]*?)\]\s*,\s*mapQuery/);

  if (!slugMatch || !regionNameMatch || !seoTitleMatch || !metaDescMatch || !h1Match) {
    console.log('Could not parse EN fields in', filePath);
    return;
  }

  const slug = slugMatch[1];
  const regionName = await translateText(regionNameMatch[1]);
  const seoTitle = await translateText(seoTitleMatch[1]);
  const metaDescription = await translateText(metaDescMatch[1]);
  const h1 = await translateText(h1Match[1]);
  const mapQuery = mapQueryMatch ? mapQueryMatch[1] : '';

  // Translate highSeoKeywords
  const highSeoKwMatch = content.match(/en:\s*\{[\s\S]*?highSeoKeywords:\s*\[([\s\S]*?)\]/);
  let highSeoKeywords = [];
  if (highSeoKwMatch) {
    const kwStr = highSeoKwMatch[1];
    const kws = kwStr.match(/'([^']+)'/g);
    if (kws) {
      for (const kw of kws) {
        const clean = kw.replace(/'/g, '');
        highSeoKeywords.push(await translateText(clean));
      }
    }
  }

  // localKeywords stay the same (city names)
  let localKeywords = [];
  if (localKwMatch) {
    const lks = localKwMatch[1].match(/'([^']+)'/g);
    if (lks) localKeywords = lks.map(k => k.replace(/'/g, ''));
  }

  // Translate introParagraphs
  let introParagraphs = [];
  if (introMatch) {
    const paras = introMatch[1].match(/'([\s\S]*?)'/g);
    if (paras) {
      for (const p of paras) {
        const clean = p.replace(/^'|'$/g, '');
        introParagraphs.push(await translateText(clean));
      }
    }
  }

  // Translate FAQs
  let faqs = [];
  if (faqsMatch) {
    const faqStr = faqsMatch[1];
    const qMatches = faqStr.match(/question:\s*'([^']+)'/g);
    const aMatches = faqStr.match(/answer:\s*'([^']+)'/g);
    if (qMatches && aMatches) {
      for (let i = 0; i < qMatches.length; i++) {
        const q = qMatches[i].match(/question:\s*'([^']+)'/)[1];
        const a = aMatches[i].match(/answer:\s*'([^']+)'/)[1];
        faqs.push({
          question: await translateText(q),
          answer: await translateText(a)
        });
      }
    }
  }

  // Build the Italian block
  const escapeStr = s => s.replace(/'/g, "\\'");
  
  let itBlock = `  it: {\n`;
  itBlock += `    slug: '${slug}', regionName: '${escapeStr(regionName)}',\n`;
  itBlock += `    seoTitle: '${escapeStr(seoTitle)}',\n`;
  itBlock += `    metaDescription: '${escapeStr(metaDescription)}',\n`;
  itBlock += `    h1: '${escapeStr(h1)}',\n`;
  itBlock += `    highSeoKeywords: [${highSeoKeywords.map(k => `'${escapeStr(k)}'`).join(',')}],\n`;
  itBlock += `    localKeywords: [${localKeywords.map(k => `'${k}'`).join(',')}],\n`;
  itBlock += `    introParagraphs: [\n`;
  for (const p of introParagraphs) {
    itBlock += `      '${escapeStr(p)}',\n`;
  }
  itBlock += `    ],\n`;
  itBlock += `    faqs: [\n`;
  for (const f of faqs) {
    itBlock += `      { question: '${escapeStr(f.question)}', answer: '${escapeStr(f.answer)}' },\n`;
  }
  itBlock += `    ],\n`;
  itBlock += `    mapQuery: '${mapQuery}'\n`;
  itBlock += `  }`;

  // Insert the Italian block before the closing `};`
  const newContent = content.replace(/\n\};\s*$/, `,\n${itBlock}\n};\n`);
  
  // Also handle the case where there's content after };
  const finalContent = newContent.replace(/(\n\s*\}\s*)\n};/, `$1,\n${itBlock}\n};`);
  
  // Just find the last }; and insert before it  
  const lastBrace = content.lastIndexOf('};');
  if (lastBrace === -1) {
    console.log('Could not find closing }; in', filePath);
    return;
  }
  
  // Check if we need a comma before the it block
  const beforeBrace = content.substring(0, lastBrace).trimEnd();
  const needsComma = !beforeBrace.endsWith(',');
  
  const result = content.substring(0, lastBrace) + (needsComma ? ',\n' : '\n') + itBlock + '\n};\n' + content.substring(lastBrace + 2).trimStart();
  
  fs.writeFileSync(filePath, result, 'utf8');
  console.log(`Updated ${filePath} with Italian RegionPageData`);
}

async function run() {
  const regionFiles = glob.sync('src/app/[[]locale]/*/page.tsx').filter(f => {
    // Only region pages that have RegionPageData
    const content = fs.readFileSync(f, 'utf8');
    return content.includes('RegionPageData') && !content.match(/\bit\s*:\s*\{/);
  });

  console.log(`Found ${regionFiles.length} region pages to translate`);
  
  for (const file of regionFiles) {
    await processRegionPage(file);
  }
  
  console.log('Done!');
}

run();
