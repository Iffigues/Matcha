import React from 'react';
import App from './App-view.jsx';

class AppContainer extends React.Component {

	_isMounted = false;

	constructor() {
		super();
		this.state = {
			loggedIn: false,
			username: '',
			role: ''
		}
		this.handleRouteChange = this.handleRouteChange.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	handleRouteChange(e) {
		const token = localStorage.getItem('token');
		fetch('http//localhost:8080/connected', {
			method: 'GET',
			headers: {
				'x-access-token': token,
				Accept: 'application/json'
			}
		})
		.then(response => {
			if (response) {
				response.json().then(data => {
					if (this._isMounted) {
						if (data.code === 0) {
							this.setState({
								username: data.username || '',
								loggedIn: true,
								role: data.role});
						} else {
							this.setState({username: '', loggedIn: false, role: ''});
						}
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
			role={this.state.role}
			handleRouteChange={this.handleRouteChange}
		/>;
	}

}

export default AppContainer;
