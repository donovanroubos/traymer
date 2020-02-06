import React from 'react'

function Circle() {
  return (
    <svg viewBox="0 0 63.66 63.66" id="timer">
      <circle class="circle-base" cx="50%" cy="50%" r="25%" />
      <circle class="circle-fill" cx="50%" cy="50%" r="25%" stroke-dasharray="10 100" style="transition: stroke-dasharray 0.1s ease 0s;" />
    </svg>
  )
}

export default Circle
