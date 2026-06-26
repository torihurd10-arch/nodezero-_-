$files = Get-ChildItem -Recurse -Filter "*.html"
$fixed = 0

# Define the broken UTF-8 sequences as byte arrays
$broken_emdash = [Text.Encoding]::UTF8.GetString([byte[]](0xE2, 0x80, 0x94))
$broken_endash = [Text.Encoding]::UTF8.GetString([byte[]](0xE2, 0x80, 0x93))
$broken_bullet = [Text.Encoding]::UTF8.GetString([byte[]](0xE2, 0x80, 0xA2))
$broken_check = [Text.Encoding]::UTF8.GetString([byte[]](0xE2, 0x9C, 0x85))

foreach ($f in $files) {
    $c = [IO.File]::ReadAllText($f.FullName, [Text.Encoding]::UTF8)
    $o = $c
    
    $c = $c.Replace($broken_emdash, "—")
    $c = $c.Replace($broken_endash, "–")
    $c = $c.Replace($broken_bullet, "•")
    $c = $c.Replace($broken_check, "✓")
    
    if ($c -ne $o) {
        [IO.File]::WriteAllText($f.FullName, $c, [Text.Encoding]::UTF8)
        $fixed++
        Write-Host "FIXED: $($f.Name)"
    }
}

Write-Host "Total: $fixed files fixed"
