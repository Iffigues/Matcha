import React from 'react';
import AdminTags from './AdminTags-view.jsx';

class AdminTagsContainer extends React.Component {

	_isMounted = false;

	constructor() {
		super();
		this.state = {
			tags: [],
			allTags: []
		}
		this.handleTagChange = this.handleTagChange.bind(this);
		this.handleRemoveTagClick = this.handleRemoveTagClick.bind(this);
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
		fetch('http://:8080/tag/all', {
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
 						this.setState({tags: data.tags, allTags: data.tags});
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

	handleTagChange(e) {
		e.preventDefault();
		const text = e.target.value.toLowerCase();
		let res = [];
		if (text.length > 0) {
			this.state.allTags.forEach(tag => {
				if (tag.name.toLowerCase().includes(text))
					res.push(tag);
			});
		}
		else {
			res = this.state.allTags.slice();
		}
		this.setState({tags: res});
	}

	handleRemoveTagClick(e) {
		e.preventDefault();
		const data = {name: e.target.value};
		const token = localStorage.getItem('token');
		fetch('http://:8080/adm/delete/tag', {
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
		return <AdminTags
					tags={this.state.tags}

					onTagChange={this.handleTagChange}
					onRemoveTagClick={this.handleRemoveTagClick}
				/>;
	}

}

export default AdminTagsContainer;
