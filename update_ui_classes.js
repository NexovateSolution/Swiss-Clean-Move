const fs = require('fs');
const glob = require('glob');
const path = require('path');

const inputClass = 'w-full px-3 py-2 border border-gray-300 rounded-sm bg-white focus:ring-1 focus:ring-swiss-red focus:border-swiss-red outline-none text-sm';
const labelClass = 'block text-sm font-semibold text-[#0A1C3E] mb-1';
const checkboxClass = 'accent-swiss-red w-4 h-4 rounded-sm border-gray-300 cursor-pointer flex-shrink-0';

const files = glob.sync('src/components/universal-form/slices/*.tsx');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  // Inject the class constants if they don't exist
  if (!content.includes('const inputClass =')) {
    content = content.replace(/export default function[^{]+\{\n/, (match) => {
      return match + `  const inputClass = "${inputClass}";\n  const labelClass = "${labelClass}";\n  const checkboxClass = "${checkboxClass}";\n\n`;
    });
    changed = true;
  }
  
  const original = content;
  
  content = content.replace(/className=\"w-full px-4 py-3 border border-swiss-border rounded-lg bg-white focus:ring-2 focus:ring-swiss-red\/20 focus:border-swiss-red transition-colors\"/g, 'className={inputClass}');
  content = content.replace(/className=\"block text-sm font-medium text-swiss-text mb-2\"/g, 'className={labelClass}');
  
  // Custom checkbox replacements
  content = content.replace(/className=\"accent-swiss-red w-5 h-5 flex-shrink-0 mt-0.5\"/g, 'className={checkboxClass}');
  content = content.replace(/className=\"mr-2 accent-swiss-red\"/g, 'className={checkboxClass}');
  content = content.replace(/className=\"accent-swiss-red\"/g, 'className={checkboxClass}');
  
  if (changed || content !== original) {
    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
});
