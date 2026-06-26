param()

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$workspace = $PSScriptRoot
$engineRelative = 'level0-engine.js'

function New-WrapperHtml {
  param(
    [Parameter(Mandatory = $true)][string]$Title,
    [Parameter(Mandatory = $true)][string]$PageType,
    [string]$RoomId = '',
    [int]$StepIndex = 0,
    [string]$RootPrefix = ''
  )

  $scriptSrc = if ($RootPrefix) { "${RootPrefix}$engineRelative" } else { $engineRelative }
  $roomAttr = if ($RoomId) { " data-room='$RoomId'" } else { '' }
  $stepAttr = if ($StepIndex -gt 0) { " data-step='$StepIndex'" } else { '' }

  return @"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>$Title</title>
  <script>window.__NODEZERO_PAGE__ = { type: '$PageType', rootPrefix: '$RootPrefix' };</script>
  <script src="$scriptSrc" defer></script>
</head>
<body data-page="$PageType"$roomAttr$stepAttr data-root-prefix="$RootPrefix">
  <div id="app"></div>
</body>
</html>
"@
}

function Write-WrapperFile {
  param(
    [Parameter(Mandatory = $true)][string]$Path,
    [Parameter(Mandatory = $true)][string]$Content
  )

  $directory = Split-Path -Parent $Path
  if (-not (Test-Path $directory)) {
    New-Item -ItemType Directory -Path $directory | Out-Null
  }

  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $Content, $utf8NoBom)
}

Write-WrapperFile -Path (Join-Path $workspace 'index.html') -Content (New-WrapperHtml -Title 'NodeZero - Level 0 Dashboard' -PageType 'dashboard' -RootPrefix '')
Write-WrapperFile -Path (Join-Path $workspace 'glossary.html') -Content (New-WrapperHtml -Title 'NodeZero - Level 0 Glossary' -PageType 'glossary' -RootPrefix '')
Write-WrapperFile -Path (Join-Path $workspace 'projects.html') -Content (New-WrapperHtml -Title 'NodeZero - Level 0 Projects' -PageType 'projects' -RootPrefix '')

$finalMissionPath = Join-Path $workspace 'level0\final_mission.html'
Write-WrapperFile -Path $finalMissionPath -Content (New-WrapperHtml -Title 'NodeZero - Level 0 Final Mission' -PageType 'final' -RootPrefix '../')

for ($i = 1; $i -le 9; $i++) {
  $roomId = '0_' + $i
  $roomFolder = Join-Path $workspace ("level0\room0_$i")
  $roomLanding = Join-Path $roomFolder ("room0_$i.html")
  Write-WrapperFile -Path $roomLanding -Content (New-WrapperHtml -Title ("NodeZero - Room 0.$i") -PageType 'room' -RoomId $roomId -RootPrefix '../../')

  for ($step = 1; $step -le 9; $step++) {
    $stepName = 'step' + $step
    switch ($step) {
      1 { $stepFile = 'step1_learn.html' }
      2 { $stepFile = 'step2_see.html' }
      3 { $stepFile = 'step3_do.html' }
      4 { $stepFile = 'step4_test.html' }
      5 { $stepFile = 'step5_break.html' }
      6 { $stepFile = 'step6_fix.html' }
      7 { $stepFile = 'step7_explain.html' }
      8 { $stepFile = 'step8_repeat.html' }
      9 { $stepFile = 'step9_apply.html' }
    }

    $stepPath = Join-Path $roomFolder $stepFile
    Write-WrapperFile -Path $stepPath -Content (New-WrapperHtml -Title ("NodeZero - Room 0.$i Step $step") -PageType 'step' -RoomId $roomId -StepIndex $step -RootPrefix '../../')
  }
}

Write-Host 'Level 0 wrappers rewritten.'