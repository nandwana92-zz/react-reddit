import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import glamorous from 'glamorous';
import { css } from 'glamor';
import isNil from 'lodash/isNil';
import TimeAgo from 'react-timeago';

import './SubredditListItem.css';
import snoo from './snoo';

import VoteButtonContainer from './VoteButtonContainer';

const { Div, Span, Button, A, B, Img } = glamorous;

class SubredditListItem extends React.Component {
  render() {
    let userScore;
    const voted = !isNil(this.props.item.data.likes);
    const likes = this.props.item.data.likes;
    let vote = null;

    if (voted) {
      userScore = likes ? 1 : -1;
      vote = likes ? 'up' : 'down';
    } else {
      userScore = 0;
    }

    const scoreBg = voted ? (likes ? '#FF8B60' : '#9494FF') : '#9E9E9E';

    return (
      <Div overflow="hidden" backgroundColor="#F5F5F5" height="100px" margin="20px 0" display="flex" flexDirection="row">
        <Div flex="none" display="flex" flexDirection="row" justifyContent="space-around" alignItems="center" padding="10px" width="100px">
          <B margin="0 10px">{this.props.index + 1}</B>
          <Div display="flex" flexDirection="column">
            <VoteButtonContainer itemId={this.props.itemId} item={this.props.item} updateListItem={this.props.updateListItem} likes={likes} vote={vote} buttonType="up" />
            <Span fontWeight="bold" color={scoreBg}>{this.props.item.data.score + userScore}</Span>
            <VoteButtonContainer itemId={this.props.itemId} item={this.props.item} updateListItem={this.props.updateListItem} likes={likes} vote={vote} buttonType="down" />
          </Div>
        </Div>
        <Div flex="none" display="flex" flexDirection="column" justifyContent="center">
          <img style={{
            'maxHeight': '70px',
            'maxWidth': '70px'
          }} src={(this.props.item.data.thumbnail === 'default' || this.props.item.data.thumbnail === 'self') ? snoo : this.props.item.data.thumbnail} alt="" />
        </Div>
        <Div padding="10px" fontSize="20px">
          <A target="_blank" color="#0000ff" href={this.props.item.data.url}>
          {this.props.item.data.title}
          </A>
          <Div>
            <TimeAgo date={this.props.item.data.created_utc * 1000} /> by {this.props.item.data.author} in {this.props.item.data.subreddit_name_prefixed}
            <br />
            <Link to={`/${this.props.item.data.subreddit}/${this.props.item.data.id}`}>
              {this.props.item.data.num_comments} comments
            </Link>
          </Div>
        </Div>
      </Div>
    );
  }
}

export default SubredditListItem;
