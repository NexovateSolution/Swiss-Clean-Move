fetch('http://localhost:3000/de/reinigungsfirma-biel').then(r=>r.text()).then(html=>{
  console.log('H1:', html.match(/<h1[^>]*>.*?<\/h1>/i)?.[0]);
  console.log('Canonical:', html.match(/<link rel="canonical" href="[^"]*"/i)?.[0]);
  console.log('Hreflang:', html.match(/<link rel="alternate" hrefLang="[^"]*" href="[^"]*"\/>/gi));
  console.log('LD-JSON:', html.match(/<script type="application\/ld\+json">.*?<\/script>/i)?.[0]);
  console.log('Facility Service:', [...html.matchAll(/[^<>]{0,40}Facility Service[^<>]{0,40}/gi)].map(m => m[0]));
});
