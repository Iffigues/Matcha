// @flow

import React, { Component } from 'react';
import injectSheet from 'react-jss';

type Props = {
  classes: Object,
  text: string,
};

class ErrorField extends Component<Props> {
  render() {
    const { classes, text } = this.props;

    return <div className={classes.errorField}>{text}</div>;
  }
}

const styles = {
  errorField: {
    background: 'rgb(223, 80, 80)',
    width: '100%',
    borderRadius: '5px',
    padding: '5px 15px',
    top: '110%',
    color: 'white',
    fontFamily: 'sans-serif',
    position: 'relative',
    '&::after': {
      content: '""',
      height: '11px',
      width: '11px',
      position: 'absolute',
      top: '-4px',
      left: '10px',
      transform: 'rotate(45deg)',
      background: 'rgb(223, 80, 80)',
      borderRadius: '3px',
    },
  },
};
export default injectSheet(styles)(ErrorField);
