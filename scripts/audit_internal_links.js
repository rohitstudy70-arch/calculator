const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '..', 'src', 'data', 'calculator-content');
const appDir = path.join(__dirname, '..', 'src', 'app');

// 1. Gather all existing routes in src/app
const routes = new Set();
function scanRoutes(dir, currentRoute = '') {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    if (item.isDirectory()) {
      if (item.name.startsWith('(') || item.name.startsWith('@')) {
        scanRoutes(path.join(dir, item.name), currentRoute);
      } else if (!item.name.startsWith('[')) {
        const routePath = `${currentRoute}/${item.name}`;
        if (fs.existsSync(path.join(dir, item.name, 'page.tsx')) || fs.existsSync(path.join(dir, item.name, 'page.js'))) {
          routes.add(routePath);
        }
        scanRoutes(path.join(dir, item.name), routePath);
      }
    }
  }
}
scanRoutes(appDir);
routes.add('/'); // home
console.log(`Found ${routes.size} static routes in src/app`);

// 2. Audit all relatedCalculators in calculator-content
const contentFiles = fs.readdirSync(contentDir);
let errors = 0;

contentFiles.forEach(f => {
  const c = fs.readFileSync(path.join(contentDir, f), 'utf8');
  const matches = [...c.matchAll(/slug:\s*['"`]([^'"`]+)['"`]/g)];
  matches.forEach(m => {
    let slug = m[1].trim();
    if (!slug.startsWith('/')) slug = '/' + slug;
    
    // Check if route exists or is known alias
    if (!routes.has(slug)) {
      console.error(`[BROKEN RELATED LINK] in ${f}: slug "${slug}" does not match any route!`);
      errors++;
    }
  });
});

console.log(`Audit finished with ${errors} broken related links.`);
