/* @flow */

import React from 'react';

import injectSheet from 'react-jss';

type Props = {
  classes: Object,
  text: string,
  onClick: Function,
  backgroundColor: string,
  disabled: boolean,
};

const ButtonProfile = (props: Props) => {
  return (
    <div>
      <button
        onClick={props.onClick}
        className={props.classes.button}
        disabled={props.disabled}
      >
        {props.text}
      </button>
    </div>
  );
};

ButtonProfile.defaultProps = {
  disabled: false,
};

const styles = {
  button: {
    padding: '10px 25px',
    borderRadius: '10px',
    fontFamily: 'sans-serif',
    background: props => props.backgroundColor,
    color: 'white',
    border: 'none',
    '&:hover': {
      background: props =>
        props.disabled ? props.backgroundColor : props.hoverBackgroundColor,
      cursor: props => (props.disabled ? 'no-drop' : ''),
    },
  },
};

export default injectSheet(styles)(ButtonProfile);
