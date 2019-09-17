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
import LikedList from '../likedlist';
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
								<Route path="/" exact render={(p) => <Account props={p} addFlash={props.addFlash}/>} />
								<Route path="/profiles/:id" render={(p) => <Profile props={p} addFlash={props.addFlash}/>} />
								<Route path="/account" exact render={(p) => <Account props={p} addFlash={props.addFlash}/>} />
								<Route path="/liked"  component={LikedList} />
								<Route path="/suggestions" render={(p) => <Suggestions props={p} role={props.role} addFlash={props.addFlash}/>} />
								<Route path="/search" render={(p) => <Search props={p} role={props.role} addFlash={props.addFlash}/>}/>
								<Route path="/notifications" component={Notifications}/>
								<Route path="/admin" render={(p) => <Admin props={p} addFlash={props.addFlash}/>} />
								<Route path="/logout" component={Logout}/>
								<Route path="/map" render={(p) => <ProfilesMap props={p} role={props.role} lng={props.lng} lat={props.lat}/>} />
								<Route path="/:whatever" render={(p) => <Account props={p} addFlash={props.addFlash}/>} />
							</Switch>
						:	<Switch>
								<Route path="/" exact component={Home}/>
								<Route path="/login" render={(p) => <Login props={p} addFlash={props.addFlash}/>} />
								<Route path="/login/validated" render={(p) => <Login props={p} addFlash={props.addFlash}/>} />
								<Route path="/reinitialize/:token?/:id?" render={(p) => <Reinitialize props={p} addFlash={props.addFlash}/>} />
								<Route path="/register" render={(p) => <Register props={p} addFlash={props.addFlash}/>} />
								<Route path="/register/non-validated" render={(p) => <Register props={p} addFlash={props.addFlash}/>} />
								<Route path="/:whatever" render={(p) => <Login props={p} addFlash={props.addFlash}/>} />
							</Switch>
					}
				</Switch>
			</Router>
		</div>
	);
}

export default App;
