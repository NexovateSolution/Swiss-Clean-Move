const fs = require('fs');
const translate = require('translate').default;
const glob = require('glob');

translate.engine = 'google';

async function translateText(text) {
  await new Promise(r => setTimeout(r, 200));
  try {
    return await translate(text, { from: 'en', to: 'it' });
  } catch (e) {
    console.error('Translation error:', e.message);
    return text;
  }
}

function escapeStr(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

async function processRegionPage(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Find the English block to extract data
  // Look for en: { ... } block
  const enMatch = content.match(/\ben:\s*\{[\s\S]*?slug:\s*'([^']+)'[\s\S]*?regionName:\s*'([^']+)'[\s\S]*?seoTitle:\s*'([^']+)'[\s\S]*?metaDescription:\s*'([^']+)'[\s\S]*?h1:\s*'([^']+)'/);
  
  if (!enMatch) {
    // Try from fr block if no en block
    const frMatch = content.match(/\bfr:\s*\{[\s\S]*?slug:\s*'([^']+)'/);
    if (frMatch) {
      console.log('Skipping (FR-first, no EN data to extract):', filePath);
    } else {
      console.log('Could not find data in', filePath);
    }
    return;
  }

  const slug = enMatch[1];
  const regionName = await translateText(enMatch[2]);
  const seoTitle = await translateText(enMatch[3]);
  const metaDescription = await translateText(enMatch[4]);
  const h1 = await translateText(enMatch[5]);

  // Extract highSeoKeywords from EN block
  const enBlock = content.match(/\ben:\s*\{([\s\S]*?)(?=\n\s*\},?\s*\n\s*(?:fr|de|en)\s*:|(?:\n};))/);
  let highSeoKeywords = [];
  if (enBlock) {
    const kwMatch = enBlock[1].match(/highSeoKeywords:\s*\[([\s\S]*?)\]/);
    if (kwMatch) {
      const kws = kwMatch[1].match(/'([^']+)'/g);
      if (kws) {
        for (const kw of kws) {
          highSeoKeywords.push(await translateText(kw.replace(/'/g, '')));
        }
      }
    }
  }

  // Extract localKeywords (city names - keep as-is)
  let localKeywords = [];
  const localKwMatch = content.match(/en:\s*\{[\s\S]*?localKeywords:\s*(\[[^\]]+\])/);
  if (localKwMatch) {
    const lks = localKwMatch[1].match(/'([^']+)'/g);
    if (lks) localKeywords = lks.map(k => k.replace(/'/g, ''));
  }

  // Extract introParagraphs from EN
  let introParagraphs = [];
  const introMatch = content.match(/en:\s*\{[\s\S]*?introParagraphs:\s*\[\s*([\s\S]*?)\s*\]\s*,/);
  if (introMatch) {
    const paras = introMatch[1].match(/'([\s\S]*?)(?<!\\)'/g);
    if (paras) {
      for (const p of paras) {
        const clean = p.replace(/^'|'$/g, '').replace(/\\'/g, "'");
        introParagraphs.push(await translateText(clean));
      }
    }
  }

  // Extract FAQs from EN
  let faqs = [];
  const faqMatch = content.match(/en:\s*\{[\s\S]*?faqs:\s*\[([\s\S]*?)\]\s*,/);
  if (faqMatch) {
    const qMatches = [...faqMatch[1].matchAll(/question:\s*'([\s\S]*?)(?<!\\)'/g)];
    const aMatches = [...faqMatch[1].matchAll(/answer:\s*'([\s\S]*?)(?<!\\)'/g)];
    for (let i = 0; i < Math.min(qMatches.length, aMatches.length); i++) {
      faqs.push({
        question: await translateText(qMatches[i][1].replace(/\\'/g, "'")),
        answer: await translateText(aMatches[i][1].replace(/\\'/g, "'"))
      });
    }
  }

  // Extract mapQuery from EN
  const mapQueryMatch = content.match(/en:\s*\{[\s\S]*?mapQuery:\s*'([^']+)'/);
  const mapQuery = mapQueryMatch ? mapQueryMatch[1] : '';

  // Build the Italian block
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

  // Now find the CORRECT insertion point: the D record's closing };
  // Strategy: find the line with "const D:" then find the FIRST "};" after the last locale block
  // Look for the pattern: closing brace of last locale entry followed by "\n};"
  
  // Find the position of "const D:" 
  const dIdx = content.indexOf('const D:');
  if (dIdx === -1) {
    console.log('Cannot find const D: in', filePath);
    return;
  }
  
  // From dIdx, find the first "};\n" or "};\r\n" that closes the D record
  // We need to find the }; that corresponds to the Record<string, RegionPageData> = { ... };
  // It's the first }; that appears after the closing of the last locale block
  const afterD = content.substring(dIdx);
  
  // Find "export" which comes after the D record
  const exportIdx = afterD.indexOf('\nexport');
  if (exportIdx === -1) {
    console.log('Cannot find export after D in', filePath);
    return;
  }
  
  // The }; should be right before export
  const dSection = afterD.substring(0, exportIdx);
  const lastClosingBrace = dSection.lastIndexOf('};');
  
  if (lastClosingBrace === -1) {
    console.log('Cannot find closing }; in', filePath);
    return;
  }
  
  // The actual position in the full content
  const insertPos = dIdx + lastClosingBrace;
  
  // Check if we need a comma after the last locale block
  const beforeInsert = content.substring(0, insertPos).trimEnd();
  const needsComma = !beforeInsert.endsWith(',');
  
  const result = content.substring(0, insertPos) + (needsComma ? ',\n' : '\n') + itBlock + '\n' + content.substring(insertPos);
  
  fs.writeFileSync(filePath, result, 'utf8');
  console.log(`Updated ${filePath}`);
}

async function run() {
  const regionFiles = glob.sync('src/app/[[]locale]/*/page.tsx').filter(f => {
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
