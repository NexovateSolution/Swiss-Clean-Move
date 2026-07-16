const fs = require('fs');
const file = fs.readFileSync('messages/de.json', 'utf8');
const fixed = file.replace(/"takeaway"/g, '"takeaway2"');
const data = JSON.parse(fixed);
console.log(JSON.stringify(data.freeOffer, null, 2));
