/* @flow */

import React, { Component } from 'react';
import injectSheet from 'react-jss';

type Props = {
  classes: Object,
  text: string,
  onClick: Function,
};

class ButtonNormal extends Component<Props> {
  render() {
    const { classes, text, onClick } = this.props;

    return (
      <div className={classes.container}>
        <button onClick={onClick} className={classes.buttonClass}>
          {text}
        </button>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '15px',
    padding: '10px 20px',
    background: '#F9526A',
  },
  buttonClass: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontFamily: 'MS Serif, New York, sans-serif',
    fontSize: '14px',
    letterSpacing: '0.5px',
    outline: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  },
};

export default injectSheet(styles)(ButtonNormal);
