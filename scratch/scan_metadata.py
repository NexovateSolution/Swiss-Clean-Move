from pathlib import Path

locale_dir = Path('src/app/[locale]')
pages = list(locale_dir.glob('*/page.tsx')) + list(locale_dir.glob('*/*/page.tsx'))
relative_canonical = []
missing_languages = []
no_alternates = []

for p in pages:
    content = p.read_text(encoding='utf-8')
    p_str = str(p)
    if 'alternates:' in content:
        if 'canonical: `/${locale}' in content or "canonical: '/" in content:
            relative_canonical.append(p_str)
        if 'languages:' not in content:
            missing_languages.append(p_str)
    else:
        no_alternates.append(p_str)

print(f'Total pages scanned: {len(pages)}')
print(f'Relative canonical ({len(relative_canonical)}):')
for r in relative_canonical:
    print('  ', r)
print(f'Missing languages/hreflang in alternates ({len(missing_languages)}):')
for m in missing_languages:
    print('  ', m)
print(f'No alternates at all ({len(no_alternates)}):')
for n in no_alternates:
    print('  ', n)
