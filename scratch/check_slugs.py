from pathlib import Path
import re

locale_dir = Path('src/app/[locale]')
pages = list(locale_dir.glob('*/page.tsx')) + list(locale_dir.glob('*/*/page.tsx'))

mismatches = []
pattern = re.compile(r'alternates:\s*\{\s*canonical:\s*`/\$\{locale\}/([^`]+)`\s*\}')

found = 0
for p in pages:
    txt = p.read_text(encoding='utf-8')
    m = pattern.search(txt)
    if m:
        found += 1
        slug = m.group(1)
        folder = p.parent.name
        if slug != folder:
            mismatches.append((p.name, folder, slug))
        print(f'{folder:35} -> slug: {slug}')

print(f'\nTotal matched: {found}')
if mismatches:
    print('Mismatches:', mismatches)
else:
    print('All matched slugs match their folder names perfectly!')
