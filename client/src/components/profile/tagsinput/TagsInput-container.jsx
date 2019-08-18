import React from 'react';
import TagsInput from './TagsInput-view.jsx';

class TagsInputContainer extends React.Component {

	constructor() {
		super();
		this.state = {
			tags: [],
			tagsSuggest: []
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClickAddSuggestion = this.handleClickAddSuggestion.bind(this);
		this.handleClickRemove = this.handleClickRemove.bind(this);
	}

	componentDidMount()
	{
		let token = localStorage.getItem('token');
		fetch('http://gopiko.fr:8080/tag/all', {
			method: 'GET',
			headers: {
				'x-access-token': token,
				Accept: 'application/json'
			}
		})
		.then(response => {
			if (response) {
				response.json().then(data => {
					if (data.code === 0 && data.tags) {
						this.setState({tags: data.tags});
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

	handleChange(e) {
		e.preventDefault();
		const text = e.target.value.toLowerCase();
		const res = [];
		if (text) {
			this.state.tags.forEach(tag => {
				if (tag.name.toLowerCase().includes(text))
					res.push(tag);
			});
		}
		this.setState({tagsSuggest: res});
	}

	handleSubmit(e) {
		e.preventDefault();
		const inputs = e.target.querySelectorAll('input');
		let valid = true;

		inputs.forEach(function(input) {
			let test = false;
			const val = input.value.trim().toLowerCase();
			switch (input.name) {
				case 'tag':
					test = val.length === 0 || val.length > 30 || !/^[A-Za-z0-9αßÁáÀàÅåÄäÆæÇçÉéÈèÊêÍíÌìÎîÑñÓóÒòÔôÖöØøÚúÙùÜüŽž' _-]+$/.test(val);;
					break ;
				default:
					test = 1;
			}
			if (test) {
				valid = false;
				input.classList.remove('is-valid');
				input.classList.add('is-invalid');
			} else {
				input.classList.remove('is-invalid');
				input.classList.add('is-valid');
			}
		});

		if (valid) {
			const form = new FormData(e.target);
			var data = {};
			form.forEach(function(value, key){
				data[key] = value;
			});

			const token = localStorage.getItem('token');
			fetch('http://gopiko.fr:8080/tag/new', {
				method: 'POST',
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
						if (data.code === 0) {
							inputs.forEach(function(input) {
								input.classList.remove('is-invalid');
								input.classList.remove('is-valid');
							});
							this.componentDidMount();
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

	handleClickAddSuggestion(e) {
		e.preventDefault();
		let val = e.target.getAttribute('value').trim();
		const test = val.length === 0 || val.length > 30 || !/^[A-Za-z0-9αßÁáÀàÅåÄäÆæÇçÉéÈèÊêÍíÌìÎîÑñÓóÒòÔôÖöØøÚúÙùÜüŽž' _-]+$/.test(val);
		if (!test) {
			const data = {tag: val};
			const token = localStorage.getItem('token');
			fetch('http://gopiko.fr:8080/tag/new', {
				method: 'POST',
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
						if (data.code === 0)
							this.componentDidMount();
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

	handleClickRemove(e) {
		e.preventDefault();
		console.log('remove the tag');
	}

	render() {
		return <TagsInput tagsSuggest={this.state.tagsSuggest}
			onChange={this.handleChange} onSubmit={this.handleSubmit} 
			onClickAddSuggestion={this.handleClickAddSuggestion} onClickRemove={this.handleClickRemove}/>;
	}
}

export default TagsInputContainer;
