const { app, BrowserWindow, globalShortcut, screen } = require('electron')
const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

let mainWindow = null
let isVisible = false
let isInteractive = false

function createWindow() {
  // Get primary display dimensions
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.bounds

  // Create the browser window - overlay that stays on top
  mainWindow = new BrowserWindow({
    width: width, // Full screen width
    height: height, // Full screen height
    x: 0, // Start at screen edge
    y: 0, // Start at screen edge
    frame: false, // Remove window frame
    transparent: true, // Make window transparent
    alwaysOnTop: true, // Keep window always on top
    skipTaskbar: true, // Don't show in taskbar
    resizable: false, // Prevent resizing
    movable: false, // Disable window dragging (we'll drag the content instead)
    minimizable: false,
    maximizable: false,
    closable: false,
    focusable: true,
    show: false, // Start hidden
    hasShadow: false, // Remove window shadow
    level: 'screen-saver', // Highest level to stay above all windows
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true
    }
  })

  // Start with mouse events enabled so you can interact with the emoji keyboard
  mainWindow.setIgnoreMouseEvents(false)
  
  // Ensure window stays on top of all other windows
  mainWindow.setAlwaysOnTop(true, 'screen-saver')

  // Load the app
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000')
    // DevTools can be opened manually with Cmd+Option+I if needed
  } else {
    mainWindow.loadFile(path.join(__dirname, '../out/index.html'))
  }

  // Show window after it's ready
  mainWindow.once('ready-to-show', () => {
    console.log('Window ready to show')
    mainWindow.show()
    isVisible = true
  })

  // Handle window events
  mainWindow.on('blur', () => {
    // Keep window visible as an overlay - don't hide on blur
    // The overlay should stay visible even when other apps are focused
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function toggleWindow() {
  if (!mainWindow) return

  if (isVisible) {
    mainWindow.hide()
    isVisible = false
    isInteractive = false
  } else {
    mainWindow.show()
    mainWindow.focus()
    // Ensure it stays on top when shown
    mainWindow.setAlwaysOnTop(true, 'screen-saver')
    // Start with mouse events enabled for interaction
    mainWindow.setIgnoreMouseEvents(false)
    isVisible = true
    isInteractive = true
  }
}

function toggleInteraction() {
  if (!mainWindow || !isVisible) return
  
  isInteractive = !isInteractive
  mainWindow.setIgnoreMouseEvents(!isInteractive)
  console.log(`Click-through mode: ${!isInteractive ? 'enabled' : 'disabled'}`)
  console.log(`You can now ${!isInteractive ? 'interact with desktop windows' : 'interact with emoji keyboard'}`)
}

// Function to ensure overlay stays on top
function ensureOverlayOnTop() {
  if (mainWindow && isVisible) {
    mainWindow.setAlwaysOnTop(true, 'screen-saver')
    mainWindow.moveTop()
  }
}

app.whenReady().then(() => {
  createWindow()

  // Register global shortcut Ctrl+E (or Cmd+E on macOS) for show/hide
  const shortcut = process.platform === 'darwin' ? 'Cmd+E' : 'Ctrl+E'
  
  const ret = globalShortcut.register(shortcut, () => {
    console.log(`${shortcut} is pressed - toggling window`)
    console.log(`Current visibility: ${isVisible}`)
    toggleWindow()
  })

  if (!ret) {
    console.log(`Failed to register shortcut: ${shortcut}`)
  } else {
    console.log(`Successfully registered shortcut: ${shortcut}`)
  }

  // Register global shortcut Ctrl+I (or Cmd+I on macOS) for interaction toggle
  const interactionShortcut = process.platform === 'darwin' ? 'Cmd+I' : 'Ctrl+I'
  
  const ret2 = globalShortcut.register(interactionShortcut, () => {
    console.log(`${interactionShortcut} is pressed - toggling interaction`)
    toggleInteraction()
  })

  if (!ret2) {
    console.log(`Failed to register interaction shortcut: ${interactionShortcut}`)
  } else {
    console.log(`Successfully registered interaction shortcut: ${interactionShortcut}`)
  }

  // Check whether shortcuts are registered.
  console.log(`Shortcut ${shortcut} registered:`, globalShortcut.isRegistered(shortcut))
  console.log(`Interaction shortcut ${interactionShortcut} registered:`, globalShortcut.isRegistered(interactionShortcut))

  // Periodically ensure overlay stays on top
  setInterval(() => {
    ensureOverlayOnTop()
  }, 1000) // Check every second

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('will-quit', () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})

// Prevent the app from quitting when all windows are closed on macOS
app.on('before-quit', (event) => {
  if (process.platform === 'darwin') {
    event.preventDefault()
    app.hide()
  }
})
