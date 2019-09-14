import React from 'react';
import Register from './Register-view.jsx';

class RegisterContainer extends React.Component {

	_isMounted = false;

	constructor() {
		super();
		this.state = {
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	handleSubmit(e) {
		e.preventDefault();

		const inputs = e.target.querySelectorAll('input');
		var password = '';
		var valid = true;

		inputs.forEach(function(input) {
			var test = false;
			var val = input.value.trim();
			switch (input.name) {
				case 'username':
					test = val.length < 4 || !/^[A-Za-z0-9αßÁáÀàÅåÄäÆæÇçÉéÈèÊêÍíÌìÎîÑñÓóÒòÔôÖöØøÚúÙùÜüŽž' _-]+$/.test(val);
					break ;
				case 'firstname':
					test = !/^[A-Za-zαßÁáÀàÅåÄäÆæÇçÉéÈèÊêÍíÌìÎîÑñÓóÒòÔôÖöØøÚúÙùÜüŽž' -]+$/.test(val);
					break ;
				case 'lastname':
					test = !/^[A-Za-zαßÁáÀàÅåÄäÆæÇçÉéÈèÊêÍíÌìÎîÑñÓóÒòÔôÖöØøÚúÙùÜüŽž' -]+$/.test(val);
					break ;
				case 'email':
					test = !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);
					break ;
				case 'password':
					password = input.value;
					test = input.value.length < 8 || !/.*[0-9]+.*/.test(input.value) || !/.*[A-Z]+.*/.test(input.value) || !/.*[a-z]+.*/.test(input.value) || !/.*[!A-Za-z0-9]+.*/.test(input.value);
					break ;
				case 'confirm':
					test = !input.value || input.value.localeCompare(password);
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
			const data = {};
			form.forEach(function(value, key){
				data[key] = value;
			});

			fetch('http://' + document.location.hostname + ':8080/register', {
				method: 'POST',
				headers: {
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
		return <Register onSubmit={this.handleSubmit}/>;
	}

}

export default RegisterContainer;
