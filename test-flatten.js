const fs = require('fs');

const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));

function flatten(obj) {
  let res = {};
  for(let k in obj) {
    if (typeof obj[k] === 'object' && obj[k] !== null) {
      Object.assign(res, flatten(obj[k]));
    } else {
      res[k] = obj[k];
    }
  }
  return res;
}

const dict = flatten(de.serviceForm.wizard);
console.log("propertyType:", dict['propertyType']);
console.log("house:", dict['house']);
console.log("parquet:", dict['parquet']);
console.log("emailAddress:", dict['emailAddress']);
console.log("telephoneNumber:", dict['telephoneNumber']);
console.log("zipCity:", dict['zipCity']);
