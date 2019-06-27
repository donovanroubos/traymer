import React from 'react'
import isElectron from 'is-electron'

// Components
import Header from './components/Header'
import Timer from './components/Timer'

function App() {
  function onClickApp() {
    if (isElectron()) {
      console.log(window.ipcRenderer)
      window.ipcRenderer.send('message', 'ping!')
    }
  }

  return (
    <div className="app">
      <Header onClick={onClickApp} />

      <Timer />
    </div>
  )
}

export default App
