import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from './../apiConfig'

const Cart = (props) => {
  const [active, setActive] = useState(null)
  const [products, setProducts] = useState(null)
  const [cartJSX, setCartJSX] = useState(<h3>Cart Contents</h3>)
  console.log(active, setActive, cartJSX, setCartJSX, products, setProducts)

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
        setProducts(activeOrder.products)
      })
      .catch(console.error)
  }, [])

  if (!active) {
    return (
      <div>
        <h1>My Cart</h1>
        <h4>You currently have no items in your cart</h4>
      </div>
    )
  }

  let productsJSX = ''
  let costJSX = ''
  if (products) {
    const productBoxStyle = {
      border: '1px solid black',
      padding: '5px',
      marginBottom: '8px'
    }

    const nameStyle = {
      marginBottom: '2px',
      fontSize: '25px'
    }

    const descriptionStyle = {
      marginBottom: '5px'
    }

    productsJSX = products.map(product => (
      <div key={product._id} style={productBoxStyle}>
        <p style={nameStyle}>{product.name}, ${product.price}</p>
        <p style={descriptionStyle}>{product.description}</p>
      </div>
    ))

    let totalCost = 0
    products.forEach(product => {
      totalCost += product.price
    })

    const costStyle = {
      marginTop: '50px'
    }

    costJSX = (
      <div style={costStyle}>
        <h3>Order Total Cost: ${totalCost}</h3>
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
