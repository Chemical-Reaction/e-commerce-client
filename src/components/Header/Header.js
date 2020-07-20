import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import logo from './petsy-logo.png'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#cart">Cart</Nav.Link>
    <Nav.Link href="#past-orders">Past Orders</Nav.Link>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link href="#products">Products</Nav.Link>
  </Fragment>
)

const navStyle = {
  backgroundColor: '#D4A5A5'
}

const logoStyle = {
  backgroundColor: 'white',
  marginRight: '10px',
  borderRadius: '25px'
}

const Header = ({ user }) => (
  <Navbar style={navStyle} variant="dark" expand="md">
    <Navbar.Brand href="#">
      <img src={logo} height='50' style={logoStyle} />
      Petsy
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
