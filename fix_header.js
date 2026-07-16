const fs = require('fs');
let content = fs.readFileSync('src/components/Header.tsx', 'utf8');

// Desktop Language Switcher
const frDesktopBlock = `
                    <button
                      onClick={() => {
                      switchLocale('fr');
                      setIsLangDropdownOpen(false);
                    }}
                    className={\`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors \${locale === 'fr' ? 'text-swiss-blue font-medium' : 'text-gray-700'
                      }\`}
                  >
                    🇫🇷 Français
                  </button>
`;

const itDesktopBlock = `
                    <button
                      onClick={() => {
                      switchLocale('it');
                      setIsLangDropdownOpen(false);
                    }}
                    className={\`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors \${locale === 'it' ? 'text-swiss-blue font-medium' : 'text-gray-700'
                      }\`}
                  >
                    🇮🇹 Italiano
                  </button>
`;

// Mobile Language Switcher
const frMobileBlock = `
                  <button
                    onClick={() => {
                      switchLocale('fr');
                      setIsMenuOpen(false);
                    }}
                    className={\`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all \${locale === 'fr'
                      ? 'bg-swiss-red text-white shadow-subtle'
                      : 'text-swiss-body hover:text-swiss-text hover:bg-white'
                      }\`}
                  >
                    🇫🇷 FR
                  </button>
`;

const itMobileBlock = `
                  <button
                    onClick={() => {
                      switchLocale('it');
                      setIsMenuOpen(false);
                    }}
                    className={\`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all \${locale === 'it'
                      ? 'bg-swiss-red text-white shadow-subtle'
                      : 'text-swiss-body hover:text-swiss-text hover:bg-white'
                      }\`}
                  >
                    🇮🇹 IT
                  </button>
`;

// Replace desktop
if (content.includes("🇫🇷 Français") && !content.includes("🇮🇹 Italiano")) {
  // Simple injection
  content = content.replace(/(<button[^>]*>[\s]*🇫🇷 Français[\s]*<\/button>)/, `$1${itDesktopBlock}`);
}

// Replace mobile
if (content.includes("🇫🇷 FR") && !content.includes("🇮🇹 IT")) {
  content = content.replace(/(<button[^>]*>[\s]*🇫🇷 FR[\s]*<\/button>)/, `$1${itMobileBlock}`);
}

fs.writeFileSync('src/components/Header.tsx', content);
console.log('Header updated with Italian.');
