# UTF-8 Encoding Fix Script using hex codes
# Fixes mojibake in HTML files

$patterns = @(
    @{ old = ([byte[]](0xE2, 0x80, 0x93) | ForEach-Object { [char]$_ }) -join ''; new = '—' },
    @{ old = ([byte[]](0xE2, 0x80, 0x94) | ForEach-Object { [char]$_ }) -join ''; new = '—' },
    @{ old = ([byte[]](0xE2, 0x80, 0xA2) | ForEach-Object { [char]$_ }) -join ''; new = '•' },
    @{ old = ([byte[]](0xE2, 0x9C, 0x85) | ForEach-Object { [char]$_ }) -join ''; new = '✓' }
)

$files = Get-ChildItem -Recurse -Filter "*.html"
$fixedCount = 0

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    $original = $content
    
    foreach ($p in $patterns) {
        $content = $content -replace [regex]::Escape($p.old), $p.new
    }
    
    if ($content -ne $original) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        $fixedCount++
        Write-Host "Fixed: $($file.Name)"
    }
}

Write-Host "`nTotal fixed: $fixedCount files"
