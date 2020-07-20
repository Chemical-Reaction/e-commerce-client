import React from 'react'
import axios from 'axios'
import apiUrl from './../apiConfig'

const Product = (props) => {
  const handleAddtoCart = (event) => {
    if (props.token) {
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
        .then(() => {
          props.msgAlert({
            heading: 'Added to Cart',
            message: `Successfully added "${props.name}" to cart`,
            variant: 'success'
          })
        })
        .catch(console.error)
    } else {
      // this is where to handle a user's product page actions when not logged in
      console.log('you are not logged in. please log in to add to cart')
      props.msgAlert({
        heading: 'Not Signed In',
        message: 'Please Sign In to Add Products to Your Cart',
        variant: 'danger'
      })
    }
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
      <img src={props.image} alt='Product' width='278' />
      <p>Description: {props.description}</p>
      <p>Price: ${props.price}</p>
      <br />
      <button style={addButtonStyles} onClick={handleAddtoCart}>Add to Cart</button>
    </div>
  )
}

export default Product
