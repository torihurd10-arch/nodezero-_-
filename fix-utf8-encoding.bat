@echo off
REM UTF-8 Encoding Fix Batch Script
REM Uses PowerShell to fix broken UTF-8 sequences in HTML files

setlocal enabledelayedexpansion

echo.
echo 🔍 UTF-8 Encoding Fix Script
echo ========================

set "fixed=0"
set "total=0"

REM Create a temporary PowerShell script
set "ps_script=%TEMP%\fix_utf8.ps1"

(
  echo $ErrorActionPreference = "Stop"
  echo $scriptDir = "%cd%"
  echo.
  echo $replacements = @{
  echo     'â€"' = '—'
  echo     'â€–' = '–'
  echo     'â€ ' = '— '
  echo     'âœ…' = '✓'
  echo }
  echo.
  echo $files = Get-ChildItem $scriptDir -Filter "*.html" -Recurse -File
  echo.
  echo foreach ($file in $files^) {
  echo     $content = [IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8^)
  echo     $orig = $content
  echo     foreach ($k in $replacements.Keys^) {
  echo         $content = $content.Replace($k, $replacements[$k]^)
  echo     }
  echo     if ($content -ne $orig^) {
  echo         [IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8^)
  echo         Write-Host "Fixed: $($file.Name^)"
  echo     }
  echo }
) > "!ps_script!"

REM Run the PowerShell script
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "!ps_script!"

REM Clean up
del "!ps_script!" 2>nul

echo.
echo ✅ Complete!
echo.
