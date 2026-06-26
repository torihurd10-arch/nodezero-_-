Start-Transcript -Path "./fix_log.txt" -Append -Force

$files = Get-ChildItem "level0" -Recurse -Filter "*.html"

foreach ($file in $files) {
  $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
  $original = $content
  
  $content = $content.Replace("â€"", "—")
  $content = $content.Replace("â€–", "–")
  $content = $content.Replace("ðŸ†", "🏆")
  $content = $content.Replace("ðŸ"‹", "📋")
  $content = $content.Replace("ðŸ"", "📁")
  $content = $content.Replace("ðŸ"—", "📄")
  
  if ($content -ne $original) {
    [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
    Add-Content -Path "./fix_log.txt" -Value "FIXED: $($file.Name)"
  }
}

Stop-Transcript
