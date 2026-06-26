# UTF-8 encoding fix using character codes
# This script defines replacements using byte sequences to avoid encoding issues

$files = Get-ChildItem -Recurse -Filter "*.html"
$count = 0

foreach ($f in $files) {
    $bytes = [IO.File]::ReadAllBytes($f.FullName)
    $content = [Text.Encoding]::UTF8.GetString($bytes)
    $orig = $content
    
    # Build replacement pairs using hex codes (UTF-8 broken sequences)
    $pairs = @(
        # (hex bytes for broken UTF-8, replacement char)
        ([byte[]](0xE2, 0x80, 0x93) | % { [char]$_ }) -join '', '–'),
        ([byte[]](0xE2, 0x80, 0x94) | % { [char]$_ }) -join '', '—'),
        ([byte[]](0xE2, 0x80, 0xA2) | % { [char]$_ }) -join '', '•'),
        ([byte[]](0xE2, 0x9C, 0x85) | % { [char]$_ }) -join '', '✓')
    )
    
    foreach ($pair in $pairs) {
        $content = $content -replace [regex]::Escape($pair[0]), $pair[1]
    }
    
    if ($content -ne $orig) {
        $newBytes = [Text.Encoding]::UTF8.GetBytes($content)
        [IO.File]::WriteAllBytes($f.FullName, $newBytes)
        $count++
    }
}

"Fixed $count files"
