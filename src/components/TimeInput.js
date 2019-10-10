/* eslint-disable max-len */
/* eslint-disable no-restricted-globals */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Input extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: ''
    }
  }

  setValue = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  handleChange = ({ target: { value } }) => {
    // eslint-disable-next-line no-mixed-operators
    this.setState(state => value.length <= 60 && !isNaN(Number(value)) && { value } || state)
    console.log(value)

    // if(value.length <= 60 && !isNaN(Number(value))) {
    //   return
    // }
  }

  render() {
    const {
      placeholder
    } = this.props

    const {
      value
    } = this.state
    return (
      <div className="time-input">
        <input
          type="number"
          value={value}
          maxLength={60}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

Input.defaultProps = {
  placeholder: '00'
}

Input.propTypes = {
  placeholder: PropTypes.string
}

export default Input
