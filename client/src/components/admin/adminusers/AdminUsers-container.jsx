import React from 'react';
import AdminUsers from './AdminUsers-view.jsx';

class AdminUsersContainer extends React.Component {

	_isMounted = false;

	constructor() {
		super();
		this.state = {
			users: [],
			allUsers: []
		}
		this.handleUserChange = this.handleUserChange.bind(this)
		this.handleRemoveUserClick = this.handleRemoveUserClick.bind(this)
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
		fetch(':8080/adm/users', {
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
 						this.setState({users: data.users, allUsers: data.users});
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
					|| user.username.toLowerCase().includes(text)
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

	handleRemoveUserClick(e) {
		e.preventDefault();
		const data = {id: e.target.value};
		const token = localStorage.getItem('token');
		fetch(':8080/adm/delete/user', {
			method: 'DELETE',
			headers: {
				'x-access-token': token,
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then(response => {
			if (response) {
				response.json().then(data => {
					if (data.code === 0 && this._isMounted) {
						console.log(data);
						this.fetchData();
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
		return <AdminUsers
					users={this.state.users}

					onUserChange={this.handleUserChange}
					onRemoveUserClick={this.handleRemoveUserClick}
				/>;
	}

}

export default AdminUsersContainer;
