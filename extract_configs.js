const fs = require('fs');
const dirs = fs.readdirSync('src/app/[locale]').filter(d => d.includes('-biel'));
dirs.forEach(d => {
  const content = fs.readFileSync('src/app/[locale]/' + d + '/page.tsx', 'utf8');
  const serviceMatch = content.match(/service="([^"]+)"/);
  const formMatch = content.match(/formService="([^"]+)"/);
  const keyMatch = content.match(/pageKey="([^"]+)"/);
  console.log(d, '|', keyMatch?.[1], '|', serviceMatch?.[1], '|', formMatch?.[1]);
});
