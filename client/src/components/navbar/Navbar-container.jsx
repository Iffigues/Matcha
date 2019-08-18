import React from 'react';
import Navbar from './Navbar-view.jsx';

class NavbarContainer extends React.Component {

	constructor() {
		super();
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		localStorage.removeItem('token');
		localStorage.removeItem('username');
		this.props.username = '';
		this.props.loggedIn = false;
	}

	render() {
		return <Navbar username={this.props.username} onClick={this.handleClick} />;
	}

}

export default NavbarContainer;
