import React from 'react';
import './App.css';
import Navbar from '../navbar';
import Footer from '../footer';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
{/*        <Route exact path="/" component={Suggestions} />
        <Route path="/suggestions" component={Suggestions} />
        <Route path="/search" component={Search} />
        <Route path="/journal" component={Journal} />
        <Route path="/profile" component={Profile} />
        <Route path="/account" component={Account} />*/}
{/*        <Route path="/login" component={Login} />
*/}{/*        <Route path="/register" component={Register} />
        <Route path="/reinitialize" component={Reinitialize} />*/}
        <Footer />
      </Router>
    </div>
  );
}

export default App;
