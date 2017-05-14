import React from 'react';
import logo from './images/frame_2_delay-0.5s.png';
import glamorous from 'glamorous';
import { css } from 'glamor';
import { Link } from 'react-router-dom';

import Login from './Login';

const { Div, Span, Button, A, B, Img } = glamorous;

const homeButtonStyle = css({
  transitionDuration: '0.15s',
  display: 'flex',
  alignItems: 'center',
  ':hover': {
    transform: 'translateY(-1px)',
  },
  ':active': {
    transform: 'translateY(1px)',
  }
});

class Header extends React.Component {

  render() {
    return (
      <Div boxShadow="0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)" position="fixed" width="100%" top="0" padding="4px 10px" backgroundColor="#1c97eb" display="flex" alignItems="center">
        <Link to="/" className={`${homeButtonStyle}`}>
          <Img borderRadius="24px" display="block" height="48px" src={logo} />
          <Span margin="0 10px" fontSize="24px" fontWeight="bold" color="#fff">tidder</Span>
        </Link>
        <Span flex="auto" />
        <Login isLoggedIn={this.props.isLoggedIn} setLoggedInState={this.props.setLoggedInState} />
      </Div>
    );
  }

}

export default Header;
