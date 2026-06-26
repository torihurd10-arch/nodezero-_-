# Byte-level UTF-8 fix
$files = Get-ChildItem -Recurse -Filter "*.html"
$count = 0

# UTF-8 byte sequences for broken characters:
# â€" (U+2013 EN DASH) broken: 0xE2 0x80 0x93
# â€" (U+2014 EM DASH) broken: 0xE2 0x80 0x94  
# â€ (broken): 0xE2 0x80 (followed by various)
# âœ… (U+2705 CHECK MARK) broken: 0xE2 0x9C 0x85
# ðŸ (emoji broken): 0xC3 0x90 0xC2 0xBF (and more)

foreach ($file in $files) {
    $bytes = [IO.File]::ReadAllBytes($file.FullName)
    $original = $bytes
    
    # Convert to string, do replacements, convert back
    $content = [Text.Encoding]::UTF8.GetString($bytes)
    $modded = $content
    
    # Apply replacements
    $modded = $modded.Replace("â€"", "–")
    $modded = $modded.Replace("â€–", "–")
    $modded = $modded.Replace("â€", "—")
    $modded = $modded.Replace("âœ…", "✓")
    $modded = $modded.Replace("ðŸ†", "🏆")
    $modded = $modded.Replace("ðŸ"‹", "📋")
    $modded = $modded.Replace("ðŸ"", "📚")
    $modded = $modded.Replace("ðŸš€", "🚀")
    
    if ($modded -ne $content) {
        $newBytes = [Text.Encoding]::UTF8.GetBytes($modded)
        [IO.File]::WriteAllBytes($file.FullName, $newBytes)
        $count++
        "$($file.Name)"
    }
}

"Total fixed: $count"
