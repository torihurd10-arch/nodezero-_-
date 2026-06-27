import { useMemo, useState } from 'react'
import { getMissionSimulation } from '../../utils/missionSimulationData'

function cloneValue(value) {
  return JSON.parse(JSON.stringify(value))
}

function pathLabel(path) {
  return path.split('/').at(-1)
}

function collectVisibleItems(fileSystem, currentPath, hiddenItems) {
  return (fileSystem[currentPath] || []).filter((item) => hiddenItems || !item.hidden)
}

function hasFileInFolder(fileSystem, folder, file) {
  return (fileSystem[folder] || []).some((item) => item.name === file)
}

function totalCpu(processes) {
  return processes.reduce((sum, process) => sum + process.cpu, 0)
}

export default function MissionSimulator({ mission, mode = 'action', onComplete }) {
  const scenario = useMemo(() => getMissionSimulation(mission, mode), [mission, mode])
  const [fileSystem, setFileSystem] = useState(() => cloneValue(scenario.fileSystem || {}))
  const [currentPath, setCurrentPath] = useState(scenario.currentPath || 'Desktop')
  const [explorerOpen, setExplorerOpen] = useState(Boolean(scenario.explorerOpen))
  const [quickAccess, setQuickAccess] = useState(() => [...(scenario.quickAccess || [])])
  const [hiddenItems, setHiddenItems] = useState(Boolean(scenario.hiddenItems))
  const [selectedItem, setSelectedItem] = useState('')
  const [dragItem, setDragItem] = useState(null)
  const [processes, setProcesses] = useState(() => cloneValue(scenario.processes || []))
  const [taskManagerOpen, setTaskManagerOpen] = useState(Boolean(scenario.open))
  const [capsLock, setCapsLock] = useState(Boolean(scenario.capsLock))
  const [numLock, setNumLock] = useState(Boolean(scenario.numLock))
  const [mouseConnected, setMouseConnected] = useState(Boolean(scenario.mouseConnected))
  const [keyboardConnected, setKeyboardConnected] = useState(Boolean(scenario.keyboardConnected))
  const [batteryGood, setBatteryGood] = useState(Boolean(scenario.batteryGood))
  const [source, setSource] = useState(scenario.source || 'official')
  const [installed, setInstalled] = useState(Boolean(scenario.installed))
  const [smartScreenBlocked, setSmartScreenBlocked] = useState(Boolean(scenario.smartScreenBlocked))
  const [leftovers, setLeftovers] = useState(Boolean(scenario.leftovers))

  const visibleItems = collectVisibleItems(fileSystem, currentPath, hiddenItems)

  function moveItem(fromPath, itemName, toPath) {
    if (!fromPath || !toPath || fromPath === toPath) {
      return
    }

    setFileSystem((current) => {
      const sourceItems = [...(current[fromPath] || [])]
      const item = sourceItems.find((entry) => entry.name === itemName)
      if (!item) {
        return current
      }

      return {
        ...current,
        [fromPath]: sourceItems.filter((entry) => entry.name !== itemName),
        [toPath]: [...(current[toPath] || []), item],
      }
    })
    setSelectedItem(itemName)
  }

  function resetQuickAccess() {
    setQuickAccess(['Documents', 'Downloads', 'Pictures'])
  }

  function endTask(name) {
    setProcesses((current) => current.filter((process) => process.name !== name))
  }

  function openExplorer(path) {
    setExplorerOpen(true)
    setCurrentPath(path)
  }

  function isComplete() {
    if (scenario.kind === 'fileExplorer') {
      if (scenario.target.type === 'selectFile') {
        return currentPath === scenario.target.path && selectedItem === scenario.target.file
      }
      if (scenario.target.type === 'fileInFolder') {
        return hasFileInFolder(fileSystem, scenario.target.folder, scenario.target.file)
      }
      if (scenario.target.type === 'open') {
        return currentPath === scenario.target.path
      }
      if (scenario.target.type === 'quickAccess') {
        return quickAccess.includes(scenario.target.path)
      }
      if (scenario.target.type === 'quickAccessReset') {
        return quickAccess.join('|') === 'Documents|Downloads|Pictures'
      }
      if (scenario.target.type === 'hiddenOff') {
        return hiddenItems === false
      }
    }

    if (scenario.kind === 'taskManager') {
      if (scenario.target === 'openShortcut') {
        return taskManagerOpen
      }
      return !processes.some((process) => process.name === scenario.targetProcess)
    }

    if (scenario.kind === 'keyboardMouse') {
      if (scenario.target === 'capsOff') return capsLock === false
      if (scenario.target === 'keyboardReconnect') return keyboardConnected === true
      if (scenario.target === 'mouseReconnect') return mouseConnected === true
      if (scenario.target === 'batteryReplace') return batteryGood === true
    }

    if (scenario.kind === 'softwareCenter') {
      if (scenario.target === 'installOfficial') {
        return source === 'official' && installed === true
      }
      if (scenario.target === 'allowSmartScreen') {
        return smartScreenBlocked === false && installed === true
      }
      if (scenario.target === 'uninstall') {
        return installed === false
      }
      if (scenario.target === 'removeLeftovers') {
        return leftovers === false
      }
    }

    return false
  }

  function renderDesktopIcons() {
    return (
      <div className="desktop-icons">
        {scenario.desktopIcons.map((icon) => (
          <button key={icon} className="desktop-icon" type="button" onClick={() => openExplorer(icon === 'Recycle Bin' ? 'Recycle Bin' : icon)}>
            <span className="desktop-icon-badge">[]</span>
            <span>{icon}</span>
          </button>
        ))}
        {scenario.kind === 'taskManager' ? (
          <button className="desktop-icon" type="button" onClick={() => setTaskManagerOpen(true)}>
            <span className="desktop-icon-badge">[]</span>
            <span>Task Manager</span>
          </button>
        ) : null}
      </div>
    )
  }

  function renderBreadcrumb() {
    const parts = currentPath.split('/')
    return (
      <div className="breadcrumb-row">
        {parts.map((part, index) => {
          const nextPath = parts.slice(0, index + 1).join('/')
          return (
            <button key={nextPath} className="breadcrumb-link" type="button" onClick={() => setCurrentPath(nextPath)}>
              {part}
            </button>
          )
        })}
      </div>
    )
  }

  function renderFileExplorer() {
    return (
      <div className="desktop-sim sim-layout">
        <div className="desktop-header">
          <strong>Fake Desktop</strong>
          <span>{scenario.hint}</span>
        </div>
        {!explorerOpen ? renderDesktopIcons() : null}
        {explorerOpen ? (
          <div className="explorer-shell">
            <aside className="explorer-sidebar">
              <strong>Quick Access</strong>
              {quickAccess.map((entry) => (
                <button key={entry} className="sidebar-link" type="button" onClick={() => setCurrentPath(entry)}>
                  {pathLabel(entry)}
                </button>
              ))}
              <strong>Folders</strong>
              {['Desktop', 'Documents', 'Downloads', 'Pictures', 'Recycle Bin'].map((entry) => (
                <button key={entry} className="sidebar-link" type="button" onClick={() => setCurrentPath(entry)}>
                  {entry}
                </button>
              ))}
              {scenario.target.type === 'quickAccess' ? (
                <button className="button" type="button" onClick={() => setQuickAccess((current) => (current.includes(currentPath) ? current : [...current, currentPath]))}>
                  Pin Current Folder
                </button>
              ) : null}
              {scenario.target.type === 'quickAccessReset' ? (
                <button className="button" type="button" onClick={resetQuickAccess}>
                  Reset Quick Access
                </button>
              ) : null}
              {scenario.target.type === 'hiddenOff' ? (
                <button className="button" type="button" onClick={() => setHiddenItems((value) => !value)}>
                  Hidden Items: {hiddenItems ? 'On' : 'Off'}
                </button>
              ) : null}
            </aside>
            <section className="explorer-pane">
              {renderBreadcrumb()}
              <div className="file-grid">
                {visibleItems.map((item) => (
                  <button
                    key={`${currentPath}-${item.name}`}
                    className={`file-tile ${selectedItem === item.name ? 'file-tile-active' : ''}`.trim()}
                    type="button"
                    draggable={item.kind === 'file'}
                    onDragStart={() => setDragItem({ fromPath: currentPath, itemName: item.name })}
                    onClick={() => {
                      if (item.kind === 'folder') {
                        setCurrentPath(item.path)
                      } else {
                        setSelectedItem(item.name)
                      }
                    }}
                    onDragOver={(event) => item.kind === 'folder' && event.preventDefault()}
                    onDrop={(event) => {
                      event.preventDefault()
                      if (item.kind === 'folder' && dragItem) {
                        moveItem(dragItem.fromPath, dragItem.itemName, item.path)
                        setDragItem(null)
                      }
                    }}
                  >
                    <span>{item.kind === 'folder' ? '[Folder]' : '[File]'}</span>
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
              <div className="button-row">
                {['Documents', 'Downloads', 'Pictures', 'Desktop'].map((destination) => (
                  <button
                    key={destination}
                    className="button"
                    type="button"
                    disabled={!selectedItem || !visibleItems.some((item) => item.name === selectedItem && item.kind === 'file')}
                    onClick={() => moveItem(currentPath, selectedItem, destination)}
                  >
                    Move to {destination}
                  </button>
                ))}
              </div>
            </section>
          </div>
        ) : null}
      </div>
    )
  }

  function renderTaskManager() {
    return (
      <div className="desktop-sim sim-layout">
        <div className="desktop-header">
          <strong>Task Manager Simulation</strong>
          <span>Total CPU: {totalCpu(processes)}%</span>
        </div>
        {!taskManagerOpen ? (
          <div className="section-body">
            <p>Task Manager is closed.</p>
            <button className="button" type="button" onClick={() => setTaskManagerOpen(true)}>
              Use Ctrl+Shift+Esc
            </button>
          </div>
        ) : (
          <div className="task-table">
            <div className="task-row task-row-head">
              <span>Process</span>
              <span>CPU</span>
              <span>Memory</span>
              <span>Action</span>
            </div>
            {processes.map((process) => (
              <div key={process.name} className="task-row">
                <span>{process.name}{process.frozen ? ' (Not Responding)' : ''}</span>
                <span>{process.cpu}%</span>
                <span>{process.memory} MB</span>
                <span>
                  <button className="button" type="button" disabled={process.critical} onClick={() => endTask(process.name)}>
                    End Task
                  </button>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  function renderKeyboardMouse() {
    const preview = keyboardConnected ? (capsLock ? 'HELLO IT INTERN' : 'hello it intern') : 'keyboard disconnected'

    return (
      <div className="desktop-sim sim-layout">
        <div className="desktop-header">
          <strong>Keyboard and Mouse Simulation</strong>
          <span>{scenario.hint}</span>
        </div>
        <div className="sim-stats">
          <span className="stat-pill">Caps Lock: {capsLock ? 'On' : 'Off'}</span>
          <span className="stat-pill">Num Lock: {numLock ? 'On' : 'Off'}</span>
          <span className="stat-pill">Mouse: {mouseConnected ? 'Connected' : 'Disconnected'}</span>
          <span className="stat-pill">Keyboard: {keyboardConnected ? 'Connected' : 'Disconnected'}</span>
        </div>
        <div className="highlight-box">
          <p>Typing preview: {preview}</p>
          <p>Battery: {batteryGood ? 'Good' : 'Dead'}</p>
        </div>
        <div className="button-row">
          <button className="button" type="button" onClick={() => setCapsLock((value) => !value)}>Toggle Caps Lock</button>
          <button className="button" type="button" onClick={() => setNumLock((value) => !value)}>Toggle Num Lock</button>
          <button className="button" type="button" onClick={() => setMouseConnected(true)}>Reconnect Mouse</button>
          <button className="button" type="button" onClick={() => setKeyboardConnected(true)}>Reconnect Keyboard</button>
          <button className="button" type="button" onClick={() => setBatteryGood(true)}>Replace Battery</button>
        </div>
      </div>
    )
  }

  function renderSoftwareCenter() {
    return (
      <div className="desktop-sim sim-layout">
        <div className="desktop-header">
          <strong>Software Center</strong>
          <span>{scenario.hint}</span>
        </div>
        <div className="sim-stats">
          <span className="stat-pill">Source: {source}</span>
          <span className="stat-pill">Installed: {installed ? 'Yes' : 'No'}</span>
          <span className="stat-pill">Leftovers: {leftovers ? 'Present' : 'Clean'}</span>
        </div>
        <div className="button-row">
          <button className="button" type="button" onClick={() => setSource('official')}>Use Official Site</button>
          <button className="button" type="button" onClick={() => setSource('unsafe')}>Use Random Download</button>
          <button className="button" type="button" onClick={() => setInstalled(true)} disabled={smartScreenBlocked}>Run Installer</button>
          <button className="button" type="button" onClick={() => setInstalled(false)}>Uninstall App</button>
          <button className="button" type="button" onClick={() => setSmartScreenBlocked(false)}>Allow Anyway</button>
          <button className="button" type="button" onClick={() => setLeftovers(false)}>Remove Leftover Folder</button>
        </div>
        <div className="highlight-box">
          <p><strong>App:</strong> {scenario.appName}</p>
          <p><strong>SmartScreen:</strong> {smartScreenBlocked ? 'Blocked' : 'Clear'}</p>
          <p><strong>Status:</strong> {installed ? 'Installed' : 'Not installed'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="section-body">
      {scenario.kind === 'fileExplorer' ? renderFileExplorer() : null}
      {scenario.kind === 'taskManager' ? renderTaskManager() : null}
      {scenario.kind === 'keyboardMouse' ? renderKeyboardMouse() : null}
      {scenario.kind === 'softwareCenter' ? renderSoftwareCenter() : null}
      <div className="ticket-banner">
        <p><strong>Goal:</strong> {mission.actionTask.expectedResult}</p>
        <p><strong>Status:</strong> {isComplete() ? 'Ready to submit' : 'Keep interacting with the simulator.'}</p>
      </div>
      <button className="button" type="button" disabled={!isComplete()} onClick={onComplete}>
        Complete {mode === 'breakfix' ? 'Break/Fix' : 'Action'}
      </button>
    </div>
  )
}
