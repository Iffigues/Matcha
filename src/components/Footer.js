/* @flow */

import React, { Component } from 'react';
import injectSheet from 'react-jss';

type Props = {
  classes: Object,
};

class Footer extends Component<Props> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        Copyright © 2019 Matcha.com - All Rights Reserved.
        Oumaysou & Bordenoy
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(246, 103, 100)',
    height: '60px',
    color: 'white',
    fontFamily: 'MS Serif, New York, sans-serif',
    fontSize: '12px',
    zIndex: '10',
  },
};

export default injectSheet(styles)(Footer);
