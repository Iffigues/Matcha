import React from 'react';
import Login from './Login-view.jsx';

class LoginContainer extends React.Component {

	_isMounted = false;

	constructor(props) {
		super(props);
		this.state = {
			errors: [],
			notices: [],
			redirect: false
		}
		if (this.props.notices)
			this.state.notices.push(this.props.notices);
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
		var valid = true;

		inputs.forEach(function(input) {
			var test = false;
			var val = input.value.trim();
			switch (input.name) {
				case 'username':
					test = val.length === 0;
					break ;
				case 'password':
					test = val.length === 0;
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
			const d = {};
			form.forEach(function(value, key){
				d[key] = value;
			});

			fetch(':8080/login', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(d)
			})
			.then(response => {
				if (response) {
					response.json().then(data => {
						if (this._isMounted) {
							if (data.code === 0) {
								f.reset();
								localStorage.setItem('token', data.token);
								localStorage.setItem('username', d.username);
								inputs.forEach(function(input) {
									input.classList.remove('is-invalid');
									input.classList.remove('is-valid');
								});
								this.setState({errors: [], notices: [data.msg], redirect: true});
							} else {
								this.setState({errors: [data.msg], notices: [], redirect: false});
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
		return (
			<Login
				redirect={this.state.redirect}
				errors={this.state.errors}
				notices={this.state.notices}
				onSubmit={this.handleSubmit}
			/>
		);
	}

}

export default LoginContainer;
