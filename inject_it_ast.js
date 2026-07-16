const fs = require('fs');
const ts = require('typescript');
const glob = require('glob');

const files = glob.sync('src/**/*.{ts,tsx,js,jsx}');
const data = JSON.parse(fs.readFileSync('to_translate.json', 'utf8'));

let injectedCount = 0;

function injectIt(sourceFile) {
  let content = sourceFile.text;
  let edits = [];

  function visit(node) {
    if (ts.isObjectLiteralExpression(node)) {
      const props = node.properties;
      const keys = props.map(p => p.name && ts.isIdentifier(p.name) ? p.name.text : (p.name && ts.isStringLiteral(p.name) ? p.name.text : null));
      
      if (keys.includes('en') && keys.includes('de') && keys.includes('fr') && !keys.includes('it')) {
        const enProp = props.find(p => (p.name.text === 'en' || (ts.isStringLiteral(p.name) && p.name.text === 'en')));
        if (enProp && enProp.initializer) {
          let enText = '';
          if (ts.isStringLiteral(enProp.initializer) || ts.isNoSubstitutionTemplateLiteral(enProp.initializer)) {
            enText = enProp.initializer.text;
          } else if (ts.isTemplateExpression(enProp.initializer)) {
            // Very naive extraction of template expression, we stored the raw text in the earlier regex anyway
            // We just match against the known string keys
            const raw = content.substring(enProp.initializer.pos, enProp.initializer.end).trim();
            // Just use the regex approach to match what we stored
            enText = raw;
          }

          if (enText) {
            // Find the corresponding translation by fuzzy matching the key since we cleaned it
            let strKey = enText.replace(/\\n/g, ' ').replace(/\s+/g, ' ').trim();
            // If it's a template expression, the raw text starts with backticks
            strKey = strKey.replace(/^[`"']|[`"']$/g, '').trim();

            let translation = '';
            // Try direct match
            if (data[strKey] && data[strKey].it) {
               translation = data[strKey].it;
            } else {
               // Try matching by the original extracted
               const entry = Object.values(data).find(v => v.original && v.original.replace(/\\n/g, ' ').replace(/\s+/g, ' ').trim() === strKey);
               if (entry && entry.it) {
                 translation = entry.it;
               } else {
                 // Try loose include match for big templates
                 const entryLoose = Object.values(data).find(v => v.original && v.original.includes(strKey));
                 if (entryLoose && entryLoose.it) translation = entryLoose.it;
               }
            }

            if (translation) {
              // We inject it using backticks to allow newlines safely
              let escaped = translation.replace(/`/g, '\\`').replace(/\$/g, '\\$');
              edits.push({
                pos: props[props.length - 1].end,
                text: `, it: \`${escaped}\``
              });
              injectedCount++;
            }
          }
        }
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  if (edits.length > 0) {
    // Sort edits from end to start so positions don't shift
    edits.sort((a, b) => b.pos - a.pos);
    for (const edit of edits) {
      content = content.slice(0, edit.pos) + edit.text + content.slice(edit.pos);
    }
    return content;
  }
  return null;
}

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const sourceFile = ts.createSourceFile(
    file,
    content,
    ts.ScriptTarget.Latest,
    true
  );

  const newContent = injectIt(sourceFile);
  if (newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Updated ${file}`);
  }
});

console.log(`Injected ${injectedCount} translations.`);
