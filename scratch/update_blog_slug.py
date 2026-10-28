from pathlib import Path

p = Path('src/app/[locale]/blog/[slug]/page.tsx')
txt = p.read_text(encoding='utf-8')

old_part = """    alternates: {
      canonical: `/${locale}/blog/${slug}`
    },"""

new_part = """    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/blog/${slug}`,
      languages: {
        de: `https://www.swisscleanmove.ch/de/blog/${slug}`,
        en: `https://www.swisscleanmove.ch/en/blog/${slug}`,
        fr: `https://www.swisscleanmove.ch/fr/blog/${slug}`,
        it: `https://www.swisscleanmove.ch/it/blog/${slug}`,
        'x-default': `https://www.swisscleanmove.ch/de/blog/${slug}`
      }
    },"""

if old_part in txt:
    txt = txt.replace(old_part, new_part)
    p.write_text(txt, encoding='utf-8')
    print("Updated blog/[slug]/page.tsx successfully!")
else:
    print("Could not find old_part, checking normalized...")
    txt_norm = txt.replace('\r\n', '\n')
    if old_part in txt_norm:
        txt_norm = txt_norm.replace(old_part, new_part)
        p.write_text(txt_norm, encoding='utf-8')
        print("Updated normalized blog/[slug]/page.tsx successfully!")
