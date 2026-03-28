const fs = require('fs');
const path = require('path');

function getTranslationDict(locale = 'en') {
    const fileContent = fs.readFileSync(path.join(process.cwd(), 'messages', `${locale}.json`), 'utf-8');
    const msgs = JSON.parse(fileContent);
    const flatten = (obj) => {
        let res = {};
        for(let k in obj) {
            if (typeof obj[k] === 'object' && obj[k] !== null) {
                Object.assign(res, flatten(obj[k]));
            } else if (typeof obj[k] === 'string') {
                res[k] = obj[k].replace(/[:*]/g, '').trim();
            }
        }
        return res;
    }
    return flatten(msgs?.serviceForm?.wizard || {});
}

const deDict = getTranslationDict('de');

const testPayload = {
    address: "Teststrasse 123",
    propertyType: "apartment",
    hasPets: "yes"
};

function test(data, dict) {
    function prettifyKey(key) {
        return dict[key] || key.toUpperCase()
    }
    
    Object.keys(data).forEach(k => {
        let val = data[k];
        let display = (isNaN(Number(val)) && dict[String(val)]) ? dict[String(val)] : String(val);
        console.log(`Key: ${prettifyKey(k)} -> Val: ${display}`);
    });
}

console.log("TESTING GERMAN PAYLOAD:");
test(testPayload, deDict);
