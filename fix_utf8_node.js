const fs = require('fs');
const path = require('path');

// Walk directory recursively
function walkFiles(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let htmlFiles = [];
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      htmlFiles = htmlFiles.concat(walkFiles(fullPath));
    } else if (file.name.endsWith('.html')) {
      htmlFiles.push(fullPath);
    }
  }
  
  return htmlFiles;
}

const files = walkFiles('.');
const patterns = [
  { from: 'â€"', to: '—' },
  { from: 'â€–', to: '–' },
  { from: 'â€ ', to: '— ' },
  { from: 'âœ…', to: '✓' },
  { from: 'ðŸ†', to: '🏆' },
  { from: 'ðŸ"‹', to: '📋' },
  { from: 'ðŸ"', to: '📚' },
  { from: 'ðŸš€', to: '🚀' }
];

let fixed = 0;

for (const file of files) {
  try {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;
    
    for (const p of patterns) {
      content = content.split(p.from).join(p.to);
    }
    
    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      fixed++;
      console.log(`✓ ${path.relative(process.cwd(), file)}`);
    }
  } catch (e) {
    console.error(`Error ${file}: ${e.message}`);
  }
}

console.log(`\nFixed: ${fixed} files`);
