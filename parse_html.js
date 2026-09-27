const fs = require('fs');
const html = fs.readFileSync('page.html', 'utf8');
console.log('H1:', html.match(/<h1[^>]*>.*?<\/h1>/gi));
console.log('Canonical:', html.match(/<link rel="canonical" href="[^"]*"/));
console.log('Hreflang:', html.match(/<link rel="alternate" hreflang="[^"]*" href="[^"]*"/g));
console.log('Title:', html.match(/<title>.*?<\/title>/));
console.log('Meta Desc:', html.match(/<meta name="description" content="[^"]*"/));
console.log('LD-JSON:', html.match(/<script type="application\/ld\+json">.*?<\/script>/g));
