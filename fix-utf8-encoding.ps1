
# UTF-8 Encoding Fix Script for HTML Files
# This script fixes broken UTF-8 character sequences

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

# Define replacements
$replacements = @{
    'â€"' = '—'   # em dash
    'â€–' = '–'   # en dash
    'â€ ' = '— '  # em dash + space
    'âœ…' = '✓'   # checkmark
    'ðŸ†' = '🏆'  # trophy
    'ðŸ"š' = '📚'  # books
    'ðŸ'¤' = '🤔'  # thinking
    'ðŸ¤–' = '🤖'  # robot
    'â†' = '→'   # arrow
}

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$level0Dir = Join-Path $scriptDir "level0"

Write-Host "🔍 Scanning for HTML files..." -ForegroundColor Cyan
Write-Host ""

# Find all HTML files
$files = @()
if (Test-Path $level0Dir) {
    $files += @(Get-ChildItem $level0Dir -Filter "*.html" -Recurse -File | Select-Object -ExpandProperty FullName)
}
$files += @(Get-ChildItem $scriptDir -Filter "*.html" -MaxDepth 1 -File | Select-Object -ExpandProperty FullName)
$files = $files | Sort-Object -Unique

Write-Host "📄 Found $($files.Count) HTML files to process" -ForegroundColor Cyan
Write-Host ""

$fixed = 0
$failed = 0

foreach ($filePath in $files) {
    try {
        $content = [IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)
        $originalContent = $content
        $changeCount = 0

        # Apply replacements
        foreach ($broken in $replacements.Keys) {
            $count = ($content | Select-String -Pattern ([regex]::Escape($broken)) -AllMatches).Matches.Count
            if ($count -gt 0) {
                $changeCount += $count
                $content = $content.Replace($broken, $replacements[$broken])
            }
        }

        # Ensure meta charset exists
        if ($content -notmatch '<meta\s+charset\s*=\s*["\']?UTF-8["\']?\s*/?>' -and $content -notmatch '<meta charset') {
            if ($content -match '</head>') {
                $content = $content -replace '</head>', "<meta charset=`"UTF-8`">`n</head>"
                $changeCount += 1
            }
        }

        # Write back if changed
        if ($content -ne $originalContent) {
            [IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)
            $relPath = [IO.Path]::GetRelativePath($scriptDir, $filePath)
            Write-Host "✅ $relPath : $changeCount changes" -ForegroundColor Green
            $fixed++
        }
    }
    catch {
        $relPath = [IO.Path]::GetRelativePath($scriptDir, $filePath)
        Write-Host "❌ $relPath : $($_.Exception.Message)" -ForegroundColor Red
        $failed++
    }
}

Write-Host ""
Write-Host ("=" * 60) -ForegroundColor Cyan
Write-Host "✅ RESULTS:" -ForegroundColor Green
Write-Host ("=" * 60) -ForegroundColor Cyan
Write-Host "Files fixed: $fixed/$($files.Count)" -ForegroundColor Green
Write-Host "Files skipped (no issues): $($files.Count - $fixed - $failed)" -ForegroundColor Yellow
Write-Host "Errors: $failed" -ForegroundColor $(if ($failed -eq 0) { 'Green' } else { 'Red' })
Write-Host ("=" * 60) -ForegroundColor Cyan
Write-Host ""

exit $(if ($failed -eq 0) { 0 } else { 1 })
