import zipfile
import xml.etree.ElementTree as ET

path = r'C:\Users\mikiy\Downloads\Telegram Desktop\swisscleanmove.ch-Performance-on-Search-2026-10-27.xlsx'

with zipfile.ZipFile(path, 'r') as z:
    wb_tree = ET.fromstring(z.read('xl/workbook.xml'))
    sheets = []
    for sheet in wb_tree.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}sheet'):
        sheets.append((sheet.attrib['name'], sheet.attrib['sheetId']))
    print("Sheets:", sheets)

    shared_strings = []
    if 'xl/sharedStrings.xml' in z.namelist():
        ss_tree = ET.fromstring(z.read('xl/sharedStrings.xml'))
        for si in ss_tree.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si'):
            text = "".join(t.text for t in si.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t') if t.text)
            shared_strings.append(text)
    print(f"Total shared strings: {len(shared_strings)}")
