import React from 'react'

const Product = (props) => {
  const handleAddtoCart = (event) => {
    event.preventDefault()
    console.log('you clicked the button')
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
