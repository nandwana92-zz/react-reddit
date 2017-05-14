import React, { Component } from 'react';
import axios from 'axios';
import glamorous from 'glamorous'
import { Link } from 'react-router-dom';

import Constants from './Constants.json'
import CustomButton from './CustomButton';

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
    return (
      this.props.isLoggedIn
      ? <CustomButton onClick={this.handleLogoutClick} buttonText="log out" />
      : <CustomButton onClick={this.handleLoginClick} buttonText="log in" />
    );;
  }
}

export default Login;
