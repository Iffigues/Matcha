import React from 'react';
import Reinitialize from './Reinitialize-view.jsx';

class ReinitializeContainer extends React.Component {

	_isMounted = false;

	constructor() {
		super();
		this.state = {
			token: 0
		}
		this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
		this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	handleEmailSubmit(e) {
		e.preventDefault();

		const inputs = e.target.querySelectorAll('input');
		let valid = true;

		inputs.forEach(function(input) {
			let test = false;
			let val = input.value.trim();
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
			let data = {};
			form.forEach(function(value, key){
				data[key] = value;
			});

			fetch('http://' + document.location.hostname + ':8080/login/recover', {
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
						if (this._isMounted) {
							if (data.code === 0) {
								f.reset();
								inputs.forEach(function(input) {
									input.classList.remove('is-invalid');
									input.classList.remove('is-valid');
								});
								this.props.addFlash("notice", data.msg);
							} else {
								this.props.addFlash("error", data.msg);
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
	}

	handlePasswordSubmit(e) {
		e.preventDefault();

		const inputs = e.target.querySelectorAll('input');
		let password = '';
		let valid = true;

		inputs.forEach(function(input) {
			let test = false;
			switch (input.name) {
				case 'password':
					password = input.value;
					test = input.value.length < 8 || !/.*[0-9]+.*/.test(input.value) || !/.*[A-Z]+.*/.test(input.value) || !/.*[a-z]+.*/.test(input.value) || !/.*[!A-Za-z0-9]+.*/.test(input.value);
					break ;
				case 'confirm':
					test = test || !input.value || input.value.localeCompare(password);
					break ;
				default:
			}
			if (test) {
				valid = false;
				input.classList.remove('is-valid');
				input.classList.add('is-invalid');
			} else {
				valid = true;
				input.classList.remove('is-invalid');
				input.classList.add('is-valid');
			}
		});
		if (valid)
		{
			const f = e.target;
			const form = new FormData(e.target);
			let data = {};
			form.forEach(function(value, key){
				data[key] = value;
			});
			delete data['username'];
			const token = localStorage.getItem('token');
			fetch('http://' + document.location.hostname + ':8080/xxxxxxxxx', {
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
						if (this._isMounted) {
							if (data.code === 0) {
								f.reset();
								inputs.forEach(function(input) {
									input.classList.remove('is-invalid');
									input.classList.remove('is-valid');
								});
								this.props.addFlash("notice", data.msg);
							} else {
								this.props.addFlash("error", data.msg);
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
	}

	render() {
		return <Reinitialize onEmailSubmit={this.handleEmailSubmit} onPasswordSubmit={this.handlePasswordSubmit} token={this.props.props.match.params.token}/>;
	}

}

export default ReinitializeContainer;
