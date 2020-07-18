import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import CartItem from './CartItem'
import axios from 'axios'
import apiUrl from './../apiConfig'

const Cart = (props) => {
  const [active, setActive] = useState(null)
  const [checkout, setCheckout] = useState(null)

  useEffect(() => {
    axios({
      method: 'GET',
      url: apiUrl + '/orders',
      headers: {
        'Authorization': `Bearer ${props.token}`
      }
    })
      .then(response => {
        console.log('this is the orders response', response)
        const orders = response.data.orders
        console.log('this is the orders array', orders)
        const activeOrder = orders.find(order => order.active === true)
        console.log('active order is', activeOrder)
        setActive(activeOrder)
      })
      .catch(console.error)
  }, [])

  const toCheckout = (event) => {
    setCheckout(true)
  }

  if (checkout) {
    return <Redirect to='/checkout' />
  }

  let productsJSX = ''
  let costJSX = ''

  if (!active) {
    productsJSX = <h4 style={{ textAlign: 'center' }}>Loading...</h4>
  } else if (active.products && active.products.length === 0) {
    productsJSX = (
      <h4 style={{ textAlign: 'center' }}>You currently have no items in your cart</h4>
    )
  } else if (active.products && active.products.length > 0) {
    productsJSX = active.products.map((product, productIndex) => <CartItem product={product} key={productIndex} index={productIndex} token={props.token} orderId={active._id} setActiveOrder={setActive} currentOrder={active} />)

    let totalCost = 0
    active.products.forEach(product => {
      totalCost += product.price
    })

    const costStyle = {
      marginTop: '50px'
    }

    costJSX = (
      <div style={costStyle}>
        <h3>Order Total Cost: ${totalCost}</h3>
        <button onClick={toCheckout}>Proceed to Checkout</button>
      </div>
    )
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>My Cart</h1>
      {productsJSX}
      {costJSX}
    </div>
  )
}

export default Cart
