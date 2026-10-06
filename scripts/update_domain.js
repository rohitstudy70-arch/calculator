const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (f !== 'node_modules' && f !== '.next' && f !== '.git' && f !== 'out') {
        walkDir(dirPath, callback);
      }
    } else {
      callback(path.join(dir, f));
    }
  });
}

let count = 0;
const OLD_DOMAIN = /https:\/\/calculator-kappa-one-10\.vercel\.app/g;
const NEW_DOMAIN = 'https://www.calcmaster.co.in';

walkDir(path.join(__dirname, '..', 'src'), filePath => {
  if (filePath.endsWith('.ts') || filePath.endsWith('.tsx') || filePath.endsWith('.js') || filePath.endsWith('.json')) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.match(OLD_DOMAIN)) {
      content = content.replace(OLD_DOMAIN, NEW_DOMAIN);
      fs.writeFileSync(filePath, content, 'utf8');
      count++;
      console.log(`Updated: ${filePath}`);
    }
  }
});

console.log(`Updated ${count} files with ${NEW_DOMAIN}`);
