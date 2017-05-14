import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import snoowrap from 'snoowrap';
import isNil from 'lodash/isNil';
import { initializeSnooWrap, getSnooWrapInstance, add, get } from './wrapperThing';
import glamorous from 'glamorous';
import { css } from 'glamor';

import RedditFrontPage from './RedditFrontPage';
import Login from './Login';
import Callback from './Callback';
import Post from './Post';
import Header from './Header';

const { Div, Span, Button, A, B, Img } = glamorous;

class CommonParent extends Component {
  constructor(props) {
    super(props);
    const bearerToken = localStorage.getItem('bearerToken');
    let isLoggedIn = false;

    if (!isNil(bearerToken)) {
      isLoggedIn = true;
      const AUTH_TOKEN = `bearer ${bearerToken}`;
      axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    }

    this.state = {
      isLoggedIn
    };
  }

  setLoggedInState = (value) => {
    this.setState({
      isLoggedIn: value
    });
  }

  render() {
    return (
      <Div paddingTop="48px">
        <Header isLoggedIn={this.state.isLoggedIn} setLoggedInState={this.setLoggedInState} />
        <Route path="/:subreddit/:id" render={(props) => <Post {...props} isLoggedIn={this.state.isLoggedIn} />} />
        <Route exact path="/" render={() => <RedditFrontPage isLoggedIn={this.state.isLoggedIn} />} />
        <Route path="/callback" render={() => <Callback isLoggedIn={this.state.isLoggedIn} setLoggedInState={this.setLoggedInState} />} />
      </Div>
    );
  }
}

export default CommonParent;
