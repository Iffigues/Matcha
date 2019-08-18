import React from 'react';
import Profile from './Profile-view.jsx';

class ProfileContainer extends React.Component {

	constructor() {
		super();
		this.state = {
			errors: [],
			notices: [],
			firstname: '',
			lastname: '',
			username: '',
			email: '',
			bio: '',
			city: '',
			birthdate: '',
			sexe: 1,
			lng: 0,
			lat: 0
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleRadioChange = this.handleRadioChange.bind(this);
		this.handleLocateClick = this.handleLocateClick.bind(this);
	}

	componentDidMount() {
		let token = localStorage.getItem('token');
		fetch('http://gopiko.fr:8080/profile/', {
			method: 'GET',
			headers: {
				'x-access-token': token,
				Accept: 'application/json'
			},
			credentials: 'same-origin'
		})
		.then(response => {
			if (response) {
				response.json().then(data => {
					if (data.code === 0) {
						console.log(data);
						this.setState({
							firstname: data.profile.firstname || '',
							lastname: data.profile.lastname || '',
							username: data.profile.username || '',
							email: data.profile.email || '',
							bio: data.profile.bio || '',
							city: data.profile.city || '',
							birthdate: data.profile.birthdate || '',
							sexe: data.profile.sexe || '',
							lng: data.profile.lng || 0,
							lat: data.profile.lat || 0,
						});
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
		const data = {};
		switch (e.target.name) {
			case 'firstname':
				data.firstname = e.target.value;
				break ;
			case 'lastname':
				data.lastname = e.target.value;
				break ;
			case 'username':
				data.username = e.target.value;
				break ;
			case 'email':
				data.email = e.target.value;
				break ;
			case 'bio':
				data.bio = e.target.value;
				break ;
			case 'city':
				data.city = e.target.value;
				break ;
			case 'birthdate':
				data.birthdate = e.target.value;
				break ;
			default:
		}
		this.setState(data);
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
				case 'city':
					test = !/^[A-Za-zαßÁáÀàÅåÄäÆæÇçÉéÈèÊêÍíÌìÎîÑñÓóÒòÔôÖöØøÚúÙùÜüŽž' -]+$/.test(val);
					break ;
				case 'birthdate':
					test = !/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/.test(val);
					break ;
				case 'bio':
					test = !/^[A-Za-zαßÁáÀàÅåÄäÆæÇçÉéÈèÊêÍíÌìÎîÑñÓóÒòÔôÖöØøÚúÙùÜüŽž'",.!?)( -]+$/.test(val);
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
				valid = true;
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
				if (key === 'password')
					delete data['username'];
			});
			const token = localStorage.getItem('token');
			fetch('http://gopiko.fr:8080/profile/', {
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

	handleRadioChange(e) {
		const d = {};
		const input = e.target;
		d[input.name] = parseInt(input.value); 
		const token = localStorage.getItem('token');
		fetch('http://gopiko.fr:8080/profile/', {
			method: 'POST',
			headers: {
				'x-access-token': token,
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(d)
		})
		.then(response => {
			if (response) {
				response.json().then(data => {
					if (data.code === 0) {
						d.errors = [];
						d.notices = [data.msg];
						this.setState(d);
					} else {
						d.notices = [];
						d.errors = [data.msg];
						this.setState(d);
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

	handleLocateClick(e) {
		e.preventDefault();
		if(navigator.geolocation)
  			navigator.geolocation.getCurrentPosition(pos => {
  				console.log(pos);
				this.setState({lng: pos.coords.longitude, lat: pos.coords.latitude});
  			}, err => {
  				switch(err.code) {
				    case err.PERMISSION_DENIED:
					fetch('http://ip-api.com/json', {
						method: 'GET',
						headers: {
							Accept: 'application/json',
						}
					})
					.then(response => {
						if (response) {
							response.json().then(data => {
								this.setState({lng: data.lon, lat: data.lat, city: data.city});
							}).catch(error => {
								console.log('Il y a eu un problème avec la lecture de la réponse');
							});
						} else
							throw Error('Pas de réponse');
					}).catch(error => {
						console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message);
					});
				    break ;
				    default:
			    }
  			});
	}

 	render() {
		return <Profile
					firstname={this.state.firstname}
					lastname={this.state.lastname}
					username={this.state.username}
					email={this.state.email}
					bio={this.state.bio}
					city={this.state.city}
					birthdate={this.state.birthdate}
					sexe={this.state.sexe}
					lng={this.state.lng}
					lat={this.state.lat}
					onChange={this.handleChange}
					onSubmit={this.handleSubmit}
					onRadioChange={this.handleRadioChange}
					onLocateClick={this.handleLocateClick}
					errors={this.state.errors}
					notices={this.state.notices}
				/>;
	}

}

export default ProfileContainer;
