/* @flow */

import React, { Component } from 'react';
import { Route } from "react-router-dom";
import injectSheet from 'react-jss';
/* Views */
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import RegisterPage from './RegisterPage';

type Props = {
  location: Object,
  history: Object,
};

class AppContainer extends Component<Props> {
  render() {
  
  const { location: { pathname }, history } = this.props;
    return (
      <div>
        <Header pathname={pathname} history={history} />
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={RegisterPage} />
        <Footer />
      </div>
    );
  }
}

const styles = {
  '@global': {
    '*': {
      boxSizing: 'border-box',
    },
    'html, body': {
      margin: '0',
      height: '100%',
    }
  }
};

export default injectSheet(styles)(AppContainer);
