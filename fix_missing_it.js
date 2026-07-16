const fs = require('fs');
const ts = require('typescript');
const glob = require('glob');
const translate = require('translate').default;

translate.engine = 'google';

const files = glob.sync('src/**/*.{ts,tsx,js,jsx}');

async function run() {
  let totalInjected = 0;

  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    const sourceFile = ts.createSourceFile(file, content, ts.ScriptTarget.Latest, true);
    let edits = [];

    async function processNode(node) {
      if (ts.isObjectLiteralExpression(node)) {
        const props = node.properties;
        const keys = props.map(p => p.name && ts.isIdentifier(p.name) ? p.name.text : (p.name && ts.isStringLiteral(p.name) ? p.name.text : null));
        
        if (keys.includes('en') && keys.includes('de') && keys.includes('fr') && !keys.includes('it')) {
          const enProp = props.find(p => (p.name.text === 'en' || (ts.isStringLiteral(p.name) && p.name.text === 'en')));
          if (enProp && enProp.initializer) {
            let rawText = '';
            // Just extract the raw code string
            rawText = content.substring(enProp.initializer.pos, enProp.initializer.end).trim();
            // Remove wrapping quotes/backticks
            rawText = rawText.replace(/^[`"']|[`"']$/g, '');

            try {
              // Wait slightly to avoid limits
              await new Promise(r => setTimeout(r, 200));
              let translation = await translate(rawText, { from: 'en', to: 'it' });
              
              if (translation) {
                let escaped = translation.replace(/`/g, '\\`').replace(/\$/g, '\\$');
                edits.push({
                  pos: props[props.length - 1].end,
                  text: `, it: \`${escaped}\``
                });
                totalInjected++;
                console.log('Translated one missing item in', file);
              }
            } catch (e) {
              console.error('Failed to translate:', rawText, e.message);
            }
          }
        }
      }
      for (const child of node.getChildren(sourceFile)) {
        await processNode(child);
      }
    }

    await processNode(sourceFile);

    if (edits.length > 0) {
      edits.sort((a, b) => b.pos - a.pos);
      for (const edit of edits) {
        content = content.slice(0, edit.pos) + edit.text + content.slice(edit.pos);
      }
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated ${file} with missing translations`);
    }
  }
  
  console.log(`Finished! Total newly injected: ${totalInjected}`);
}

run();
