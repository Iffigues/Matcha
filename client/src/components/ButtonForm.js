/* @flow */

import React, { Component } from 'react';
import injectSheet from 'react-jss';

type Props = {
  classes: Object,
  text: string,
  onClick: Function,
  type?: string,
  value?: string,
  style?: Object,
};

class ButtonForm extends Component<Props> {
  static defaultProps = {
    style: {
      width: '250px',
    },
  };

  render() {
    const { classes, text } = this.props;

    return (
      <button className={classes.buttonClass} {...this.props}>
        <div className={classes.container}>{text}</div>
      </button>
    );
  }
}

const styles = {
  container: {
    justifyContent: 'center',
    display: 'inline-flex',
    background: '#F9526A',
    padding: '17px 50px',
    width: '100%',
  },
  buttonClass: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontFamily: 'MS Serif, New York, sans-serif',
    fontSize: '14px',
    letterSpacing: '0.5px',
    outline: 'none',
    width: '100%',
    '&:hover': {
      cursor: 'pointer',
    },
  },
};

export default injectSheet(styles)(ButtonForm);
