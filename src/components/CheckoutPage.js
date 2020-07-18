import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

const CheckoutPage = (props) => {
  console.log('props on checkoutpage', props)
  const { subtotal, items } = props.redirectState.location.state
  const tax = Math.round((subtotal * 0.075) * 100) / 100
  const total = subtotal + tax

  const [backToCart, setBackToCart] = useState(false)

  const toCart = (event) => {
    setBackToCart(true)
  }

  if (backToCart) {
    return <Redirect to='/cart' />
  }

  const itemStyle = {
    marginTop: '5px',
    marginBottom: '5px'
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Checkout</h1>
      <button onClick={toCart}>Back to Cart</button>
      <h2 style={{ textAlign: 'center' }}>Order Summary</h2>
      <ul style={{ marginBottom: '20px' }}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li style={itemStyle}>{item.name} (${item.price})</li>
          </React.Fragment>
        ))}
      </ul>
      <p>Subtotal: ${subtotal.toFixed(2)}</p>
      <p>Sales Tax (7.5%): ${tax.toFixed(2)}</p>
      <h3>Order Total: ${total.toFixed(2)}</h3>
      <p>Your email is: {props.user.email}</p>
    </div>
  )
}

export default CheckoutPage
