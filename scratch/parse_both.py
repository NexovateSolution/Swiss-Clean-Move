import zipfile
import xml.etree.ElementTree as ET
import json
import os

def parse_sheet(z, sheet_name, shared_strings):
    tree = ET.fromstring(z.read(sheet_name))
    ns = '{http://schemas.openxmlformats.org/spreadsheetml/2006/main}'
    rows = []
    for row in tree.iter(f'{ns}row'):
        row_vals = []
        for c in row.iter(f'{ns}c'):
            t = c.attrib.get('t')
            v = c.find(f'{ns}v')
            val = v.text if v is not None else None
            if t == 's' and val is not None:
                val = shared_strings[int(val)]
            elif val is None:
                is_tag = c.find(f'{ns}is')
                if is_tag is not None:
                    t_tag = is_tag.find(f'{ns}t')
                    if t_tag is not None:
                        val = t_tag.text
            row_vals.append(val)
        rows.append(row_vals)
    return rows

def parse_xlsx(path):
    print(f"\n==========================================")
    print(f"Reading: {os.path.basename(path)}")
    print(f"==========================================")
    with zipfile.ZipFile(path, 'r') as z:
        shared_strings = []
        if 'xl/sharedStrings.xml' in z.namelist():
            ss_tree = ET.fromstring(z.read('xl/sharedStrings.xml'))
            for si in ss_tree.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si'):
                text = "".join(t.text for t in si.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t') if t.text)
                shared_strings.append(text)
                
        sheets_info = [('Queries', 'xl/worksheets/sheet1.xml'),
                       ('Pages', 'xl/worksheets/sheet2.xml'),
                       ('Countries', 'xl/worksheets/sheet3.xml'),
                       ('Devices', 'xl/worksheets/sheet4.xml'),
                       ('Search appearance', 'xl/worksheets/sheet5.xml'),
                       ('Filters', 'xl/worksheets/sheet6.xml')]
        
        data = {}
        for name, s_path in sheets_info:
            data[name] = parse_sheet(z, s_path, shared_strings)
            print(f"=== {name} ({len(data[name])} rows) ===")
            for r in data[name][:5]:
                print(r)
            print()
    return data

f1 = r'C:\Users\mikiy\Downloads\Telegram Desktop\swisscleanmove.ch-Performance-on-Search-2026-10-27.xlsx'
f2 = r'C:\Users\mikiy\Downloads\Telegram Desktop\swisscleanmove.ch-Performance-on-Search-2026-10-27 (1).xlsx'

d1 = parse_xlsx(f1)
d2 = parse_xlsx(f2)

with open(r'c:\Users\mikiy\OneDrive\Desktop\SwissCleanMove_Website\scratch\gsc_filtered.json', 'w', encoding='utf-8') as f:
    json.dump(d1, f, ensure_ascii=False, indent=2)

with open(r'c:\Users\mikiy\OneDrive\Desktop\SwissCleanMove_Website\scratch\gsc_unfiltered.json', 'w', encoding='utf-8') as f:
    json.dump(d2, f, ensure_ascii=False, indent=2)

print("Saved both files successfully.")
