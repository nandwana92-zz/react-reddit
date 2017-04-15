import React, { Component } from 'react';
import Infinite from 'react-infinite';
import Spinner from 'react-spinkit';
import axios from 'axios';
import { map, assign }  from 'lodash';
import glamorous from 'glamorous';

import assignUniqueKeys from './utils/assignUniqueKeys';
import SubredditListItem from './SubredditListItem';

const { Div, Span, Button, A, B, Img } = glamorous;

let after = '';

class RedditFrontPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInfiniteLoading: false,
      data: {}
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
        data: {}
      });
    }
  }

  getFrontPageData = () => {
    this.setState({
      isInfiniteLoading: true
    });

    const isAuthenticated = this.props.isLoggedIn;
    const prefix = this.props.isLoggedIn ? 'protected' : 'public';

    axios.get(`/${prefix}_api/.json?limit=25&after=${after}`)
    .then((response) => {
      this.setState({
        isInfiniteLoading: false,
        data: assign({}, this.state.data, assignUniqueKeys(response.data.data.children))
      });

      after = response.data.data.after;
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  updateListItem = (itemId, item) => {
    this.setState({
      data: assign({}, this.state.data, {
        itemId: item
      })
    });

    console.log(item);
  }

  render() {
    let index = 0;

    return (
      <div>
        <Infinite elementHeight={120}
          useWindowAsScrollContainer
          onInfiniteLoad={this.getFrontPageData}
          infiniteLoadBeginEdgeOffset={200}
          loadingSpinnerDelegate={this.elementInfiniteLoad()}
          isInfiniteLoading={this.state.isInfiniteLoading}
          >
          {
            map(this.state.data, (item, key) =>
              <SubredditListItem updateListItem={this.updateListItem} key={key} itemId={key} item={item} index={index++} />
            )
          }
        </Infinite>
      </div>
    );
  }
}

export default RedditFrontPage;
