import React from 'react'

const PastOrder = (props) => {
  let totalCost = 0
  props.products.forEach(product => {
    totalCost += product.price
  })

  const costStyle = {
    marginTop: '50px'
  }

  const nameStyle = {
    marginBottom: '2px',
    fontSize: '25px'
  }

  const descriptionStyle = {
    marginBottom: '5px'
  }

  const productBoxStyle = {
    border: '1px solid black',
    padding: '5px',
    marginBottom: '8px'
  }

  const productNewList = props.products.map(product => (
    <div key={product._id} style={productBoxStyle}>
      <p style={nameStyle}>{product.name}, ${product.price}</p>
      <p style={descriptionStyle}>{product.description}</p>
    </div>
  ))
  // h1 Past Orders should show up only once, not for every order
  return (
    <div>
      <h1>Past Orders</h1>
      <p>{productNewList}</p>
      <p>{props.date}</p>
      <p>Total: ${totalCost} style={costStyle}</p>
    </div>
  )
}

export default PastOrder
