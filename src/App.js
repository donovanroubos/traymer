import React from 'react'
import isElectron from 'is-electron'

// Components
import Header from './components/Header'

function App() {
  function onClickApp() {
    if (isElectron()) {
      console.log(window.ipcRenderer)
      window.ipcRenderer.send('message', 'ping!')
    }
  }

  return (
    <div className="app" onClick={onClickApp}>
      <Header />
    </div>
  )
}

export default App
