import React from 'react'
import axios from 'axios'
import apiUrl from './../apiConfig'

const Product = (props) => {
  const handleAddtoCart = (event) => {
    console.log('you clicked the button')
    console.log('product id', props.productId)
    console.log('cart is', props.cart)
    props.cart.products.push(props.productId)

    axios({
      method: 'PATCH',
      url: apiUrl + `/orders/${props.cart._id}`,
      headers: {
        'Authorization': `Bearer ${props.token}`
      },
      data: {
        order: props.cart
      }
    })
      .then((response) => {
        console.log('this is my patch response', response)
      })
      .catch(console.error)
  }

  const productStyles = {
    border: '3px solid black',
    margin: '10px',
    padding: '5px',
    width: '300px'
  }

  const addButtonStyles = {
    color: 'black'
  }

  return (
    <div style={productStyles}>
      <h2>Name: {props.name}</h2>
      <p>Description: {props.description}</p>
      <p>Price: ${props.price}</p>
      <br />
      <button style={addButtonStyles} onClick={handleAddtoCart}>Add to Cart</button>
    </div>
  )
}

export default Product
