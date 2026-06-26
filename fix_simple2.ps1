# Simple encoding fix using direct string matching
$files = Get-ChildItem -Recurse -Filter "*.html"
$count = 0

foreach ($f in $files) {
    $c = [IO.File]::ReadAllText($f.FullName, [Text.Encoding]::UTF8)
    $orig = $c
    
    # Replace using string literals from file content
    $c = $c.Replace("â€"", "—")
    $c = $c.Replace("â€–", "–")  
    $c = $c.Replace("â€ ", "— ")
    $c = $c.Replace("âœ…", "✓")
    $c = $c.Replace("ðŸ†", "🏆")
    $c = $c.Replace("ðŸ"‹", "📋")
    $c = $c.Replace("ðŸ"", "📚")
    $c = $c.Replace("ðŸš€", "🚀")
    
    if ($c -ne $orig) {
        [IO.File]::WriteAllText($f.FullName, $c, [Text.Encoding]::UTF8)
        $count++
        "Fixed: $($f.Name)"
    }
}

"Total: $count files"
