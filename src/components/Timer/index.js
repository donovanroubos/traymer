import React, {
  useState,
  useEffect,
  useRef
} from 'react'
import isElectron from 'is-electron'

// Components
// import TimeInput from '../TimeInput'

function useInterval(callback, delay) {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval
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

        if (isElectron()) {
          window.ipcRenderer.send('stop-timer')
        }
      }
    }
  }, isTimerOn ? 1000 : null)

  function startTimer() {
    setIsTimerOn(true)
  }

  function stopTimer() {
    setIsTimerOn(false)
  }

  function resetTimer() {
    if (!isTimerOn) {
      setTimerTime(0)

      minuteInput.current.value = 0
    }
  }

  function setTime() {
    const inputInMinutes = minuteInput.current.value

    setTimerTime(inputInMinutes * 60000)
  }


  const mseconds = (`0${Math.floor((timerTime / 10) % 60) % 60}`).slice(-2)
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
          :
        <span className="miliseconds">
          {mseconds}
        </span>
      </div>

      <div className="time">
        {/* <TimeInput onChange={} /> */}
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
          onClick={startTimer}
        >
            Start
        </button>

        <button
          className="btn"
          type="button"
          onClick={stopTimer}
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
