import React from 'react';
import glamorous from 'glamorous';
import FontAwesome from 'react-fontawesome';
import { css } from 'glamor';

const { Div, Span, Button, A, B, Img } = glamorous;

class VoteButton extends React.Component {
  render() {
    const buttonColors = {
      up: '#FF8B60',
      down: '#9494FF'
    }

    const voteButtonStyle = css({
      ':active': {
        textShadow: '#9e9e9e 1px 2px 2px',
        color: buttonColors[this.props.buttonType]
      }
    });

    const btnColor = (this.props.buttonType === this.props.vote && buttonColors[this.props.vote]) || '#9E9E9E';

    return (
      <Span transition="all 0.25s" alignSelf="center" fontSize="18px" flex="none" marginBottom="2px" marginTop="2px" color={btnColor} role="button" className={`${voteButtonStyle}`}>
        <FontAwesome name={`arrow-${this.props.buttonType}`} />
      </Span>
    );
  }

}

export default VoteButton;
