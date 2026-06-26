const fs = require('fs');
const path = require('path');

const replacements = [
  { from: 'â€"', to: '—' },
  { from: 'â€–', to: '–' },
  { from: 'â€ ', to: '— ' },
  { from: 'â€˜', to: "'" },
  { from: 'â€™', to: "'" },
  { from: 'â€œ', to: '"' },
  { from: 'â€\u009d', to: '"' },
  { from: 'âœ…', to: '✓' },
  { from: 'ðŸ†', to: '🏆' },
  { from: 'ðŸ"‹', to: '📋' },
  { from: 'ðŸ"', to: '📚' },
  { from: 'ðŸš€', to: '🚀' },
  { from: 'ðŸ¤–', to: '🤖' },
];

function fixFilesRecursive(dir) {
  let fixCount = 0;
  
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      fixCount += fixFilesRecursive(fullPath);
    } else if (file.name.endsWith('.html')) {
      try {
        let content = fs.readFileSync(fullPath, 'utf-8');
        const original = content;
        
        for (const rep of replacements) {
          content = content.replace(new RegExp(rep.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), rep.to);
        }
        
        if (content !== original) {
          fs.writeFileSync(fullPath, content, 'utf-8');
          fixCount++;
          console.log(`✓ ${path.relative(process.cwd(), fullPath)}`);
        }
      } catch (e) {
        console.error(`✗ ${file.name}: ${e.message}`);
      }
    }
  }
  
  return fixCount;
}

const fixCount = fixFilesRecursive('./level0');
console.log(`\nTotal files fixed: ${fixCount}`);
