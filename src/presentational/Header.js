/* @flow */

import React, { Component } from 'react';
import injectSheet from 'react-jss';

import matchaLogo from '../images/photos_selected/Header/matcha.jpg';
import VisitLogo from '../images/photos_selected/Header/people-notifications.png';
import ChatLogo from '../images/photos_selected/Header/talk-icon.png';
import LikeLogo from '../images/photos_selected/Header/heart.png';
import account from '../images/photos_selected/Header/account.png';

import ButtonNormal from './ButtonNormal';
import StickerNotification from './StickerNotification';
import DropdownMenu from './DropdownMenu';

type Props = {
  pathname: string,
  classes: Object,
  numberNotifChat: number,
  numberNotifLike: number,
  numberNotifVisit: number,
  history: Object,
};

type State = {
  showIcons: boolean,
  showNotifLike: boolean,
  showNotifVisit: boolean,
};

class Header extends Component<Props, State> {
  static defaultProps = {
    numberNotifChat: '0',
    numberNotifLike: '0',
    numberNotifVisit: '0',
  };

  state = {
    showIcons: false,
    showNotifLike: false,
    showNotifVisit: false,
  };

  componentWillMount() {
    const { pathname } = this.props;

    const tmp = [
      '/profile',
      '/profile/modify',
      '/research',
      '/deleteAccount',
      '/chat',
    ];

    if (tmp.includes(pathname)) {
      this.setState({ showIcons: true });
    }
  }

  handleClickEvent = nameIcon => {
    this.setState({
      showNotifLike: false,
      showNotifVisit: false,
      [nameIcon]: !this.state[nameIcon],
    });
  };

  render() {
    const {
      classes,
      pathname,
      numberNotifChat,
      numberNotifLike,
      numberNotifVisit,
      history,
    } = this.props;
    const { showNotifVisit, showNotifLike } = this.state;
    let text;
    let location;

    const icons = [
      <div key="1" className={classes.stickerNotification}>
        <StickerNotification text={numberNotifChat} />
        <img src={ChatLogo} alt="" className={classes.image} />
      </div>,
      <div key="2" className={classes.stickerNotification}>
        <button onClick={() => this.handleClickEvent('showNotifLike')}>
          <StickerNotification text={numberNotifLike} />
          <img src={LikeLogo} alt="" className={classes.image} />
          {showNotifLike && <DropdownMenu />}
        </button>
      </div>,
      <div key="3" className={classes.stickerNotification}>
        <button onClick={() => this.handleClickEvent('showNotifVisit')}>
          <StickerNotification text={numberNotifVisit} />
          <img src={VisitLogo} alt="" className={classes.image} />
          {showNotifVisit && <DropdownMenu />}
        </button>
      </div>,
      <div key="4" className={classes.stickerNotification}>
        <img src={account} alt="" className={classes.image} />
      </div>,
    ];

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
      case '/profile':
      case '/profile/modify':
      case '/research':
      case '/deleteAccount':
      case '/chat':
        text = 'LOGOUT';
        location = '/login';
        break;
      default:
        text = 'TEXT HERE';
    }

    return (
      <div className={classes.container}>
        <img className={classes.matchaLogo} src={matchaLogo} alt="" />
        <div className={classes.notifications}>
          {this.state.showIcons && icons}
          <ButtonNormal
            text={text}
            onClick={() => {
              history.push(location);
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
  stickerNotification: {
    position: 'relative',
  },
  notifications: {
    display: 'flex',
    alignItems: 'flex-end',
  },
};

export default injectSheet(styles)(Header);
