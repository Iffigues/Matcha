/* @flow */

import React, { Component } from 'react';
import injectSheet from 'react-jss';

type Props = {
  classes: Object,
  text: string,
  onClick: Function,
};

class ButtonGradient extends Component<Props> {
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
    borderRadius: '35px',
    padding: '21px 50px',
    background: 'linear-gradient(to right, #FE2E64 , #FE642E)',
    boxShadow: '0px 0px 5px 1px Lightgray',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  buttonClass: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontFamily: 'MS Serif, New York, sans-serif',
    fontSize: '18px',
    letterSpacing: '0.5px',
    outline: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  },
};

export default injectSheet(styles)(ButtonGradient);
