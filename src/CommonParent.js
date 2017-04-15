import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import isNil from 'lodash/isNil';

import RedditFrontPage from './RedditFrontPage';
import Login from './Login';
import Callback from './Callback';
import Post from './Post';

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
      <div className="App">
        <Login isLoggedIn={this.state.isLoggedIn} setLoggedInState={this.setLoggedInState} />
        <Route path="/:subreddit/:id" render={(props) => <Post {...props} isLoggedIn={this.state.isLoggedIn} />} />
        <Route exact path="/" render={() => <RedditFrontPage isLoggedIn={this.state.isLoggedIn} />} />
        <Route path="/callback" render={() => <Callback isLoggedIn={this.state.isLoggedIn} setLoggedInState={this.setLoggedInState} />} />
      </div>
    );
  }
}

export default CommonParent;
