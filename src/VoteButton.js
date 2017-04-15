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
    ':active': {
      textShadow: '#9e9e9e 1px 2px 2px',
      color: buttonColors[buttonType]
    }
  });

  const btnColor = (buttonType === vote && buttonColors[vote]) || '#9E9E9E';

  return (
    <Span transition="all 0.25s" alignSelf="center" fontSize="18px" flex="none" marginBottom="2px" marginTop="2px" color={btnColor} className={`${voteButtonStyle}`} role="button" onClick={() => onClick(buttonType)}>
      <FontAwesome name={`arrow-${buttonType}`} />
    </Span>
  );
}

export default VoteButton;
