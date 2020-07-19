import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from './../apiConfig'

import {
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'

const CheckoutPage = (props) => {
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')
  const stripe = useStripe()
  const elements = useElements()

  console.log('props on checkoutpage', props)
  const { subtotal, items } = props.redirectState.location.state
  const tax = Math.round((subtotal * 0.075) * 100) / 100
  const total = subtotal + tax

  const [backToCart, setBackToCart] = useState(false)

  useEffect(() => {
    console.log('useEffect is being run')
    axios({
      method: 'POST',
      url: apiUrl + '/create-payment-intent',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        amount: total
      }
    })
      .then(data => {
        console.log('this is response data', data)
        setClientSecret(data.data.clientSecret)
      })
  }, [])

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Roboto, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    }
  }

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  const handleSubmit = async ev => {
    ev.preventDefault()
    setProcessing(true)
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: ev.target.name.value
        }
      }
    })
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`)
      setProcessing(false)
    } else {
      setError(null)
      setProcessing(false)
      setSucceeded(true)
      console.log('payment succeeded')
    }
  }

  const toCart = (event) => {
    setBackToCart(true)
  }

  if (backToCart) {
    return <Redirect to='/cart' />
  }

  const itemStyle = {
    marginTop: '5px',
    marginBottom: '5px'
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Checkout</h1>
      <button onClick={toCart}>Back to Cart</button>
      <h2 style={{ textAlign: 'center' }}>Order Summary</h2>
      <ul style={{ marginBottom: '20px' }}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li style={itemStyle}>{item.name} (${item.price})</li>
          </React.Fragment>
        ))}
      </ul>
      <p>Subtotal: ${subtotal.toFixed(2)}</p>
      <p>Sales Tax (7.5%): ${tax.toFixed(2)}</p>
      <h3>Order Total: ${total.toFixed(2)}</h3>
      <p>Your email is: {props.user.email}</p>
      <br />
      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
        <button className="stripe-button"
          disabled={processing || disabled || succeeded}
          id="submit"
        >
          <span id="button-text">
            {processing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              'Pay'
            )}
          </span>
        </button>
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        {/* Show a success message upon completion */}
        <p className={succeeded ? 'result-message' : 'result-message hidden'}>
          Payment succeeded, see the result in your
          <a
            href={'https://dashboard.stripe.com/test/payments'}
          >
            {' '}
            Stripe dashboard.
          </a> Refresh the page to pay again.
        </p>
      </form>
      <p style={{ fontStyle: 'italic', textAlign: 'center', marginTop: '5px', fontSize: '13px' }}>Payment Powered by Stripe</p>
    </div>
  )
}

export default CheckoutPage