/* @flow */

import React, { Component } from 'react';
import injectSheet from 'react-jss';

/* Components */
import matchaLogo from '../images/photos_selected/Header/matcha.jpg';
import ButtonNormal from './ButtonNormal';


type Props = {
  classes: Object,
<<<<<<< HEAD
  pathname: String,
  history: Object
=======
  pathname : String,
  history: Object,
>>>>>>> 9af63eaeb7e93dc9a8f416969f83a13965e6b5a8
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
      pathname,
<<<<<<< HEAD
	history
=======
      history,
>>>>>>> 9af63eaeb7e93dc9a8f416969f83a13965e6b5a8
  } = this.props;

    switch (pathname) {
      case '/login':
        text = 'REGISTER';
        location = '/register';
        break;
      case '/':
      case '/register':
        text = 'LOGIN';
        location = '/login';
        break;
      default:
<<<<<<< HEAD
        text = 'Login';
    }	
console.log("c'est ici le prob ==> " + history + '<=');
=======
        text = 'Default - chanhe header.js bouton text';
    }

>>>>>>> 9af63eaeb7e93dc9a8f416969f83a13965e6b5a8
    return (
      <div className={classes.container}>
        <img className={classes.matchaLogo} src={matchaLogo} alt="" />
        <div className={classes.notifications}>
          <ButtonNormal
            text={text}
<<<<<<< HEAD
            onClick={() => history.push('/')}
=======
            onClick={() =>
              history.push(location)
            }
>>>>>>> 9af63eaeb7e93dc9a8f416969f83a13965e6b5a8
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
