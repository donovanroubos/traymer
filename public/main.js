const { app, BrowserWindow, Tray } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')

require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});

let tray = null
let window = null

const getWindowPosition = () => {
  const windowBounds = window.getBounds()
  const trayBounds = tray.getBounds()

  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
  const y = Math.round(trayBounds.y + trayBounds.height + 4)

  return {x, y}
}

const showWindow = () => {
  const position = getWindowPosition()
  const { x, y } = position

  window.setPosition(x, y, false)
  window.show()
}

const toggleWindow = () => {
  window.isVisible() ? window.hide() : showWindow()
}

const createTray = () => {
  tray = new Tray(`${path.join(__dirname, 'icon.png')}`)

  tray.on('click', () => {
    toggleWindow()
  })
}

const createWindow = () => {
  window = new BrowserWindow({
    width: 320,
    height: 450,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: false
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

app.dock.hide()

app.on('ready', () => {
  createTray()
  createWindow()
})



















// app.on('ready', () => {
//   const srcRoot = path.join(__dirname, '/index.html')

//   const mainWindow = new BrowserWindow({
//     options: {
//       width: 300,
//       height: 500,
//       resizable: false,
//       show: false,
//       frame: false,
//       webPreferences: {
//         backgroundThrottling: false,
//       }
//     },
//     url: `${srcRoot}/index.html`,
//   })


//   tray = new Tray(path.join(__dirname, '/icon.png'), mainWindow)

// })