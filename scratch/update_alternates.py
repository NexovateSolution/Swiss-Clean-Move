from pathlib import Path
import re

locale_dir = Path('src/app/[locale]')
pages = list(locale_dir.glob('*/page.tsx'))

pattern = re.compile(r'alternates:\s*\{\s*canonical:\s*`/\$\{locale\}/([^`]+)`\s*\},?')

count = 0
for p in pages:
    txt = p.read_text(encoding='utf-8')
    m = pattern.search(txt)
    if m:
        slug = m.group(1)
        replacement = f"""alternates: {{
      canonical: `https://www.swisscleanmove.ch/${{locale}}/{slug}`,
      languages: {{
        de: 'https://www.swisscleanmove.ch/de/{slug}',
        en: 'https://www.swisscleanmove.ch/en/{slug}',
        fr: 'https://www.swisscleanmove.ch/fr/{slug}',
        it: 'https://www.swisscleanmove.ch/it/{slug}',
        'x-default': 'https://www.swisscleanmove.ch/de/{slug}'
      }}
    }},"""
        new_txt = pattern.sub(replacement, txt)
        p.write_text(new_txt, encoding='utf-8')
        count += 1
        print(f"Updated {p.parent.name} -> slug: {slug}")

print(f"\nSuccessfully updated {count} files.")
