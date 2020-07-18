import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

const CheckoutPage = (props) => {
  console.log('props on checkoutpage', props)
  const { total } = props.redirectState.location.state

  const [backToCart, setBackToCart] = useState(false)

  const toCart = (event) => {
    setBackToCart(true)
  }

  if (backToCart) {
    return <Redirect to='/cart' />
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Checkout</h1>
      <button onClick={toCart}>Back to Cart</button>
      <p>Your order total: ${total}</p>
      <p>Your email is: {props.user.email}</p>
    </div>
  )
}

export default CheckoutPage
