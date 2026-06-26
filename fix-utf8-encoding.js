#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Broken UTF-8 sequences and their replacements
const replacements = [
  { broken: 'â€"', fixed: '—', desc: 'em dash' },
  { broken: 'â€–', fixed: '–', desc: 'en dash' },
  { broken: 'â€ ', fixed: '— ', desc: 'em dash + space' },
  { broken: 'âœ…', fixed: '✓', desc: 'checkmark' },
  { broken: 'ðŸ†', fixed: '🏆', desc: 'trophy emoji' },
  { broken: 'ðŸ"š', fixed: '📚', desc: 'books emoji' },
  { broken: 'ðŸ'¤', fixed: '🤔', desc: 'thinking emoji' },
  { broken: 'ðŸ¤–', fixed: '🤖', desc: 'robot emoji' },
];

const charsetRegex = /<meta\s+charset\s*=\s*["']?UTF-8["']?\s*\/?>/i;
const metaInsertPoint = /<\/head>/i;

function findHtmlFiles(dir) {
  let files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files = files.concat(findHtmlFiles(fullPath));
    } else if (item.isFile() && item.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    let changesCount = 0;

    // Apply all replacements
    for (const replacement of replacements) {
      const regex = new RegExp(replacement.broken.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      const matches = content.match(regex);
      if (matches) {
        changesCount += matches.length;
        content = content.replace(regex, replacement.fixed);
      }
    }

    // Ensure charset meta tag exists
    if (!charsetRegex.test(content)) {
      const metaTag = '<meta charset="UTF-8">\n';
      content = content.replace(metaInsertPoint, metaTag + '</head>');
      changesCount += 1; // Count meta tag addition
    }

    // Write back if there were changes
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      return { fixed: true, changes: changesCount, path: filePath };
    }
    
    return { fixed: false, changes: 0, path: filePath };
  } catch (error) {
    return { fixed: false, error: error.message, path: filePath };
  }
}

// Main execution
async function main() {
  const rootDir = path.resolve(__dirname);
  const level0Dir = path.join(rootDir, 'level0');
  
  console.log('🔍 Scanning for HTML files...\n');
  
  let files = [];
  
  // Find files in level0
  if (fs.existsSync(level0Dir)) {
    files = files.concat(findHtmlFiles(level0Dir));
  }
  
  // Also check root directory HTML files
  const rootFiles = fs.readdirSync(rootDir)
    .filter(f => f.endsWith('.html') && fs.statSync(path.join(rootDir, f)).isFile())
    .map(f => path.join(rootDir, f));
  files = files.concat(rootFiles);
  
  console.log(`📄 Found ${files.length} HTML files to process\n`);
  
  let fixed = 0;
  let failed = 0;
  const results = [];

  for (const file of files) {
    const result = fixFile(file);
    if (result.error) {
      failed++;
      console.log(`❌ ${path.relative(rootDir, file)}: ${result.error}`);
    } else if (result.fixed) {
      fixed++;
      console.log(`✅ ${path.relative(rootDir, file)}: ${result.changes} changes`);
      results.push(result);
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`✅ RESULTS:`);
  console.log(`${'='.repeat(60)}`);
  console.log(`Files fixed: ${fixed}/${files.length}`);
  console.log(`Files skipped (no issues): ${files.length - fixed - failed}`);
  console.log(`Errors: ${failed}`);
  console.log(`${'='.repeat(60)}\n`);

  process.exit(failed > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
