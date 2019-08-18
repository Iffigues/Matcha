import React from 'react';
import { Redirect } from "react-router-dom";

class LogoutContainer extends React.Component {

	constructor(props) {
		super(props);
		localStorage.removeItem('token');
		localStorage.removeItem('username');
	}

	render() {
		return (
			<Redirect notices='Deconnecté' to='/login'/>
		);
	}

}

export default LogoutContainer;