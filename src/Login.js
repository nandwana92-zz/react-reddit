import React, { Component } from 'react';
import axios from 'axios';
import glamorous from 'glamorous'
import { Link } from 'react-router-dom';

import Constants from './Constants.json'

const { Div, Span, Button, A, B, Img } = glamorous

class Login extends Component {
  handleLogoutClick = () => {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('bearerToken');
    this.props.setLoggedInState(false);
  }

  handleLoginClick = () => {
    window.location = Constants['O_AUTH_URL'];
  }

  render() {
    const elem = this.props.isLoggedIn
      ? <button onClick={this.handleLogoutClick}>Log Out</button>
      : <button onClick={this.handleLoginClick}>Log In</button>;

    return (
      <Div position="fixed" top="24px" right="24px">
        <Link to="/">
          home
        </Link>
        {elem}
      </Div>
    );;
  }
}

export default Login;
