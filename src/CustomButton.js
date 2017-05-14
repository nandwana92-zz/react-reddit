import React from 'react';
import glamorous from 'glamorous';
import Loader from 'halogen/MoonLoader';
import { css } from 'glamor';

const { Div, Span, Button, A, B, Img } = glamorous;

const buttonColors = {
  up: '#FF8B60',
  down: '#9494FF'
}

const customButtonStyle = css({
  fontFamily: '\'Open Sans\', sans-serif',
  boxShadow: '0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)',
  padding: '5px 10px',
  borderRadius: '3px',
  border: 'none',
  transitionDuration: '0.15s',
  cursor: 'pointer',
  backgroundColor: '#1c97eb',
  display: 'inline-flex',
  alignItems: 'center',
  height: '28px',
  color: '#fff',
  ':hover': {
    transform: 'translateY(-1px)',
    backgroundColor: '#32a1ed'
  },
  ':active': {
    transform: 'translateY(1px)',
    backgroundColor: '#1987d3'
  }
});

class CustomButton extends React.Component {

  render() {
    return (
      <Button disabled={this.props.showLoader} onClick={this.props.onClick} className={`${customButtonStyle}`} role="button" height="28px" tabIndex="0">
        <span>{this.props.buttonText}</span>
        {
          this.props.showLoader && (
            <Span padding="0 5px">
              <Loader color="#fff" size="16px"/>
            </Span>
          )
        }
      </Button>
    );
  }

}

CustomButton.defaultProps = {
  showLoader: false
};

export default CustomButton;
