import React from 'react'
import axios from 'axios'
import apiUrl from './../apiConfig'

const CartItem = (props) => {
  const productBoxStyle = {
    border: '1px solid black',
    padding: '10px',
    marginBottom: '8px',
    maxWidth: '50vw',
    margin: '10px auto'
  }

  const nameStyle = {
    marginBottom: '2px',
    fontSize: '25px'
  }

  const descriptionStyle = {
    marginBottom: '5px'
  }

  const removeItem = (event) => {
    const currentOrderCopy = { ...props.currentOrder }
    const editedProducts = [ ...currentOrderCopy.products ]
    editedProducts.splice(props.index, 1)

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
        const activeOrder = response.data.orders.find(order => order.active === true)
        props.setActiveOrder(activeOrder)
      })
      .then(() => props.msgAlert({
        heading: 'Removed from cart',
        message: `You successfully removed ${props.product.name} from the cart`,
        variant: 'success'
      }))
      .catch(() => {
        props.msgAlert({
          heading: 'Failed to remove item',
          message: 'An error occured, try again',
          variant: 'danger'
        })
      })
  }

  return (
    <div style={productBoxStyle}>
      <p style={nameStyle}>{props.product.name}, ${props.product.price}</p>
      <img src={props.product.image} width='150' height='150'/>
      <p style={descriptionStyle}>{props.product.description}</p>
      <button onClick={removeItem}>Remove from Cart</button>
    </div>
  )
}

export default CartItem
