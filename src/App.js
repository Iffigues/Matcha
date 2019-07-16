import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
// Css
import './Assets/css/default.min.css';
// Component
import Header from './components/headerComponent/header';
import Contact from './components/pages/Contact';
import Products from './components/pages/Products';
import Homepage from './components/pages/Homepage';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">

          <Header />

          {/* <Route exact path="/" render={() => (
          
              <Redirect to="/Homepage"/>
          )}/> */}
          <Redirect from='/' to='/Contact' />
          <Route exact path='/Homepage' component={Homepage} />
          <Route exact path='/Products' component={Products} />
          <Route exact path='/Contact' component={Contact} />

        </div>
      </Router>
      
    );
  }
}

export default App;
