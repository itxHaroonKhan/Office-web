const fs = require('fs');
const path = require('path');
function getFiles(dir) {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  });
  return Array.prototype.concat(...files);
}
const files = getFiles('src').filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));
const regex = /"\/([^"]+\.(webp|png|jpg|jpeg|svg))"/g;
const regexSingle = /'\/([^']+\.(webp|png|jpg|jpeg|svg))'/g;
const requested = new Set();
files.forEach(f => {
  const text = fs.readFileSync(f, 'utf8');
  let match;
  while ((match = regex.exec(text)) !== null) {
    requested.add(match[1]);
  }
  while ((match = regexSingle.exec(text)) !== null) {
    requested.add(match[1]);
  }
});
const existing = new Set(fs.readdirSync('all-images'));
const missing = [...requested].filter(x => !existing.has(x));
console.log('Missing images:', missing);
console.log('Total requested:', requested.size);
console.log('Total existing:', existing.size);
