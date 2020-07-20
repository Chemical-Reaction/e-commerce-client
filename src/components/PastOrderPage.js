import React, { Component } from 'react'
import PastOrder from './PastOrder'
import axios from 'axios'

import apiUrl from './../apiConfig'

class PastOrderPage extends Component {
  constructor () {
    super()

    this.state = {
      pastOrderList: [],
      loading: true
    }
  }

  componentDidMount () {
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
        this.setState({ pastOrderList: inactiveOrders, loading: false })
      })
      .catch(console.error) // change this later to include a failure message
  }

  titleStyle = {
    textAlign: 'center'
  }

  render () {
    return (
      <div>
        <h1 style={this.titleStyle}>Past Orders</h1>
        {
          this.state.loading && <p>Loading...</p>
        }
        {
          this.state.pastOrderList && this.state.pastOrderList.length > 0 && (
            [ ...this.state.pastOrderList ].reverse().map(pastOrder => (
              <PastOrder key={pastOrder._id} products={pastOrder.products} date={pastOrder.updatedAt.substring(0, 10)} />
            ))
          )
        }
        {
          !this.state.loading && this.state.pastOrderList && this.state.pastOrderList.length === 0 && <h2>You have no past orders.</h2>
        }
      </div>
    )
  }
}

export default PastOrderPage
