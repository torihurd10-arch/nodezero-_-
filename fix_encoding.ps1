# UTF-8 Encoding Fix Script
# Fixes mojibake in HTML files

$brokenPatterns = @(
    @{ broken = 'â€"'; fixed = '—' },      # em dash
    @{ broken = 'â€–'; fixed = '–' },      # en dash
    @{ broken = 'â€ '; fixed = '— ' },     # em dash + space
    @{ broken = 'ðŸ†'; fixed = '🏆' },     # trophy
    @{ broken = 'ðŸ"‹'; fixed = '📋' },     # clipboard
    @{ broken = 'ðŸ"'; fixed = '📚' },     # books
    @{ broken = 'ðŸš€'; fixed = '🚀' },     # rocket
    @{ broken = 'ðŸ¤–'; fixed = '🤖' }      # robot
)

$files = Get-ChildItem -Recurse -Filter "*.html"
$fixedCount = 0

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    $original = $content
    
    foreach ($pattern in $brokenPatterns) {
        $content = $content.Replace($pattern.broken, $pattern.fixed)
    }
    
    if ($content -ne $original) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        $fixedCount++
        Write-Host "Fixed: $($file.Name)"
    }
}

Write-Host "`nTotal files fixed: $fixedCount"
