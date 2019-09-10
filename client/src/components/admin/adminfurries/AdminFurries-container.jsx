import React from 'react';
import AdminFurries from './AdminFurries-view.jsx';

class AdminFurriesContainer extends React.Component {

	_isMounted = false;

	constructor() {
		super();
		this.state = {
			furries: [],
			allFurries: []
		}
		this.handleFurryChange = this.handleFurryChange.bind(this);
		this.handleRemoveFurryClick = this.handleRemoveFurryClick.bind(this);
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
		fetch('http://' + document.location.hostname + ':8080/furry', {
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
 						this.setState({furries: data.furries, allFurries: data.furries});
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

	handleFurryChange(e) {
		e.preventDefault();
		const text = e.target.value.toLowerCase();
		let res = [];
		if (text.length > 0) {
			this.state.allFurries.forEach(furry => {
				if (furry.name.toLowerCase().includes(text))
					res.push(furry);
			});
		}
		else {
			res = this.state.allFurries.slice();
		}
		this.setState({furries: res});
	}

	handleRemoveFurryClick(e) {
		e.preventDefault();
		const data = {name: e.target.value};
		const token = localStorage.getItem('token');
		fetch('http://' + document.location.hostname + ':8080/adm/delete/furries', {
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
					if (data.code === 0 && this._isMounted)
						this.fetchData();
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
		return <AdminFurries
					furries={this.state.furries}

					onFurryChange={this.handleFurryChange}
					onRemoveFurryClick={this.handleRemoveFurryClick}
				/>;
	}

}

export default AdminFurriesContainer;
