fetch('http://localhost:3000/de/reinigungsfirma-biel').then(r=>r.text()).then(html=>{
  console.log('Hreflang:', html.match(/<link rel="alternate" hreflang="[^"]*" href="[^"]*"/g));
  const matches = [...html.matchAll(/[^<>]{0,40}Facility Service[^<>]{0,40}/gi)];
  matches.forEach(m => console.log('Found:', m[0]));
});
