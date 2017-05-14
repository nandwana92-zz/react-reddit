import React from 'react';
import glamorous from 'glamorous';
import FontAwesome from 'react-fontawesome';
import { css } from 'glamor';

const { Div, Span, Button, A, B, Img } = glamorous;

const buttonColors = {
  up: '#FF8B60',
  down: '#9494FF'
}

const VoteButton = ({ vote, buttonType, onClick }) => {
  const voteButtonStyle = css({
    'transitionDuration': '0.15s',
    ':hover': {
      transform: `translateY(${buttonType === 'up' ? '-' : ''}1px)`
    },
    ':active': {
      textShadow: '#9e9e9e 1px 2px 2px',
      color: buttonColors[buttonType],
      transform: `translateY(${buttonType === 'up' ? '' : '-'}1px)`
    }
  });

  const btnColor = (buttonType === vote && buttonColors[vote]) || '#9E9E9E';

  return (
    <Span alignSelf="center" fontSize="18px" flex="none" marginBottom="2px" marginTop="2px" color={btnColor} className={`${voteButtonStyle}`} role="button" onClick={() => onClick(buttonType)}>
      <FontAwesome name={`arrow-${buttonType}`} />
    </Span>
  );
}

export default VoteButton;
