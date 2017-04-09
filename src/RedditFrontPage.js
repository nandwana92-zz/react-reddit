import React, { Component } from 'react';
import Infinite from 'react-infinite';
import Spinner from 'react-spinkit';
import axios from 'axios';
import shortid from 'shortid';
import map from 'lodash/map';
import glamorous from 'glamorous';

import SubredditListItem from './SubredditListItem';

const { Div, Span, Button, A, B, Img } = glamorous;

let after = '';

class RedditFrontPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInfiniteLoading: false,
      data: []
    };
  }

  elementInfiniteLoad = () => {
    return (
      <Div display="flex" justifyContent="center" padding="10px">
        <Spinner noFadeIn spinnerName='double-bounce' />
      </Div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn !== this.props.isLoggedIn) {
      after = '';
      this.setState({
        data: []
      });
    }
  }

  getFrontPageData = () => {
    this.setState({
      isInfiniteLoading: true
    });

    const isAuthenticated = this.props.isLoggedIn;
    const prefix = this.props.isLoggedIn ? 'protected' : 'public';

    function assignUniqueKeys(data) {
      return map(data, (value) => {
        return {
          key: shortid.generate(),
          value
        }
      })
    }

    axios.get(`/${prefix}_api/.json?limit=25&after=${after}`).then((response) => {
      this.setState({
        isInfiniteLoading: false,
        data: this.state.data.concat(assignUniqueKeys(response.data.data.children))
      });

      after = response.data.data.after;
    });
  }

  render() {
    return (
      <div>
        <Infinite elementHeight={100}
          useWindowAsScrollContainer
          onInfiniteLoad={this.getFrontPageData}
          infiniteLoadBeginEdgeOffset={200}
          loadingSpinnerDelegate={this.elementInfiniteLoad()}
          isInfiniteLoading={this.state.isInfiniteLoading}
          >
          {
            map(this.state.data, (item, index) =>
              <SubredditListItem key={item.key} item={item.value} index={index} />
            )
          }
        </Infinite>
      </div>
    );
  }
}

export default RedditFrontPage;
