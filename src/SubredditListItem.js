import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import glamorous from 'glamorous';
import isNil from 'lodash/isNil';

import './SubredditListItem.css';
import snoo from './snoo';

const { Div, Span, Button, A, B, Img } = glamorous;

class SubredditListItem extends React.Component {
  render() {
    let userScore;
    const voted = !isNil(this.props.item.data.likes);
    const likes = this.props.item.data.likes;

    if (voted) {
      userScore = likes ? 1 : -1;
    } else {
      userScore = 0;
    }

    const scoreBg = voted ? (likes ? '#FF8B60' : '#9494FF') : '#9E9E9E';

    return (
      <Div backgroundColor="#F5F5F5" height="80px" margin="20px 0" display="flex" flexDirection="row">
        <Div flex="none" display="flex" flexDirection="row" justifyContent="space-around" alignItems="center" padding="10px" width="100px">
          <B margin="0 10px">{this.props.index + 1}</B>
          <Div display="flex" flexDirection="column">
            <Button fontSize="18px" flex="none" marginBottom="2px" marginTop="2px">
              <Span color={(voted && likes && scoreBg) || '#9E9E9E'}>
                <FontAwesome name="arrow-up" />
              </Span>
            </Button>
            <Span fontWeight="bold" color={scoreBg}>{this.props.item.data.score + userScore}</Span>
            <Button fontSize="18px" flex="none" marginBottom="2px" marginTop="2px">
              <Span color={(voted && !likes && scoreBg) || '#9E9E9E'}>
                <FontAwesome name="arrow-down" />
              </Span>
            </Button>
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
        </Div>
      </Div>
    );
  }
}

export default SubredditListItem;
