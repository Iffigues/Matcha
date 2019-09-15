import React from 'react';
import Account from './Account-view.jsx';

class AccountContainer extends React.Component {

	_isMounted = false;

	constructor() {
		super();
		this.state = {
			firstname: '',
			lastname: '',
			username: '',
			email: '',
			bio: '',
			city: '',
			customCity: 0,
			birthdate: '',
			sexe: 1,
			preferences: 3,
			lng: 0,
			lat: 0,
			profilePhoto: -1,
			photos: [],
			tags: [],
			allTags: [],
			suggTags: [],
			furries: [],
			allFurries: [],
			suggFurries: [],
			blockedUsers: []
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleTagChange = this.handleTagChange.bind(this);
		this.handleFurryChange = this.handleFurryChange.bind(this);
		this.handleRadioChange = this.handleRadioChange.bind(this);
		this.handleAccountPhotoChange = this.handleAccountPhotoChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCitySubmit = this.handleCitySubmit.bind(this);
		this.handleTagSubmit = this.handleTagSubmit.bind(this);
		this.handleFurrySubmit = this.handleFurrySubmit.bind(this);
		this.handleLocateClick = this.handleLocateClick.bind(this);
		this.handleRemoveTagClick = this.handleRemoveTagClick.bind(this);
		this.handleRemoveFurryClick = this.handleRemoveFurryClick.bind(this);
		this.handleAddSuggTagClick = this.handleAddSuggTagClick.bind(this);
		this.handleAddSuggFurryClick = this.handleAddSuggFurryClick.bind(this);
		this.handleAddPhotoClick = this.handleAddPhotoClick.bind(this);
		this.handleRemovePhotoClick = this.handleRemovePhotoClick.bind(this);
		this.handleUnblockClick = this.handleUnblockClick.bind(this);
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
		fetch('http://' + document.location.hostname + ':8080/profile/', {
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
						this.setState({
							firstname: data.firstname || '',
							lastname: data.lastname || '',
							username: data.username || '',
							email: data.email || '',
							bio: data.bio || '',
							city: data.city || '',
							birthdate: data.birthdate || '',
							sexe: data.sexe || 1,
							preferences: data.preferences || 3,
							lng: data.lng || 0,
							lat: data.lat || 0,
							tags: data.tags,
							furries: data.furries,
							photos: data.photos,
							profilePhoto: data.profilephoto || ''
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
		fetch('http://' + document.location.hostname + ':8080/tag/all', {
			method: 'GET',
			headers: {
				'x-access-token': token,
				Accept: 'application/json'
			}
		})
		.then(response => {
			if (response) {
				response.json().then(data => { 
					if (data.code === 0 && data.tags && this._isMounted) {
						this.setState({allTags: data.tags});
					}
				}).catch(error => {
					console.log('Il y a eu un problème avec la lecture de la réponse');
				});
			} else
				throw Error('Pas de réponse');
		}).catch(error => {
			console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message);
		});
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
					if (data.code === 0 && data.furries && this._isMounted) {
						this.setState({allFurries: data.furries});
					}
				}).catch(error => {
					console.log('Il y a eu un problème avec la lecture de la réponse');
				});
			} else
				throw Error('Pas de réponse');
		}).catch(error => {
			console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message);
		});
		fetch('http://' + document.location.hostname + ':8080/blocked/all', {
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
						this.setState({blockedUsers: data.resultats});
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
				data.customCity = 1;
				data.city = e.target.value;
				break ;
			case 'birthdate':
				data.birthdate = e.target.value;
				break ;
			default:
		}
		this.setState(data);
	}

	handleTagChange(e) {
		e.preventDefault();
		const text = e.target.value.toLowerCase();
		const res = [];
		if (text) {
			this.state.allTags.forEach(tag => {
				if (tag.name.toLowerCase().includes(text) && !this.state.tags.includes(tag.name))
					res.push(tag);
			});
		}
		this.setState({suggTags: res});
	}

	handleFurryChange(e) {
		e.preventDefault();
		const text = e.target.value.toLowerCase();
		const res = [];
		if (text) {
			this.state.allFurries.forEach(furry => {
				if (furry.name.toLowerCase().includes(text) && !this.state.furries.includes(furry.name))
					res.push(furry);
			});
		}
		this.setState({suggFurries: res});
	}

	handleAccountPhotoChange(e) {
		e.preventDefault();
		const d = {profilePhoto: parseInt(e.target.value)}; 
		const token = localStorage.getItem('token');
		fetch('http://' + document.location.hostname + ':8080/profile/profilephoto', {
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
					if (this._isMounted) {
						if (data.code === 0) {
							this.props.addFlash("notice", data.msg);
							this.setState(d);
						} else {
							this.props.addFlash("error", data.msg);
							this.setState(d);
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

	handleRadioChange(e) {
		const input = e.target;
		const d = {};
		d[input.name] = parseInt(input.value); 
		const token = localStorage.getItem('token');
		fetch('http://' + document.location.hostname + ':8080/profile/', {
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
					if (this._isMounted) {
						if (data.code === 0) {
							this.props.addFlash("notice", data.msg);
							this.setState(d);
						} else {
							this.props.addFlash("error", data.msg);
							this.setState(d);
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

	handleSubmit(e) {
		e.preventDefault();

		const inputs = e.target.querySelectorAll('input');
		let password = '';
		let valid = true;

		inputs.forEach(function(input) {
			let test = false;
			let val = input.value.trim();
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
				if (key === 'password')
					delete data['username'];
			});
			const token = localStorage.getItem('token');
			fetch('http://' + document.location.hostname + ':8080/profile/', {
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
								//this.fetchData();
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

	handleCitySubmit(e) {
		e.preventDefault();
		const f = e.target;
		const inputs = f.querySelectorAll('input');
		let valid = true;

		inputs.forEach(function(input) {
			let test = false;
			const val = input.value;
			switch (input.name) {
				case 'city':
					test = val.length === 0 || !/^[A-Za-zαßÁáÀàÅåÄäÆæÇçÉéÈèÊêÍíÌìÎîÑñÓóÒòÔôÖöØøÚúÙùÜüŽž' -]+$/.test(val);;
					break ;
				case 'lng':
					break ;
				case 'lat':
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
			let data = {};
			form.forEach(function(value, key){
				data[key] = value;
			});
			data.customCity = this.state.customCity;
			const token = localStorage.getItem('token');
			fetch('http://' + document.location.hostname + ':8080/map', {
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
						if (data.code === 0 && this._isMounted) {
							inputs.forEach(function(input) {
								input.classList.remove('is-invalid');
								input.classList.remove('is-valid');
							});
							this.props.addFlash("notice", data.msg);
//							this.fetchData();
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

	handleTagSubmit(e) {
		e.preventDefault();
		const f = e.target;
		const inputs = f.querySelectorAll('input');
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
			let data = {};
			form.forEach(function(value, key){
				data[key] = value;
			});

			const token = localStorage.getItem('token');
			fetch('http://' + document.location.hostname + ':8080/tag/new', {
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
						if (data.code === 0 && this._isMounted) {
							f.reset();
							inputs.forEach(function(input) {
								input.classList.remove('is-invalid');
								input.classList.remove('is-valid');
							});
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
	}

	handleFurrySubmit(e) {
		e.preventDefault();
		const f = e.target;
		const inputs = f.querySelectorAll('input');
		let valid = true;

		inputs.forEach(function(input) {
			let test = false;
			const val = input.value.trim().toLowerCase();
			switch (input.name) {
				case 'furry':
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
			let data = {};
			form.forEach(function(value, key){
				data[key] = value;
			});

			const token = localStorage.getItem('token');
			fetch('http://' + document.location.hostname + ':8080/furry', {
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
						if (data.code === 0 && this._isMounted) {
							f.reset();
							inputs.forEach(function(input) {
								input.classList.remove('is-invalid');
								input.classList.remove('is-valid');
							});
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
	}

	handleLocateClick(e) {
		e.preventDefault();
		if(navigator.geolocation)
  			navigator.geolocation.getCurrentPosition(pos => {
  				const data = {lng: pos.coords.longitude, lat: pos.coords.latitude};
				const token = localStorage.getItem('token');
  				fetch('http://' + document.location.hostname + ':8080/map/reverse', {
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
								this.setState({customCity: 0, city: data.city, lng: pos.coords.longitude, lat: pos.coords.latitude});
							}
						}).catch(error => {
							console.log('Il y a eu un problème avec la lecture de la réponse');
						});
					} else
						throw Error('Pas de réponse');
				}).catch(error => {
					console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message);
				});
  			}, err => {
  				switch(err.code) {
				    case err.PERMISSION_DENIED:
					fetch('https://ipinfo.io/json', {
						method: 'GET',
						headers: {
							Authorization: 'Bearer 0698f43ad79cd0',
							Accept: 'application/json'
						},
						creadentials: 'same-origin'
					})
					.then(response => {
						if (response) {
							response.json().then(data => {
								if (this._isMounted) {
									const loc = data.loc.split(',');
									this.setState({customCity: 0, lng: loc[1], lat: loc[0], city: data.city});
								}
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

	handleAddSuggTagClick(e) {
		e.preventDefault();
		const f = e.target.parentNode.parentNode.parentNode.parentNode;
		const val = e.target.getAttribute('value').trim();
		const test = val.length === 0 || val.length > 30 || !/^[A-Za-z0-9αßÁáÀàÅåÄäÆæÇçÉéÈèÊêÍíÌìÎîÑñÓóÒòÔôÖöØøÚúÙùÜüŽž' _-]+$/.test(val);
		if (!test) {
			const data = {tag: val};
			const token = localStorage.getItem('token');
			fetch('http://' + document.location.hostname + ':8080/tag/new', {
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
						if (data.code === 0 && this._isMounted) {
							f.reset();
							this.setState({suggTags: []});
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
	}

	handleAddSuggFurryClick(e) {
		e.preventDefault();
		const f = e.target.parentNode.parentNode.parentNode.parentNode;
		const val = e.target.getAttribute('value').trim();
		const test = val.length === 0 || val.length > 30 || !/^[A-Za-z0-9αßÁáÀàÅåÄäÆæÇçÉéÈèÊêÍíÌìÎîÑñÓóÒòÔôÖöØøÚúÙùÜüŽž' _-]+$/.test(val);
		if (!test) {
			const data = {furry: val};
			const token = localStorage.getItem('token');
			fetch('http://' + document.location.hostname + ':8080/furry', {
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
						if (data.code === 0 && this._isMounted) {
							f.reset();
							this.setState({suggFurries: []});
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
	}

	handleAddPhotoClick(e) {
		e.preventDefault();

		const input = document.createElement('input');
		input.type = 'file';
		input.name = 'img';
		input.onchange = e => { 
			const file = e.target.files[0];
			const data = new FormData();
			data.append('file', file);
			const token = localStorage.getItem('token');
			fetch('http://' + document.location.hostname + ':8080/img/upload', {
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
						if (this._isMounted) {
							if (data.code === 0) {
								this.setState({flashes: [{type: "notice", msg: data.msg}]});
							} else {
								this.setState({flashes: [{type: "error", msg: data.msg}]});
							}
						}
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
		input.click();
	}

	handleRemovePhotoClick(e) {
		e.preventDefault();
		const token = localStorage.getItem('token');
		fetch('http://' + document.location.hostname + ':8080/img/' + e.target.getAttribute('value'), {
			method: 'DELETE',
			headers: {
				'x-access-token': token,
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
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

	handleRemoveTagClick(e) {
		e.preventDefault();
		const data = {name: e.target.value};
		const token = localStorage.getItem('token');
		fetch('http://' + document.location.hostname + ':8080/tag', {
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

	handleRemoveFurryClick(e) {
		e.preventDefault();
		const data = {name: e.target.value};
		const token = localStorage.getItem('token');
		fetch('http://' + document.location.hostname + ':8080/furry', {
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

	handleUnblockClick(e) {
		const d = {id: parseInt(e.target.value)};
		const token = localStorage.getItem('token');
		fetch('http://' + document.location.hostname + ':8080/blocked', {
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
					if (data.code === 0 && this._isMounted) {
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
		return <Account
					firstname={this.state.firstname}
					lastname={this.state.lastname}
					username={this.state.username}
					email={this.state.email}
					bio={this.state.bio}
					city={this.state.city}
					birthdate={this.state.birthdate}
					sexe={this.state.sexe}
					preferences={this.state.preferences}
					lng={this.state.lng}
					lat={this.state.lat}
					furries={this.state.furries}
					suggFurries={this.state.suggFurries}
					tags={this.state.tags}
					suggTags={this.state.suggTags}
					photos={this.state.photos}
					profilePhoto={this.state.profilePhoto}

					blockedUsers={this.state.blockedUsers}

					onChange={this.handleChange}
					onSubmit={this.handleSubmit}

					onCitySubmit={this.handleCitySubmit}
					onRadioChange={this.handleRadioChange}
					
					onLocateClick={this.handleLocateClick}
					
					onTagChange={this.handleTagChange}
					onTagSubmit={this.handleTagSubmit}
					onRemoveTagClick={this.handleRemoveTagClick}
					onAddSuggTagClick={this.handleAddSuggTagClick}
					
					onFurryChange={this.handleFurryChange}
					onFurrySubmit={this.handleFurrySubmit}
					onRemoveFurryClick={this.handleRemoveFurryClick}
					onAddSuggFurryClick={this.handleAddSuggFurryClick}
					
					onAccountPhotoChange={this.handleAccountPhotoChange}
					onAddPhotoClick={this.handleAddPhotoClick}
					onRemovePhotoClick={this.handleRemovePhotoClick}

					onUnblockClick={this.handleUnblockClick}
				/>;
	}

}

export default AccountContainer;
