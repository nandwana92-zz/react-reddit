import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';

import { initializeSnooWrap, getSnooWrapInstance, get } from './wrapperThing';
import getHashParams from './utils/getHashParams';
import Constants from './Constants.json'

class Callback extends Component {
  componentDidMount() {
    const hashParams = getHashParams();

    if (hashParams.hasOwnProperty('code')) {
      const code = hashParams.code;
      const requestBody = `grant_type=authorization_code&code=${code}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback`

      axios.post('/public_api/api/v1/access_token', requestBody, {
        auth: {
          username: Constants['CLIENT_ID'],
          password: ''
        }
      })
      .then((response) => {
        console.log(getSnooWrapInstance());
        const snooWrapCredentials = {
          clientId: 'PbFHdvJmUVND5g',
          clientSecret: '',
          refreshToken: response.data['refresh_token']
        };
        initializeSnooWrap(snooWrapCredentials);
        console.log(getSnooWrapInstance());
        const bearerToken = response.data['access_token'];
        localStorage.setItem('snooWrapCredentials', JSON.stringify(snooWrapCredentials));
        localStorage.setItem('bearerToken', bearerToken);
        const AUTH_TOKEN = `bearer ${bearerToken}`;
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
        this.props.setLoggedInState(true);
      })
      .catch(function (error) {
        console.log(error);
      });
    } else {
      console.log('"code" parameter not found');
    }
  }

  render() {
    const elem = this.props.isLoggedIn ? (
      <Redirect to='/' />
    ) : (
      <div>...</div>
    )

    return elem;
  }
}

export default Callback;
