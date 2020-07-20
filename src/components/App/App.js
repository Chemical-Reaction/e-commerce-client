import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import ProductPage from '../ProductPage'
import CheckoutPage from '../CheckoutPage'

import Cart from '../Cart'

import PastOrderPage from '../PastOrderPage'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const promise = loadStripe('pk_test_51H66m5Bl2OnK3EGGkcTtz68xN5pTzIIQrToRqtmD27h6IAaeHwuravCHArscG3qn2PKYtszTB7fGLspUtvNQ9qJm00q5Y8REjS')

// import Product from '../Product'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Elements stripe={promise} >
          <Header user={user} />
          {msgAlerts.map((msgAlert, index) => (
            <AutoDismissAlert
              key={index}
              heading={msgAlert.heading}
              variant={msgAlert.variant}
              message={msgAlert.message}
            />
          ))}
          <main className="container">
            <Route path='/sign-up' render={() => (
              <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
            )} />
            <Route path='/sign-in' render={() => (
              <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
            )} />
            <Route user={user} path="/products" render={() => (
              <ProductPage token={user ? user.token : null} msgAlert={this.msgAlert} />
            )} />
            <AuthenticatedRoute user={user} path="/past-orders" render={() => (
              <PastOrderPage token={user.token} />
            )} />
            <AuthenticatedRoute user={user} path='/sign-out' render={() => (
              <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
            )} />
            <AuthenticatedRoute user={user} path='/change-password' render={() => (
              <ChangePassword msgAlert={this.msgAlert} user={user} />
            )} />
            <AuthenticatedRoute user={user} path='/cart' render={() => (
              <Cart token={user.token} />
            )} />
            <AuthenticatedRoute user={user} path='/checkout' render={(componentProps) => (
              <CheckoutPage redirectState={componentProps} user={user} msgAlert={this.msgAlert} />
            )} />
          </main>
        </Elements>
      </Fragment>
    )
  }
}

export default App
