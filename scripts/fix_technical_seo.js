const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, searchRegex, replacement) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(searchRegex, replacement);
  fs.writeFileSync(filePath, content, 'utf8');
}

// 1. Fix sitemap.ts
const sitemapPath = path.join(__dirname, '..', 'src', 'app', 'sitemap.ts');
let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
sitemapContent = sitemapContent.replace(
  "const baseUrl = 'https://swisscleanmove.ch';",
  "const baseUrl = 'https://www.swisscleanmove.ch';"
);
sitemapContent = sitemapContent.replace(/['"`]\/endreinigung-biel['"`],?\s*/g, '');
if (!sitemapContent.includes('/umzugsreinigung-biel')) {
  sitemapContent = sitemapContent.replace(/('\/entsorgung-biel',)/, "'/umzugsreinigung-biel',\n    '/bueroreinigung-biel',\n    $1");
}
// Fix sitemap url to point to default locale 'de'
sitemapContent = sitemapContent.replace(/url:\s*`\$\{baseUrl\}\$\{path\}`/, 'url: `${baseUrl}/de${path}`');
fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');

// 2. Fix robots.txt
const robotsPath = path.join(__dirname, '..', 'public', 'robots.txt');
replaceInFile(robotsPath, /https:\/\/swisscleanmove\.ch\/sitemap\.xml/g, 'https://www.swisscleanmove.ch/sitemap.xml');

// 3. Fix layout.tsx
const layoutPath = path.join(__dirname, '..', 'src', 'app', '[locale]', 'layout.tsx');
let layoutContent = fs.readFileSync(layoutPath, 'utf8');
// Remove alternates block
layoutContent = layoutContent.replace(/alternates:\s*\{[\s\S]*?languages:\s*\{[\s\S]*?\}\s*\},/, "metadataBase: new URL('https://www.swisscleanmove.ch'),");
fs.writeFileSync(layoutPath, layoutContent, 'utf8');

// 4. Fix Region pages and SEO landing pages to use www.
function walkAndFix(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkAndFix(fullPath);
    } else if (file === 'page.tsx' || file === 'layout.tsx') {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      // Fix non-www URLs
      if (content.includes('https://swisscleanmove.ch/')) {
        content = content.replace(/https:\/\/swisscleanmove\.ch\//g, 'https://www.swisscleanmove.ch/');
        changed = true;
      }
      
      // Inject missing hreflang to region pages
      // Look for: alternates: { canonical: `https://www.swisscleanmove.ch/${locale}/regionName` }
      const match = content.match(/alternates:\s*\{\s*canonical:\s*`https:\/\/www\.swisscleanmove\.ch\/\$\{locale\}\/([^`]+)`\s*\}/);
      if (match && !content.includes('languages:')) {
        const slug = match[1];
        const newAlternates = `alternates: { 
      canonical: \`https://www.swisscleanmove.ch/\${locale}/${slug}\`,
      languages: {
        de: \`https://www.swisscleanmove.ch/de/${slug}\`,
        en: \`https://www.swisscleanmove.ch/en/${slug}\`,
        fr: \`https://www.swisscleanmove.ch/fr/${slug}\`,
        it: \`https://www.swisscleanmove.ch/it/${slug}\`,
        'x-default': \`https://www.swisscleanmove.ch/de/${slug}\`
      }
    }`;
        content = content.replace(match[0], newAlternates);
        changed = true;
      }
      
      // Replace endreinigung-biel with umzugsreinigung-biel
      if (content.includes('/endreinigung-biel')) {
        // Only if it's not the redirect config
        content = content.replace(/\/endreinigung-biel/g, '/umzugsreinigung-biel');
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}
walkAndFix(path.join(__dirname, '..', 'src', 'app', '[locale]'));

// 5. Fix references in lib/
function fixLib(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fixLib(fullPath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('/endreinigung-biel')) {
        content = content.replace(/\/endreinigung-biel/g, '/umzugsreinigung-biel');
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}
fixLib(path.join(__dirname, '..', 'src', 'lib'));
fixLib(path.join(__dirname, '..', 'src', 'components'));

console.log('Technical SEO fixes applied successfully.');
