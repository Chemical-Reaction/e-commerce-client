import React, { Component } from 'react'
import Product from './Product'
import axios from 'axios'

import apiUrl from './../apiConfig'

class ProductPage extends Component {
  constructor () {
    super()

    this.state = {
      productList: [{
        name: 'apple',
        description: 'a good fruit',
        price: 5
      }, {
        name: 'banana',
        description: 'a yellow fruit',
        price: 3
      }, {
        name: 'orange',
        description: 'citrus fruit',
        price: 75
      }],
      cart: null
    }
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: apiUrl + '/products'
    })
      .then(response => {
        this.setState({ productList: response.data.products })
      })
      .catch(console.error) // change this later to include a failure message

    if (this.props.token) {
      axios({
        method: 'GET',
        url: apiUrl + '/orders',
        headers: {
          'Authorization': `Token token=${this.props.token}`
        }
      })
        .then((response) => {
          const activeOrder = response.data.orders.find(order => order.active === true)
          this.setState({ cart: activeOrder })
        })
        .catch(console.error) // change this later to include a failure message
    }
  }

  render () {
    return (
      <div className='container'>
        <div className='row' style={{ display: 'flex', justifyContent: 'space-between' }}>
          {this.state.productList.map(product => (
            <Product key={product.name} name={product.name} description={product.description} price={product.price}
              image={product.image} productId={product._id} cart={this.state.cart} token={this.props.token} msgAlert={this.props.msgAlert}/>
          ))}
        </div>
      </div>
    )
  }
}

export default ProductPage
