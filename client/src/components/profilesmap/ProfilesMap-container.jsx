import React from 'react';
import ProfilesMap from './ProfilesMap-view.jsx';
import { Redirect } from "react-router-dom";

class ProfilesMapContainer extends React.Component {

	_isMounted = false;

	constructor() {
		super();
		this.state = {
			profiles: []
		}
	}

	componentDidMount() {
		this._isMounted = true;
		this.fetchData();
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	fetchData() {
		const token = localStorage.getItem('token');
		fetch('http//localhost:8080/search/all', {
			method: 'GET',
			headers: {
				'x-access-token': token,
				Accept: 'application/json'
			}
		})
		.then(response => {
			if (response) {
				response.json().then(data => {
					if (data.code === 0 && this._isMounted) {
 						this.setState({profiles: data.profiles});
		 			}
				}).catch(error => {
					console.log('Il y a eu un problème avec la lecture de la réponse');
				});
			} else
				throw Error('Pas de réponse');
		}).catch(error => {
			console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message);
		});
	}


	render() {
		if (this.props.role === "preuser")
			return <Redirect to="/account"/>
		return <ProfilesMap
					profiles={this.state.profiles}
				/>;
	}

}

export default ProfilesMapContainer;
