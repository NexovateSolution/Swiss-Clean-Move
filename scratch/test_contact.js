const http = require('http');

const data = JSON.stringify({
  name: 'Max Muster',
  email: 'max.muster@example.ch',
  phone: '+41 79 123 45 67',
  subject: 'Spezielle Reinigung für Antiquitäten',
  message: 'Hallo SwissCleanMove, ich benötige eine individuelle Offerte für eine Villa mit vielen Antiquitäten. Bitte um Rückruf.'
});

const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/contact',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', body);
  });
});

req.on('error', (e) => console.error('Error:', e.message));
req.write(data);
req.end();
