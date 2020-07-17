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
      }]
    }
  }

  componentDidMount () {
    console.log('props are', this.props)
    axios({
      method: 'GET',
      url: apiUrl + '/products',
      headers: {
        'Authorization': `Token token=${this.props.token}`
      }
    })
      .then(response => {
        this.setState({ productList: response.data.products })
      })
      .catch(console.error) // change this later to include a failure message
  }

  render () {
    return (
      this.state.productList.map(product => (
        <Product key={product.name} name={product.name} description={product.description} price={product.price} />
      ))
    )
  }
}

export default ProductPage
