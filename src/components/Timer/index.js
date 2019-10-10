import React, {
  useState,
  useEffect,
  useRef
} from 'react'
import isElectron from 'is-electron'

const { ipcRenderer } = window.require('electron')

function useInterval(callback, delay) {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }

    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

function Timer() {
  const [isTimerOn, setIsTimerOn] = useState(false)
  const [timerTime, setTimerTime] = useState(0)

  const minuteInput = useRef(null)

  useInterval(() => {
    if (timerTime !== 0) {
      const newTime = timerTime - 1000

      if (newTime >= 0) {
        setTimerTime(newTime)
      } else {
        setIsTimerOn(false)
      }
    }
  }, isTimerOn ? 1000 : null)

  function sendNotification() {
    if (isElectron()) {
      ipcRenderer.send('stop-timer')
    }
  }

  function resetTimer() {
    if (!isTimerOn) {
      setTimerTime(0)

      minuteInput.current.value = ''
      minuteInput.current.focus()
      sendNotification()
    }
  }

  function setTime() {
    const inputInMinutes = minuteInput.current.value

    setTimerTime(inputInMinutes * 60000)
  }

  const seconds = (`0${Math.floor((timerTime / 1000) % 60) % 60}`).slice(-2)
  const minutes = (`0${Math.floor((timerTime / 60000) % 60)}`).slice(-2)
  const hours = (`0${Math.floor((timerTime / 3600000) % 60)}`).slice(-2)

  return (
    <div className="timer">
      <div className="time">
        <span className="hours">
          {hours}
        </span>
          :
        <span className="minutes">
          {minutes}
        </span>
          :
        <span className="seconds">
          {seconds}
        </span>
      </div>

      <input
        className="input"
        ref={minuteInput}
        type="number"
        placeholder="Time in minutes"
        onChange={() => setTime()}
      />

      <div className="btns">
        <button
          className="btn"
          type="button"
          onClick={() => setIsTimerOn(true)}
        >
            Start
        </button>

        <button
          className="btn"
          type="button"
          onClick={() => setIsTimerOn(false)}
        >
          Stop
        </button>

        <button
          className="btn"
          type="button"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default Timer
