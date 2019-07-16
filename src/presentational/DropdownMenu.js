/* @flow */

import React, { Component } from 'react';
import injectSheet from 'react-jss';

type Props = {
  classes: Object,
};

class DropdownMenu extends Component<Props> {
  render() {
    const { classes } = this.props;
    const tmp = [
      {
        avatar: 'http://bearrealty.com/ClientImage/Agent-Full/jok.jpg',
        username: 'Mavrick',
        date: 'Mercredi 10 septembre',
      },
      {
        avatar: 'http://bearrealty.com/ClientImage/Agent-Full/jok.jpg',
        username: 'Mavrick',
        date: 'Mercredi 10 septembre',
      },
      {
        avatar: 'http://bearrealty.com/ClientImage/Agent-Full/jok.jpg',
        username: 'Mavrick',
        date: 'Mercredi 10 septembre',
      },
      {
        avatar: 'http://bearrealty.com/ClientImage/Agent-Full/jok.jpg',
        username: 'Mavrick',
        date: 'Mercredi 10 septembre',
      },
      {
        avatar: 'http://bearrealty.com/ClientImage/Agent-Full/jok.jpg',
        username: 'Mavrick',
        date: 'Mercredi 10 septembre',
      },
      {
        avatar: 'http://bearrealty.com/ClientImage/Agent-Full/jok.jpg',
        username: 'Mavrick',
        date: 'Mercredi 10 septembre',
      },
      {
        avatar: 'http://bearrealty.com/ClientImage/Agent-Full/jok.jpg',
        username: 'Mavrick',
        date: 'Mercredi 10 septembre',
      },
    ];

    return (
      <div className={classes.containerDropdown}>
        <div className={classes.arrow} />
        <div className={classes.dropdown}>
          {tmp.map(item => (
            <div className={classes.containerItem}>
              <div className={classes.wrapperImage}>
                <img src={item.avatar} alt="" />
              </div>
              <div className={classes.wrapperInfo}>
                <div>{item.username} vous a envoyer un message</div>
                <div>{item.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const styles = {
  arrow: {
    position: 'absolute',
    top: '10px',
    right: '20px',
    width: '20px',
    height: '20px',
    boxShadow: '-2px -2px 3px .1px lightgrey',
    transform: 'rotate(45deg)',
    backgroundColor: 'white',
  },
  containerDropdown: {
    display: 'inline-block',
    position: 'absolute',
    top: '30px',
    right: '0',
  },
  containerItem: {
    fontFamily: 'sans-serif',
    width: '300px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '.5px solid lightGray',
    padding: '10px',
    backgroundColor: 'white',
  },
  dropdown: {
    marginTop: '20px',
    marginLeft: '1px',
    marginRight: '1px',
    boxShadow: '0px 0px 3px 1px lightgrey',
    maxHeight: '242px',
    overflow: 'scroll',
  },
  wrapperImage: {
    borderRadius: '100px',
    width: '50px',
    height: '50px',
    overflow: 'hidden',
    marginRight: '10px',
    '& > img': {
      width: '100%',
      height: '100%',
    },
  },
  wrapperInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    height: '100%',
    '& :nth-child(1)': {
      fontSize: '12px',
    },
    '& :nth-child(2)': {
      fontSize: '10px',
      color: 'darkGray',
    },
  },
};

export default injectSheet(styles)(DropdownMenu);
