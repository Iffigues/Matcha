import React from 'react';
import Navbar from './Navbar-view.jsx';

class NavbarContainer extends React.Component {

	_interval = null;
	_isMounted = false;

	constructor() {
		super();
		this.state = {
			notReadNotifs: 0
		}
		this.handleClick = this.handleClick.bind(this);
		this.fetchData = this.fetchData.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;
		this.regularlyFetchData();
	}

	componentWillUnmount() {
		this._isMounted = false;
		clearInterval(this._interval);
	}

	regularlyFetchData() {
		this.fetchData();
		this._interval = setInterval(this.fetchData, 5000);
	}

	fetchData() {
		if (this.props.loggedIn) {
			const token = localStorage.getItem('token');
			fetch('http://gopiko.fr:8080/notif/nbr', {
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
	 						this.setState({notReadNotifs: data.nbr});
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
	}

	handleClick(e) {
		localStorage.removeItem('token');
		this.props.username = '';
		this.props.loggedIn = false;
	}

	render() {
		return <Navbar
					username={this.props.username}
					loggedIn={this.props.loggedIn}
					role={this.props.role}
					notReadNotifs={this.state.notReadNotifs}

					onClick={this.handleClick}
				/>;
	}

}

export default NavbarContainer;
