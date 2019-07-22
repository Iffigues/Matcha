// @flow

import React, { Component } from 'react';
import injectSheet from 'react-jss';

import ButtonForm from '../components/ButtonForm';
import InputForm from '../components/InputForm';

type Props = {
  classes: Object,
  onClick: Function,
};

type State = {
  firstname: string,
  lastname: string,
  username: string,
  password: string,
  email: string,
};
class InfoRegister extends Component<Props, State> {
  state = {
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    email: '',
  };

  render() {
    const { classes, onClick } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.inputRadioWrapper}>
          <div className={classes.eachRadioWrapper}>I AM</div>
          <div className={classes.eachRadioWrapper}>
            <input id="woman" type="radio" name="gender" value="woman" />
            <span />
            <label htmlFor="woman">A WOMAN</label>
          </div>
          <div className={classes.eachRadioWrapper}>
            <input id="man" type="radio" name="gender" value="male" />
            <span />
            <label htmlFor="man">A MAN</label>
          </div>
        </div>
        <div className={classes.inputWrapper}>
          <InputForm
            type="text"
            placeholder="First Name"
            onChange={e => this.setState({ firstname: e.target.value })}
          />
          <InputForm
            type="text"
            placeholder="Last Name"
            onChange={e => this.setState({ lastname: e.target.value })}
          />
        </div>
        <div className={classes.inputWrapper}>
          <InputForm
            type="text"
            placeholder="Username"
            onChange={e => this.setState({ username: e.target.value })}
          />
          <InputForm
            type="password"
            placeholder="Password"
            onChange={e => this.setState({ password: e.target.value })}
          />
        </div>
        <div className={`${classes.inputWrapper} ${classes.inputEmail}`}>
          <InputForm
            type="email"
            placeholder="Email"
            onChange={e => this.setState({ email: e.target.value })}
            style={{
              width: '370px',
            }}
          />
        </div>
        <ButtonForm text="CONTINUE" onClick={onClick} />
      </div>
    );
  }
}

const styles = {
  container: {
    width: '450px',
    height: '350px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '20px',
  },
  inputRadioWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '30px',
  },
  eachRadioWrapper: {
    color: 'white',
    marginRight: '10px',
    fontFamily: 'MS Serif, New York, sans-serif',
    '& label:hover': {
      cursor: 'pointer',
    },
    '& input[type="radio"]': {
      display: 'none',
    },
    '& label:hover input[type="radio"] + span': {
      borderColor: 'rgb(247, 84, 108)',
    },
    '& input[type="radio"] + span': {
      backgroundColor: '#fefefe',
      border: '1px solid',
      borderColor: '#ccc #fff #fff #ccc',
      borderRadius: '50px',
      boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.15)',
      display: 'inline-block',
      float: 'left',
      marginRight: '7px',
      padding: '7px',
      position: 'relative',
      appearance: 'none',
    },
    '& input[type="radio"]:checked + span': {
      color: 'rgb(247, 84, 108)',
    },

    '& input[type="radio"]:checked + span:after': {
      background: 'rgb(247, 84, 108)',
      borderRadius: '50px',
      boxShadow:
        'inset 1px 1px 1px rgba(255, 255, 255, 0.75), inset -1px -1px 1px rgba(0, 0, 0, 0.75)',
      content: '" "',
      height: '10px',
      left: '2px',
      position: 'absolute',
      top: '2px',
      width: '10px',
    },
  },
  inputWrapper: {
    display: 'flex',
    marginBottom: '30px',
    '& > input': {
      width: '165px',
      border: 'none',
      height: '40px',
      outline: 'none',
      fontSize: '12px',
      textAlign: 'center',
      margin: '0 20px',
    },
  },
  registerButtonSubmit: {
    background: '#F9526A',
    color: 'white',
    marginTop: '15px',
    padding: '17px 50px',
    fontSize: '14px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
};

export default injectSheet(styles)(InfoRegister);
