const fs = require('fs');

const filePaths = [
    'src/app/api/admin/generate-invoice/route.ts',
    'src/app/api/admin/send-invoice/route.ts'
];

for (const filePath of filePaths) {
    let text = fs.readFileSync(filePath, 'utf8');
    
    // We want to remove the Payment Slip AND the Signature section at the bottom.
    // In send-invoice and generate-invoice, this starts around the page-break and goes until </body>
    
    // We look for '<div style="page-break-before: always;"></div>'
    // Actually, in the old template, it was:
    // <div style="page-break-before: always;"></div>
    // <!-- Payment Slip Header Removed -->
    const startStr = '<div style="page-break-before: always;"></div>';
    
    const startIndex = text.indexOf(startStr);
    const endIndex = text.lastIndexOf('</body>');
    
    if (startIndex !== -1 && endIndex !== -1) {
        text = text.substring(0, startIndex) + text.substring(endIndex);
        fs.writeFileSync(filePath, text, 'utf8');
        console.log(`Successfully trimmed ${filePath}`);
    } else {
        console.log(`Could not find boundaries in ${filePath}`);
    }
}
