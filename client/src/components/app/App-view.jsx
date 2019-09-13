import React from 'react';
import './App.css';
import Navbar from '../navbar';
import Register from '../register';
import Reinitialize from '../reinitialize';
import Login from '../login';
import Logout from '../logout';
import Profile from '../profile';
import Home from '../home';
import Account from '../account';
import Search from '../search';
import Suggestions from '../suggestions';
import Notifications from '../notifications';
import Admin from '../admin';
import Chat from '../chat';
import ProfilesMap from '../profilesmap';
import RouteChange from './RouteChange.jsx';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App(props) {
	return (
		<div className="App">
			<Router>
				<RouteChange actions={[props.handleRouteChange]}/>
				<Navbar username={props.username} loggedIn={props.loggedIn} role={props.role}/>
				{props.loggedIn ? <Chat/> : null}
				<Switch>
					{props.loggedIn
						?	<Switch>
								<Route path="/" exact component={Account}/>
								<Route path="/profiles/:id" component={Profile}/>
								<Route path="/account" exact component={Account}/>
								<Route path="/suggestions" component={Suggestions} role={props.role}/>
								<Route path="/search" component={Search} role={props.role}/>
								<Route path="/notifications" component={Notifications}/>
								<Route path="/admin" component={Admin}/>
								<Route path="/logout" component={Logout}/>
								<Route path="/map" component={ProfilesMap} role={props.role}/>
								<Route path="/:whatever" component={Account}/>
							</Switch>
						:	<Switch>
								<Route path="/" exact component={Home}/>
								<Route path="/login" component={Login}/>
								<Route path="/reinitialize" component={Reinitialize}/>
								<Route path="/register" component={Register}/>
								<Route path="/:whatever" component={Login}/>
							</Switch>
					}
				</Switch>
			</Router>
		</div>
	);
}

export default App;
