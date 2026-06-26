$files = Get-ChildItem -Recurse -Filter "*.html"
$fixed = 0

foreach ($f in $files) {
    $content = [IO.File]::ReadAllText($f.FullName, [Text.Encoding]::UTF8)
    $orig = $content
    
    # Replace using byte sequence construction (avoids terminal encoding issues)
    $content = $content.Replace([byte[]](0xE2, 0x80, 0x93) | ForEach { [char]$_ }) -join '', '–')
    $content = $content.Replace([byte[]](0xE2, 0x80, 0x94) | ForEach { [char]$_ }) -join '', '—')
    
    if ($content -ne $orig) {
        [IO.File]::WriteAllText($f.FullName, $content, [Text.Encoding]::UTF8)
        $fixed++
    }
}

"Processed: $fixed files"
