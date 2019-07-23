/* @flow */

import React, { Component } from 'react';
import injectSheet from 'react-jss';

/* Components */
import matchaLogo from '../images/photos_selected/Header/matcha.jpg';
import ButtonNormal from './ButtonNormal';


type Props = {
  classes: Object,
  pathname : string
};


class Header extends Component<Props> {

  componentWillMount() {
    const { pathname } = this.props;
  }

  render() {
 
    let location;
    let text;

    const {
      classes,
      pathname
  } = this.props;

    switch (pathname) {
      case '/login':
        text = 'REGISTER';
        location = '/register';
        break;
      case '/register':
        text = 'LOGIN';
        location = '/login';
        break;
      default:
        text = 'Login';
    }

    return (
      <div className={classes.container}>
        <img className={classes.matchaLogo} src={matchaLogo} alt="" />
        <div className={classes.notifications}>
          <ButtonNormal
            text={text}
            onClick={() => {
              ;/*Next page*/
            }}
          />
        </div>
      </div>
    );
  }
}


const styles = {
  '@global': {
    button: {
      background: 'transparent',
      border: 'none',
      outline: 'none',
      padding: '0',
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderBottom: '1px solid #D8D8D8',
    height: '100px',
    padding: '0 30px',
    position: 'relative',
  },
  image: {
    height: '30px',
    marginRight: '15px',
  },
  matchaLogo: {
    height: '70px',
    margin: 'auto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },

};

export default injectSheet(styles)(Header);
