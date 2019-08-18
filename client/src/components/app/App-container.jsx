import React from 'react';
import App from './App-view.jsx';

class AppContainer extends React.Component {

	constructor() {
		super();
		this.state = {
			loggedIn: false,
			username: '',
		}
		this.handleRouteChange = this.handleRouteChange.bind(this);
	}

	handleRouteChange(e) {

		const token = localStorage.getItem('token');
		fetch('http://gopiko.fr:8080/connected', {
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
						this.setState({username: localStorage.getItem('username'), loggedIn: true});
					} else {
						this.setState({username: '', loggedIn: false});
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
		return <App
			loggedIn={this.state.loggedIn}
			username={this.state.username}
			handleRouteChange={this.handleRouteChange}
		/>;
	}

}

export default AppContainer;
