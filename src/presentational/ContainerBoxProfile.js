/* @flow */

import * as React from 'react';
import injectSheet from 'react-jss';

type Props = {
  classes: Object,
  title?: React.Node,
  children: React.Node,
  onClick: Function,
  width: string,
  height: string,
};

class BoxGender extends React.Component<Props> {
  static defaultProps = {
    title: <span>TITLE</span>,
    width: '275px',
    height: '100px',
  };

  render() {
    const { classes, title, children, width, height } = this.props;

    return (
      <div
        className={classes.container}
        style={{
          width,
          height,
        }}
      >
        <div className={classes.title}>{title}</div>
        {children}
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'inline-flex',
    fontFamily: 'sans-serif',
    position: 'relative',
    border: '1px solid rgb(211, 211, 211)',
    borderRadius: '15px',
    minWidth: '275px',
    minHeight: '100px',
    padding: '20px',
    marginBottom: '30px',
  },
  title: {
    position: 'absolute',
    top: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'white',
    padding: '0 10px',
  },
};

export default injectSheet(styles)(BoxGender);
