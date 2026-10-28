import json

with open(r'c:\Users\mikiy\OneDrive\Desktop\SwissCleanMove_Website\scratch\gsc_unfiltered.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

pages = data['Pages']
queries = data['Queries']

p_header = pages[0]
p_rows = pages[1:]

print("=== TOP 20 PAGES BY CLICK DROP ===")
parsed_pages = []
for r in p_rows:
    url = r[0]
    c_new = float(r[1] or 0)
    c_old = float(r[2] or 0)
    i_new = float(r[3] or 0)
    i_old = float(r[4] or 0)
    ctr_new = float(r[5] or 0)
    ctr_old = float(r[6] or 0)
    pos_new = float(r[7] or 0)
    pos_old = float(r[8] or 0)
    diff_c = c_new - c_old
    parsed_pages.append({
        'url': url,
        'c_new': c_new,
        'c_old': c_old,
        'diff_c': diff_c,
        'i_new': i_new,
        'i_old': i_old,
        'ctr_new': ctr_new,
        'ctr_old': ctr_old,
        'pos_new': pos_new,
        'pos_old': pos_old
    })

parsed_pages.sort(key=lambda x: x['diff_c'])

for p in parsed_pages[:20]:
    print(f"{p['url']} | Clicks: {p['c_old']} -> {p['c_new']} (Diff: {p['diff_c']:+.0f}) | Impr: {p['i_old']} -> {p['i_new']} | CTR: {p['ctr_old']*100:.1f}% -> {p['ctr_new']*100:.1f}% | Pos: {p['pos_old']:.1f} -> {p['pos_new']:.1f}")

print("\n=== TOP 20 PAGES BY TOTAL CLICKS (PREVIOUS PERIOD) ===")
by_old = sorted(parsed_pages, key=lambda x: x['c_old'], reverse=True)
for p in by_old[:20]:
    print(f"{p['url']} | Clicks: {p['c_old']} -> {p['c_new']} (Diff: {p['diff_c']:+.0f}) | Impr: {p['i_old']} -> {p['i_new']} | Pos: {p['pos_old']:.1f} -> {p['pos_new']:.1f}")

print("\n=== TOP 25 QUERIES BY CLICK DROP ===")
parsed_queries = []
for r in queries[1:]:
    q = r[0]
    c_new = float(r[1] or 0)
    c_old = float(r[2] or 0)
    i_new = float(r[3] or 0)
    i_old = float(r[4] or 0)
    ctr_new = float(r[5] or 0)
    ctr_old = float(r[6] or 0)
    pos_new = float(r[7] or 0)
    pos_old = float(r[8] or 0)
    diff_c = c_new - c_old
    parsed_queries.append({
        'q': q,
        'c_new': c_new,
        'c_old': c_old,
        'diff_c': diff_c,
        'i_new': i_new,
        'i_old': i_old,
        'ctr_new': ctr_new,
        'ctr_old': ctr_old,
        'pos_new': pos_new,
        'pos_old': pos_old
    })

parsed_queries.sort(key=lambda x: x['diff_c'])
for q in parsed_queries[:25]:
    print(f"{q['q']} | Clicks: {q['c_old']} -> {q['c_new']} (Diff: {q['diff_c']:+.0f}) | Impr: {q['i_old']} -> {q['i_new']} | CTR: {q['ctr_old']*100:.1f}% -> {q['ctr_new']*100:.1f}% | Pos: {q['pos_old']:.1f} -> {q['pos_new']:.1f}")

print("\n=== HIGH IMPRESSION QUERIES WITH LOW CLICKS (OPPORTUNITIES) ===")
by_impr = sorted(parsed_queries, key=lambda x: x['i_new'], reverse=True)
for q in by_impr[:25]:
    print(f"{q['q']} | Impr: {q['i_new']} | Clicks: {q['c_new']} | CTR: {q['ctr_new']*100:.2f}% | Pos: {q['pos_new']:.1f}")
