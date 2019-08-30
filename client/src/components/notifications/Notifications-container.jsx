import React from 'react';
import Notifications from './Notifications-view.jsx';

class NotificationsContainer extends React.Component {

	constructor() {
		super();
		this.state = {
			notifications: []
		}
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		const token = localStorage.getItem('token');
		fetch('http://gopiko.fr:8080/notif/all', {
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
 						this.setState({notifications: data.resultats});
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
		return <Notifications
					notifications={this.state.notifications}
				/>;
	}

}

export default NotificationsContainer;
