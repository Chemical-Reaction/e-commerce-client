import React from 'react'
import axios from 'axios'
import apiUrl from './../apiConfig'

const CartItem = (props) => {
  const productBoxStyle = {
    border: '1px solid black',
    padding: '5px',
    marginBottom: '8px'
  }

  const nameStyle = {
    marginBottom: '2px',
    fontSize: '25px'
  }

  const descriptionStyle = {
    marginBottom: '5px'
  }

  const removeItem = (event) => {
    console.log('remove!!!')
    console.log('id', props.product._id)
    console.log('props index', props.index)

    console.log('this is the whole cart list', props.currentOrder.products)
    const currentOrderCopy = { ...props.currentOrder }
    const editedProducts = [ ...currentOrderCopy.products ]
    editedProducts.splice(props.index, 1)
    console.log('the new cart is ', editedProducts)
    console.log('order id is', props.orderId)
    console.log('token is', props.token)

    axios({
      method: 'PATCH',
      url: apiUrl + `/orders/${props.orderId}`,
      headers: {
        'Authorization': `Bearer ${props.token}`
      },
      data: {
        order: {
          products: editedProducts
        }
      }
    })
      .then((response) => {
        console.log('this is my patch response', response)
        const activeOrder = response.data.orders.find(order => order.active === true)
        console.log('new active order is', activeOrder)
        props.setActiveOrder(activeOrder)
      })
      .catch(console.error)
  }

  return (
    <div style={productBoxStyle}>
      <p style={nameStyle}>{props.product.name}, ${props.product.price}</p>
      <p style={descriptionStyle}>{props.product.description}</p>
      <button onClick={removeItem}>Remove from Cart</button>
    </div>
  )
}

export default CartItem
