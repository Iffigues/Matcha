import React from 'react';
import PhotosInput from './PhotosInput-view.jsx';

class PhotosInputContainer extends React.Component {

	constructor() {
		super();
		this.handleChange = this.handleChange.bind(this);
		this.handleClickAdd = this.handleClickAdd.bind(this);
		this.handleClickRemove = this.handleClickRemove.bind(this);
	}

	handleChange() {
		console.log('select main photo');
	}

	handleClickAdd(e) {
		e.preventDefault();

		const input = document.createElement('input');
		input.type = 'file';
		input.name = 'img';
		input.onchange = e => { 
			const file = e.target.files[0];
			const data = new FormData();
  			data.append('file', file);
  			const token = localStorage.getItem('token');
			fetch('http://gopiko.fr:8080/img/upload', {
				method: 'POST',
				headers: {
					'x-access-token': token,
					Accept: 'application/json'
				},
				body: data
			})
			.then(response => {
				if (response) {
					response.json().then(data => {
						if (data.code === 0) {
							this.setState({errors: [], notices: [data.msg]});
						} else {
							this.setState({errors: [data.msg], notices: []});
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
		input.click();
	}

	handleClickRemove() {
		console.log('remove a photo');
	}

	render() {
		return <PhotosInput onChange={this.handleChange} onClickAdd={this.handleClickAdd} onClickRemove={this.handleClickRemove} photos={this.props.photos}/>;
	}
}

export default PhotosInputContainer;
