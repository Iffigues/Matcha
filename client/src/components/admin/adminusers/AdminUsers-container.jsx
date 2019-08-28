import React from 'react';
import AdminUsers from './AdminUsers-view.jsx';

class AdminUsersContainer extends React.Component {

	constructor() {
		super();
		this.state = {
			users: [],
			allUsers: []
		}
		this.handleUserChange = this.handleUserChange.bind(this)
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
 						console.log("all users");
 						console.log(data);
 						this.setState({users: data.profile, allUsers: data.profile});
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

	handleUserChange(e) {
		e.preventDefault();
		const text = e.target.value.toLowerCase();
		let res = [];
		if (text.length > 0) {
			this.state.allUsers.forEach(user => {
				if (('' + user.id).includes(text)
					//|| user.username.toLowerCase().includes(text)
					|| user.firstname.toLowerCase().includes(text)
					|| user.lastname.toLowerCase().includes(text))
					res.push(user);
			});
		}
		else {
			res = this.state.allUsers.slice();
		}
		this.setState({users: res});
	}

	render() {
		return <AdminUsers
					users={this.state.users}

					onUserChange={this.handleUserChange}
				/>;
	}

}

export default AdminUsersContainer;
