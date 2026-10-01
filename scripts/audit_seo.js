const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'src', 'data', 'calculator-content');
const files = fs.readdirSync(dir);

console.log('| Tool | Title Len | Title | Desc Len | Desc |');
console.log('|---|:---:|---|:---:|---|');
let allValid = true;

files.forEach(f => {
  const c = fs.readFileSync(path.join(dir, f), 'utf8');
  const tm = c.match(/pageTitle:\s*['"`]([^'"`]+)['"`]/);
  const dm = c.match(/metaDescription:\s*(?:\n\s*)?['"`]((?:\\.|[^'"`]|\n)*?)['"`]/);
  const t = tm ? tm[1].trim() : 'N/A';
  const d = dm ? dm[1].replace(/\\'/g, "'").replace(/\s+/g, ' ').trim() : 'N/A';
  if (t.length > 60 || d.length > 155 || t.length < 30 || d.length < 100) {
    allValid = false;
    console.error(`ERROR: ${f} out of bounds: Title: ${t.length}, Desc: ${d.length}`);
  }
  console.log(`| ${f} | ${t.length} | ${t} | ${d.length} | ${d} |`);
});

console.log(`\nAll checks passed (Title <= 60, Desc <= 155): ${allValid}`);
