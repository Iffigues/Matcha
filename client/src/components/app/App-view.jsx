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
import Flash from '../flash';
import ProfilesMap from '../profilesmap';
import RouteChange from './RouteChange.jsx';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App(props) {
	return (
		<div className="App">
			<Router>
				<RouteChange actions={[props.handleRouteChange]}/>
				<Navbar username={props.username} loggedIn={props.loggedIn} role={props.role}/>
				<Flash flashes={props.flashes} onCloseClick={props.onCloseClick}/>
				{props.loggedIn ? <Chat/> : null}
				<Switch>
					{props.loggedIn
						?	<Switch>
								<Route path="/" exact component={Account}/>
								<Route path="/profiles/:id" component={Profile}/>
								<Route path="/account" exact render={() => <Account addFlash={props.addFlash}/>} />
								<Route path="/suggestions" render={() => <Suggestions role={props.role} addFlash={props.addFlash}/>} />
								<Route path="/search" render={() => <Search role={props.role} addFlash={props.addFlash}/>}/>
								<Route path="/notifications" component={Notifications}/>
								<Route path="/admin" render={() => <Admin addFlash={props.addFlash}/>} />
								<Route path="/logout" component={Logout}/>
								<Route path="/map" render={() => <ProfilesMap role={props.role} lng={props.lng} lat={props.lat}/>} />
								<Route path="/:whatever" render={() => <Account addFlash={props.addFlash}/>} />
							</Switch>
						:	<Switch>
								<Route path="/" exact component={Home}/>
								<Route path="/login" render={() => <Login addFlash={props.addFlash}/>} />
								<Route path="/reinitialize" render={() => <Reinitialize addFlash={props.addFlash}/>} />
								<Route path="/register" render={() => <Register addFlash={props.addFlash}/>} />
								<Route path="/:whatever" render={() => <Login addFlash={props.addFlash}/>} />
							</Switch>
					}
				</Switch>
			</Router>
		</div>
	);
}

export default App;
