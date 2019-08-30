import React from 'react';
import ProfilesMap from './ProfilesMap-view.jsx';

class ProfilesMapContainer extends React.Component {

	constructor() {
		super();
		this.state = {
			profiles: []
		}
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		const token = localStorage.getItem('token');
		fetch('http://gopiko.fr:8080/search/all', {
			method: 'GET',
			headers: {
				'x-access-token': token,
				Accept: 'application/json'
			}
		})
		.then(response => {
			if (response) {
				response.json().then(data => {
					if (data.code === 0) {
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
		return <ProfilesMap
					profiles={this.state.profiles}
				/>;
	}

}

export default ProfilesMapContainer;
