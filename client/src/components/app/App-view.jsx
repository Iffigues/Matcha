import React from 'react';
import './App.css';
// import Footer from '../footer';
import Navbar from '../navbar';
import Register from '../register';
import Reinitialize from '../reinitialize';
import Login from '../login';
import Logout from '../logout';
import Profile from '../profile';
import Account from '../account';
import Search from '../search';
import Suggestions from '../suggestions';
import Notifications from '../notifications';
import Admin from '../admin';
import Chat from '../chat';
import ProfilesMap from '../profilesmap';
import RouteChange from './RouteChange.jsx';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App(props) {
	return (
		<div className="App">
			<Router>
				<RouteChange actions={[props.handleRouteChange]}/>
				<Navbar username={props.username} loggedIn={props.loggedIn}/>
				<Chat/>
				<Route path="/login" component={Login}/>
				<Route path="/reinitialize" component={Reinitialize}/>
				<Route path="/register" component={Register}/>
				<Route path="/profiles/:id" component={Profile}/>
				<Route path="/account" exact component={Account}/>
				<Route path="/suggestions" component={Suggestions}/>
				<Route path="/search" component={Search}/>
				<Route path="/notifications" component={Notifications}/>
				<Route path="/admin" component={Admin}/>
				<Route path="/logout" component={Logout}/>
				<Route path="/map" component={ProfilesMap}/>
{/*					                    <button className="dropdown-item" onClick={props.onClick}>Déconnexion</button>

<Redirect to="/profile"/>*/}
			</Router>
			{/*<Footer />*/}
		</div>
	);
}

export default App;
