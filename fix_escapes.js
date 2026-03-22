const fs = require('fs');
const path = require('path');
function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (p.endsWith('.tsx') || p.endsWith('.ts')) {
      let c = fs.readFileSync(p, 'utf8');
      c = c.replace(/\\\$/g, '$').replace(/\\`/g, '`');
      fs.writeFileSync(p, c);
    }
  }
}
walk('c:/Users/akash/Xindowindow/src');
console.log('Fixed globally.');
