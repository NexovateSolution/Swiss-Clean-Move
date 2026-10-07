const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('page.tsx')) results.push(file);
    }
  });
  return results;
}

const files = walk('src/app/[locale]');
let modified = 0;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (content.includes('generateMetadata') && !content.includes('alternates: {')) {
    
    let relativeRoute = f.replace(/\\/g, '/').replace('src/app/[locale]/', '');
    relativeRoute = relativeRoute.replace(/\/page\.tsx$/, '');
    
    if (relativeRoute === 'page.tsx') {
      relativeRoute = '';
    }
    
    relativeRoute = relativeRoute.replace(/\[([^\]]+)\]/g, '${$1}');
    
    let canonicalPath = '`/${locale}';
    if (relativeRoute) {
      canonicalPath += '/' + relativeRoute;
    }
    canonicalPath += '`';

    // More generic regex: match `return {` followed by any whitespace and then capture whatever is there
    // We just want to insert `alternates: { ... },` right after `return {`
    const regex = /return\s+\{([\s\S]*?)\};/;
    if (regex.test(content)) {
      content = content.replace(/return\s+\{/, (match) => {
        return `return {\n    alternates: {\n      canonical: ${canonicalPath}\n    },`;
      });
      fs.writeFileSync(f, content, 'utf8');
      modified++;
    } else {
      console.log('Could not match return block in', f);
    }
  }
});

console.log('Modified files in second run:', modified);
