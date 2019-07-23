/* @flow */

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import injectSheet from 'react-jss';
/* Views */
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import RegisterPage from './RegisterPage';


class AppContainer extends Component<Props> {
  render() {
  
    return (
      <div>
        <Header />
        <Router>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={RegisterPage} />
        </Router>
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
