@echo off
REM Fix UTF-8 encoding issues in all HTML files
REM This script finds and replaces mojibake sequences

setlocal enabledelayedexpansion

set "count=0"

REM Find all HTML files and process them
for /r . %%F in (*.html) do (
    set "file=%%F"
    set "changed=0"
    
    REM Read file, fix encoding, write back
    powershell -NoProfile -Command "
        [string]$file = '!file!'
        [string]$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)
        [string]$original = $content
        
        $content = $content.Replace([char]0xE2 + [char]0x80 + [char]0x93, '—')
        $content = $content.Replace([char]0xE2 + [char]0x80 + [char]0x94, '—')
        $content = $content.Replace([char]0xE2 + [char]0x80 + [char]0xA2, '•')
        $content = $content.Replace([char]0xE2 + [char]0x9C + [char]0x85, '✓')
        
        if ($content -ne $original) {
            [System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)
            Write-Host 'FIXED: !file!'
        }
    "
    
    set /a count+=1
)

echo.
echo Processed !count! HTML files
