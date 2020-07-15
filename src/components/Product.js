import React, { Component } from 'react'

class Product extends Component {
  render () {
    return (
      <div style={{ border: '3px solid black', margin: '10px', padding: '5px', width: '300px' }}>
        <h2>Name: {this.props.name}</h2>
        <p>Description: {this.props.description}</p>
        <p>Price: ${this.props.price}</p>
        <button>Please Sign in to add to cart</button>
        <br />
        <button>Add to Cart</button>
      </div>
    )
  }
}

export default Product
