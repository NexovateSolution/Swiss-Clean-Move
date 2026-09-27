fetch('http://localhost:3000/de/reinigungsfirma-biel').then(r=>r.text()).then(html=>{
  require('fs').writeFileSync('page.html', html);
  console.log('Saved to page.html');
});
