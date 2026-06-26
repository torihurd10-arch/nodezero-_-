#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os
import glob

# Define replacements
replacements = {
    'â€"': '—',      # em dash
    'â€–': '–',      # en dash
    'â€ ': '— ',     # em dash with space
    'â€˜': "'",      # left single quote
    'â€™': "'",      # right single quote
    'â€œ': '"',      # left double quote
    'â€\u009d': '"', # right double quote
    'âœ…': '✓',      # checkmark
    'ðŸ†': '🏆',     # trophy
    'ðŸ"‹': '📋',     # clipboard
    'ðŸ"': '📚',     # books
    'ðŸš€': '🚀',     # rocket
    'ðŸ¤–': '🤖',     # robot
}

# Find all HTML files in level0
html_files = glob.glob('level0/**/*.html', recursive=True)

fixed_count = 0
for filepath in html_files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        
        # Apply all replacements
        for broken, fixed in replacements.items():
            content = content.replace(broken, fixed)
        
        # Write back if changed
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            fixed_count += 1
            print(f'✓ {os.path.basename(filepath)}')
    
    except Exception as e:
        print(f'✗ {filepath}: {e}')

print(f'\nTotal files fixed: {fixed_count}')
