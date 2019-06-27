import React, { Component } from 'react'
import isElectron from 'is-electron'

class Timer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timerOn: false,
      timerTime: 0
    }

    this.minuteInput = React.createRef()
  }

  startTimer = () => {
    const { timerTime } = this.state

    this.setState({
      timerOn: true,
      timerTime
    })

    if (timerTime !== 0) {
      this.timer = setInterval(() => {
        const { timerTime } = this.state

        const newTime = timerTime - 10
        if (newTime >= 0) {
          this.setState({
            timerTime: newTime
          })
        } else {
          clearInterval(this.timer)

          this.setState({
            timerOn: false
          })

          if (isElectron()) {
            window.ipcRenderer.send('stop-timer')
            console.log(window.ipcRenderer)
          }
        }
      }, 10)
    }
  }

  stopTimer = () => {
    clearInterval(this.timer)

    this.setState({
      timerOn: false
    })
  }

  resetTimer = () => {
    const { timerOn } = this.state

    if (!timerOn) {
      this.setState({
        timerTime: 0
      })

      this.minuteInput.current.value = 0
      console.log(this.minuteInput)
    }
  }

  setTime = (e) => {
    const inputInMinutes = e.target.value

    this.setState({
      timerTime: inputInMinutes * 60000
    })
  }

  render() {
    const { timerTime } = this.state

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
          ref={this.minuteInput}
          type="number"
          placeholder="Time in minutes"
          onChange={e => this.setTime(e)}
        />

        <div className="btns">
          <button
            className="btn"
            type="button"
            onClick={this.startTimer}
          >
              Start
          </button>

          <button
            className="btn"
            type="button"
            onClick={this.stopTimer}
          >
            Stop
          </button>

          <button
            className="btn"
            type="button"
            onClick={this.resetTimer}
          >
            Reset
          </button>
        </div>

      </div>
    )
  }
}

export default Timer
