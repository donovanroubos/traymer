const {
  app,
  BrowserWindow,
  Tray,
  Notification,
  ipcMain
} = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

let tray = null
let window = null

const getWindowPosition = () => {
  const windowBounds = window.getBounds()
  const trayBounds = tray.getBounds()

  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
  const y = Math.round(trayBounds.y + trayBounds.height + 2)

  return {
    x, y
  }
}

const showWindow = () => {
  const position = getWindowPosition()
  const { x, y } = position

  window.setPosition(x, y, false)
  window.show()
}

const toggleWindow = () => (
  window.isVisible() ? window.hide() : showWindow()
)

const createTray = () => {
  tray = new Tray(`${path.join(__dirname, 'icon.png')}`)

  tray.on('click', () => {
    toggleWindow()
  })
}

const createWindow = () => {
  window = new BrowserWindow({
    width: 320,
    height: 440,
    show: false,
    transparent: true,
    frame: false,
    fullscreenable: false,
    resizable: false,
    movable: false,
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      backgroundThrottling: false,
      nodeIntegration: true,
      preload: path.join(__dirname, 'src/preload.js')
    }
  })

  const devPath = 'http://localhost:3000'
  const prodPath = ''

  window.loadURL(isDev ? devPath : prodPath)

  window.on('blur', () => {
    if (!window.webContents.isDevToolsOpened()) {
      window.hide()
    }
  })
}

// Electron Reloading
require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
})

app.dock.hide()

app.on('ready', () => {
  createTray()
  createWindow()
})

ipcMain.on('message', (event, arg) => {
  const notification = new Notification({
    title: 'This is a title',
    subtitle: arg,
    closeButtonText: 'Skip this'
  })

  notification.show()
})
