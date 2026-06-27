function cloneValue(value) {
  return JSON.parse(JSON.stringify(value))
}

const defaultDesktopIcons = ['Documents', 'Downloads', 'Pictures', 'Recycle Bin']

const baseFileSystem = {
  Desktop: [
    { name: 'Readme.txt', kind: 'file' },
    { name: 'School', kind: 'folder', path: 'Documents/School' },
  ],
  Documents: [
    { name: 'Budget.xlsx', kind: 'file' },
    { name: 'School', kind: 'folder', path: 'Documents/School' },
  ],
  'Documents/School': [
    { name: 'MathNotes.docx', kind: 'file' },
    { name: 'History', kind: 'folder', path: 'Documents/School/History' },
  ],
  'Documents/School/History': [
    { name: 'Essay.docx', kind: 'file' },
  ],
  Downloads: [
    { name: 'BrowserSetup.exe', kind: 'file' },
    { name: 'vacation.jpg', kind: 'file' },
    { name: 'Homework.docx', kind: 'file' },
  ],
  Pictures: [
    { name: 'family.png', kind: 'file' },
  ],
  'Recycle Bin': [],
}

function fileExplorerScenario(missionId, mode) {
  const fileSystem = cloneValue(baseFileSystem)
  const scenario = {
    kind: 'fileExplorer',
    desktopIcons: defaultDesktopIcons,
    fileSystem,
    currentPath: 'Desktop',
    explorerOpen: false,
    quickAccess: ['Documents', 'Downloads', 'Pictures'],
    hiddenItems: false,
    target: { type: 'open', path: 'Documents' },
    hint: 'Open the folder the user most likely needs.',
  }

  if (missionId === 'room0_1') {
    if (mode === 'action') {
      scenario.fileSystem.Documents.push({ name: 'Homework.docx', kind: 'file' })
      scenario.fileSystem.Downloads = scenario.fileSystem.Downloads.filter((item) => item.name !== 'Homework.docx')
      scenario.target = { type: 'selectFile', path: 'Documents', file: 'Homework.docx' }
    } else {
      scenario.fileSystem.Documents = scenario.fileSystem.Documents.filter((item) => item.name !== 'Homework.docx')
      scenario.target = { type: 'fileInFolder', file: 'Homework.docx', folder: 'Documents' }
      scenario.hint = 'Drag the file into the correct folder.'
    }
  }

  if (missionId === 'room0_2') {
    if (mode === 'action') {
      scenario.target = { type: 'selectFile', path: 'Downloads', file: 'vacation.jpg' }
    } else {
      scenario.fileSystem.Downloads = scenario.fileSystem.Downloads.filter((item) => item.name !== 'vacation.jpg')
      scenario.fileSystem.Desktop.push({ name: 'vacation.jpg', kind: 'file' })
      scenario.target = { type: 'fileInFolder', file: 'vacation.jpg', folder: 'Pictures' }
    }
  }

  if (missionId === 'room0_7') {
    scenario.currentPath = 'Documents/School/History'
    scenario.explorerOpen = true
    if (mode === 'action') {
      scenario.target = { type: 'open', path: 'Documents' }
      scenario.hint = 'Use the breadcrumb bar or sidebar to go back.'
    } else {
      scenario.hiddenItems = true
      scenario.fileSystem.Documents.push({ name: 'desktop.ini', kind: 'file', hidden: true })
      scenario.target = { type: 'hiddenOff' }
      scenario.hint = 'Disable hidden items so the view is clean again.'
    }
  }

  if (missionId === 'room0_8') {
    scenario.currentPath = 'Documents/School'
    scenario.explorerOpen = true
    if (mode === 'action') {
      scenario.target = { type: 'quickAccess', path: 'Documents/School' }
      scenario.hint = 'Pin the folder so it shows in Quick Access.'
    } else {
      scenario.quickAccess = ['Temp', 'Broken Shortcut']
      scenario.target = { type: 'quickAccessReset' }
      scenario.hint = 'Reset Quick Access to the default folders.'
    }
  }

  return scenario
}

function taskManagerScenario(missionId, mode) {
  return {
    kind: 'taskManager',
    open: missionId === 'room0_10' && mode === 'breakfix' ? false : true,
    processes: [
      { name: 'Explorer.exe', cpu: 4, memory: 180, critical: true },
      { name: 'Browser.exe', cpu: 18, memory: 620 },
      { name: missionId === 'room0_10' ? 'PhotoViewer.exe' : 'HeavyApp.exe', cpu: 62, memory: 980, frozen: true },
      { name: 'MusicPlayer.exe', cpu: 7, memory: 160 },
    ],
    targetProcess: missionId === 'room0_10' ? 'PhotoViewer.exe' : 'HeavyApp.exe',
    target: mode === 'breakfix' && missionId === 'room0_10' ? 'openShortcut' : 'endProcess',
    hint: missionId === 'room0_10' && mode === 'breakfix'
      ? 'Use the keyboard shortcut to open Task Manager.'
      : 'End the process using the End Task button.',
  }
}

function keyboardMouseScenario(missionId, mode) {
  return {
    kind: 'keyboardMouse',
    capsLock: missionId === 'room0_6',
    numLock: false,
    mouseConnected: missionId !== 'room0_5',
    keyboardConnected: !(missionId === 'room0_6' && mode === 'breakfix'),
    batteryGood: !(missionId === 'room0_5' && mode === 'breakfix'),
    target: missionId === 'room0_6'
      ? (mode === 'action' ? 'capsOff' : 'keyboardReconnect')
      : (mode === 'action' ? 'mouseReconnect' : 'batteryReplace'),
    hint: missionId === 'room0_6'
      ? 'Look at the keyboard state first.'
      : 'Start by reconnecting or restoring power.',
  }
}

function softwareScenario(missionId, mode) {
  return {
    kind: 'softwareCenter',
    source: 'unsafe',
    appName: missionId === 'room0_4' ? 'RandomToolbar' : 'BrowserPro',
    installed: missionId === 'room0_4',
    leftovers: missionId === 'room0_4' && mode === 'breakfix',
    smartScreenBlocked: missionId === 'room0_3' && mode === 'breakfix',
    target: missionId === 'room0_4'
      ? (mode === 'action' ? 'uninstall' : 'removeLeftovers')
      : (mode === 'action' ? 'installOfficial' : 'allowSmartScreen'),
    hint: missionId === 'room0_4'
      ? 'Use Apps and Features style controls to remove the software.'
      : 'Use the official source and let the installer finish.',
  }
}

export function getMissionSimulation(mission, mode = 'action') {
  const missionId = mission.id

  if (['room0_1', 'room0_2', 'room0_7', 'room0_8'].includes(missionId)) {
    return fileExplorerScenario(missionId, mode)
  }

  if (['room0_9', 'room0_10'].includes(missionId)) {
    return taskManagerScenario(missionId, mode)
  }

  if (['room0_5', 'room0_6'].includes(missionId)) {
    return keyboardMouseScenario(missionId, mode)
  }

  return softwareScenario(missionId, mode)
}
