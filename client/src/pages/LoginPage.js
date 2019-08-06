/* @flow */

import React, { Component } from 'react';
import injectSheet from 'react-jss';

import InputForm from '../components/InputForm';
import ButtonForm from '../components/ButtonForm';
import coupleFlower from '../images/photos_selected/Login-Page/couple-flower-copy.jpg';

type Props = {
  history: Object,
  classes: Object,
};

type State = {
  username: string,
  password: string,
};

class LoginPage extends Component<Props, State> {
  state = {
    username: '',
    password: '',
  };

  onSubmitForm = (e): void => {
    e.preventDefault();
  };

  redirectToForgotPassword = (): void => {
    const { history } = this.props;

    history.push('/forgetPassword');
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.darkBox}>
          <form onSubmit={this.onSubmitForm}>
            <div className={classes.wrapperInput}>
              <InputForm
                style={{
                  width: '250px',
                }}
                type="text"
                onChange={(e): void =>
                  this.setState({ username: e.target.value })
                }
                placeholder="Username"
              />
            </div>
            <div className={classes.wrapperInput}>
              <InputForm
                style={{
                  width: '250px',
                }}
                type="password"
                onChange={e => this.setState({ password: e.target.value })}
                placeholder="Password"
              />
            </div>
            <ButtonForm
              style={{
                width: '250px',
              }}
              type="submit"
              text="LOGIN"
            />
            <button
              className={classes.forgotPassword}
              onClick={this.redirectToForgotPassword}
            >
              Forgot your password ?
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const styles = {
  '@global': {
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '100px',
      '& > input': {
        padding: '10px',
        margin: '15px 60px',
        outline: 'none',
        border: 'none',
        textAlign: 'center',
        fontSize: '12px',
      },
    },
  },
  container: {
    backgroundImage: `url(${coupleFlower})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: 'calc(100vh - 161px)',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkBox: {
    background: 'rgba(0, 0, 0, 0.2)',
    height: '400px',
    width: '400px',
  },
  forgotPassword: {
    background: '#E7E7E7',
    padding: '10px',
    marginTop: '30px',
    outline: 'none',
    fontSize: '12px',
  },
  submitButton: {
    margin: '15px 60px',
    background: '#F9526A',
    color: 'white',
    fontSize: '12px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  wrapperInput: {
    marginBottom: '30px',
  },
};

export default injectSheet(styles)(LoginPage);
