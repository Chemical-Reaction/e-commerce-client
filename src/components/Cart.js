import React, { useState, useEffect } from 'react'
import CartItem from './CartItem'
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
        setProducts(activeOrder.products)
        setActive(activeOrder)
      })
      .catch(console.error)
  }, [])

  let productsJSX = ''
  let costJSX = ''

  if (!active) {
    productsJSX = <h4 style={{ textAlign: 'center' }}>Loading...</h4>
  } else if (products && products.length === 0) {
    productsJSX = (
      <h4 style={{ textAlign: 'center' }}>You currently have no items in your cart</h4>
    )
  } else if (products && products.length > 0) {
    productsJSX = products.map((product, productIndex) => <CartItem product={product} key={product._id} index={productIndex} productList={products} token={props.token} orderId={active._id} setActiveOrder={setActive} setCartProducts={setProducts} />)

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
