import React, { Component } from 'react'
import PastOrder from './PastOrder'
import axios from 'axios'

import apiUrl from './../apiConfig'

class PastOrderPage extends Component {
  constructor () {
    super()

    this.state = {
      pastOrderList: []
    }
  }

  componentDidMount () {
    console.log('props are', this.props)
    axios({
      method: 'GET',
      url: apiUrl + '/orders',
      headers: {
        'Authorization': `Token token=${this.props.token}`
      }
    })
      .then(response => {
        // filter all of the orders and take only one with active false
        this.setState({ pastOrderList: response.data.orders })
        console.log('this is pastOrderList', this.pastOrderList)
        console.log('this is orders', response.data.orders)
      })
      .catch(console.error) // change this later to include a failure message
  }

  render () {
    return (
      this.state.pastOrderList.map(pastOrder => (
        <PastOrder key={pastOrder.products} products={pastOrder.products} date={pastOrder.date} />
      ))
    )
  }
}

export default PastOrderPage
