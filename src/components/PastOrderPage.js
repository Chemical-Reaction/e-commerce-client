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
        const orders = response.data.orders
        const inactiveOrders = orders.filter(order => order.active === false)
        this.setState({ pastOrderList: inactiveOrders })
      })
      .catch(console.error) // change this later to include a failure message
  }

  render () {
    return (
      this.state.pastOrderList.map(pastOrder => (
        <PastOrder key={pastOrder._id} products={pastOrder.products} date={pastOrder.date} />
      ))
    )
  }
}

export default PastOrderPage
