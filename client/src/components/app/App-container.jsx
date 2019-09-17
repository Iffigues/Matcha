import React from 'react';
import App from './App-view.jsx';

class AppContainer extends React.Component {

	_isMounted = false;

	constructor() {
		super();
		this.state = {
			loggedIn: false,
			username: '',
			role: '',
			lng: 2.344305,
			lat: 48.859595,
			flashes: []
		}
		this.handleRouteChange = this.handleRouteChange.bind(this);
		this.addFlash = this.addFlash.bind(this);
		this.handleCloseClick = this.handleCloseClick.bind(this);
		this.clearFlashes = this.clearFlashes.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	handleRouteChange(e) {
		const token = localStorage.getItem('token');
		fetch('http://' + document.location.hostname + ':8080/connected', {
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
								role: data.role,
								lng: data.lng || 2.344305,
								lat: data.lat || 48.859595
							});
						} else {
							this.setState({username: '', loggedIn: false, role: '', lng: 2.344305, lat: 48.859595});
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

	addFlash(type, message) {
		clearInterval(this._interval);
		const flashes = this.state.flashes.slice();
		flashes.push({type: type, msg: message});
		this.setState({flashes: flashes});
		setTimeout(this.clearFlashes, 3000); 
	}

	clearFlashes() {
		this.setState({flashes: this.state.flashes.slice(1)});
	}

	handleCloseClick(e) {
		e.preventDefault();
		const f = this.state.flashes.slice();
		const fla = f.filter(flash => flash.type !== e.target.getAttribute("value"));
		this.setState({flashes: fla});
	}


	render() {
		return <App
			loggedIn={this.state.loggedIn}
			username={this.state.username}
			role={this.state.role}
			lat={this.state.lat}
			lng={this.state.lng}
			flashes={this.state.flashes}

			handleRouteChange={this.handleRouteChange}
			addFlash={this.addFlash}
			onCloseClick={this.handleCloseClick}
		/>;
	}

}

export default AppContainer;
