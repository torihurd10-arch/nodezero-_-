#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
UTF-8 Encoding Fix for HTML Files
Fixes broken UTF-8 sequences and adds meta charset tags
"""

import os
import glob
from pathlib import Path

# Broken UTF-8 sequences and their replacements
REPLACEMENTS = [
    ('â€"', '—', 'em dash'),
    ('â€–', '–', 'en dash'),
    ('â€ ', '— ', 'em dash + space'),
    ('âœ…', '✓', 'checkmark'),
    ('ðŸ†', '🏆', 'trophy emoji'),
    ('ðŸ"š', '📚', 'books emoji'),
    ('ðŸ'¤', '🤔', 'thinking emoji'),
    ('ðŸ¤–', '🤖', 'robot emoji'),
]

CHARSET_META = '<meta charset="UTF-8">'

def find_html_files(root_dir):
    """Recursively find all HTML files in directory"""
    html_files = []
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
    return sorted(html_files)

def fix_file(file_path):
    """Fix UTF-8 encoding issues in a single HTML file"""
    try:
        # Read with UTF-8 encoding
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        changes_count = 0

        # Apply all character replacements
        for broken, fixed, desc in REPLACEMENTS:
            count = content.count(broken)
            if count > 0:
                changes_count += count
                content = content.replace(broken, fixed)

        # Ensure charset meta tag exists
        if CHARSET_META not in content and '<meta charset' not in content.lower():
            # Find </head> and insert before it
            head_close = content.lower().find('</head>')
            if head_close > 0:
                content = content[:head_close] + CHARSET_META + '\n' + content[head_close:]
                changes_count += 1

        # Write back if there were changes
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return {'fixed': True, 'changes': changes_count, 'path': file_path, 'error': None}
        else:
            return {'fixed': False, 'changes': 0, 'path': file_path, 'error': None}

    except Exception as error:
        return {'fixed': False, 'changes': 0, 'path': file_path, 'error': str(error)}

def main():
    """Main execution"""
    # Get script directory (workspace root)
    script_dir = os.path.dirname(os.path.abspath(__file__))
    level0_dir = os.path.join(script_dir, 'level0')
    
    print('🔍 Scanning for HTML files...\n')
    
    files = []
    
    # Find files in level0
    if os.path.exists(level0_dir):
        files.extend(find_html_files(level0_dir))
    
    # Also check root directory HTML files
    for file in os.listdir(script_dir):
        if file.endswith('.html'):
            full_path = os.path.join(script_dir, file)
            if os.path.isfile(full_path):
                files.append(full_path)
    
    files = sorted(set(files))  # Remove duplicates and sort
    
    print(f'📄 Found {len(files)} HTML files to process\n')
    
    fixed = 0
    failed = 0
    results = []

    for file_path in files:
        result = fix_file(file_path)
        rel_path = os.path.relpath(file_path, script_dir)
        
        if result['error']:
            failed += 1
            print(f"❌ {rel_path}: {result['error']}")
        elif result['fixed']:
            fixed += 1
            print(f"✅ {rel_path}: {result['changes']} changes")
            results.append(result)
        # Files with no issues are not printed

    print(f"\n{'='*60}")
    print(f"✅ RESULTS:")
    print(f"{'='*60}")
    print(f"Files fixed: {fixed}/{len(files)}")
    print(f"Files skipped (no issues): {len(files) - fixed - failed}")
    print(f"Errors: {failed}")
    print(f"{'='*60}\n")
    
    return 0 if failed == 0 else 1

if __name__ == '__main__':
    exit(main())
