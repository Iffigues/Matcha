import React from 'react';
import Profile from './Profile-view.jsx';

class ProfileContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			firstname: '',
			lastname: '',
			username: '',
			age: 0,
			id: 0,
			bio: '',
			city: '',
			popularity: 0,
			sex: 1,
			profilePhoto: '',
			photos: [],
			lastVisite: '',
			connected: 0,
			liked: 0,
			beliked: 0,
			blocked: 0,
			tags: [],
			furries: []
		}
		this.handleLikeClick = this.handleLikeClick.bind(this);
		this.handleBlockClick = this.handleBlockClick.bind(this);
	}

	componentDidMount()
	{
		this.fetchData();
	}

	fetchData() {
		const token = localStorage.getItem('token');
		fetch('http://gopiko.fr:8080/user/' + this.props.match.params.id, {
			method: 'GET',
			headers: {
				'x-access-token': token,
				Accept: 'application/json'
			}
		})
		.then(response => {
			if (response) {
				response.json().then(data => {
					if (data.code === 0) {
 						console.log(data);
 						this.setState({
 							firstname: data.profile.firstname,
							lastname: data.profile.lastname,
							username: data.profile.username,
							age: data.profile.age,
							id: data.profile.id,
							bio: data.profile.bio,
							city: data.profile.city,
							popularity: data.profile.popularity,
							sex: data.profile.sexe,
							profilePhoto: data.profile.profilephoto,
							photos: data.profile.photos,
							lastVisite: data.profile.lastVisite,
							connected: data.profile.connected,
							tags: data.profile.tags,
							furries: data.profile.furries,
							liked: data.profile.liked,
							beliked: data.profile.beliked,
							blocked: data.profile.blocked
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

	handleLikeClick(e) {
		const d = {id: parseInt(e.target.value)};
		const token = localStorage.getItem('token');
		fetch('http://gopiko.fr:8080/like/add', {
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

	handleBlockClick(e) {
		const d = {id: parseInt(e.target.value)};
		const token = localStorage.getItem('token');
		fetch('http://gopiko.fr:8080/bloque', {
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
					console.log(data);
					if (data.code === 0) {
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

	handleReportClick(e) {
		const d = {id: parseInt(e.target.value)};
		const token = localStorage.getItem('token');
		fetch('http://gopiko.fr:8080/report', {
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
						alert("Profil signalé !");
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
		return (
			<Profile
				firstname={this.state.firstname}
				lastname={this.state.lastname}
				username={this.state.username}
				age={this.state.age}
				id={this.state.id}
				bio={this.state.bio}
				city={this.state.city}
				popularity={this.state.popularity}
				sex={this.state.sex}
				profilePhoto={this.state.profilePhoto}
				photos={this.state.photos}
				lastVisite={this.state.lastVisite}
				connected={this.state.connected}
				liked={this.state.liked}
				beliked={this.state.beliked}
				blocked={this.state.blocked}
				tags={this.state.tags}
				furries={this.state.furries}

				onLikeClick={this.handleLikeClick}
				onBlockClick={this.handleBlockClick}
				onReportClick={this.handleReportClick}
			/>
		);
	}

}

export default ProfileContainer;
