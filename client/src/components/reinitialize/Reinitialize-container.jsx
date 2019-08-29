import React from 'react';
import Reinitialize from './Reinitialize-view.jsx';

class ReinitializeContainer extends React.Component {

	constructor() {
		super();
		this.state = {
			errors: [],
			notices: []
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();

		const inputs = e.target.querySelectorAll('input');
		var valid = true;

		inputs.forEach(function(input) {
			var test = false;
			var val = input.value.trim();
			switch (input.name) {
				case 'email':
					test = !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);
					break ;
				default:
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

		if (valid)
		{
			const f = e.target;
			const form = new FormData(e.target);
			var data = {};
			form.forEach(function(value, key){
				data[key] = value;
			});

			fetch('http://gopiko.fr:8080/login/recover', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data),
			})
			.then(response => {
				if (response) {
					response.json().then(data => {
						console.log("recover");
						console.log(data);
						if (data.code === 0) {
							f.reset();
							inputs.forEach(function(input) {
								input.classList.remove('is-invalid');
								input.classList.remove('is-valid');
							});
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
	}

	render() {
		return <Reinitialize errors={this.state.errors} notices={this.state.notices} onSubmit={this.handleSubmit}/>;
	}

}

export default ReinitializeContainer;
