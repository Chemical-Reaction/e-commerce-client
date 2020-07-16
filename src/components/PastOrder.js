import React from 'react'

const PastOrder = (props) => {
  const total = function () {
    return 10
  }
  // array of jsx and use map(), use movies example with actors
  return (
    <div>
      <h1>Past Orders</h1>
      <p>{props.products}</p>
      <p>{props.date}</p>
      <p>Total: ${total}</p>
    </div>
  )
}

export default PastOrder
