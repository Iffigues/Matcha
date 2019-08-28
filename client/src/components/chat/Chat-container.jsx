import React from 'react';
import Chat from './Chat-view.jsx';
import io from 'socket.io-client';

class ChatContainer extends React.Component {

	constructor() {
		super();
		this.state = {
			listOpen: 0,
			boxOpen: 0,
			userOpen: 0,
			currentUser: null,
			username: '',
			users: [],
			messages: [],
			socket: io('http://gopiko.fr:8081', {
				query: {token: localStorage.getItem('token')}
			})
		}
		this.fetchData = this.fetchData.bind(this);
		this.handleMainClick = this.handleMainClick.bind(this);
		this.handleListClick = this.handleListClick.bind(this);
		this.handleUserClick = this.handleUserClick.bind(this);
		this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
		// this.handleTextLoad = this.handleTextLoad.bind(this);
	}

	componentDidMount() {
		this.regularlyFetchData();
	}

	regularlyFetchData() {
		this.fetchData();
		setInterval(this.fetchData, 5000);
	}

	fetchData() {
		const token = localStorage.getItem('token');
		fetch('http://gopiko.fr:8080/match', {
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
 						console.log("all matches");
 						console.log(data);
 						this.setState({users: data.users});
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

	fetchMessages(id) {
		const token = localStorage.getItem('token');
		fetch('http://gopiko.fr:8080/messages/' + id, {
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
 						console.log("all messages");
 						console.log(data);
 						this.setState({messages: data.messages});
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

	handleMainClick(e) {
		this.setState({listOpen: !this.state.listOpen, boxOpen: 0, userOpen: 0});
	}

	handleListClick(e) {
		const id = e.target.value;
		const user = this.state.users.find(u => u.id === id);
		this.setState({boxOpen: 1, userOpen: 1, currentUser: user});
		this.fetchMessages(id);
	}

	handleUserClick(e) {
		if (this.state.boxOpen)
			this.setState({boxOpen: 0});
		else {
			this.setState({boxOpen: 1});
			this.fetchMessages(this.state.currentUser.id);
		}
	}

	// handleTextLoad(e) {
	// 	console.log(e.target);
	// 	e.target.scrollTop = e.target.scrollHeight;
	// }

	handleMessageSubmit(e) {
		e.preventDefault();
		console.log('envoyé');
		const form = new FormData(e.target);
		const message = {};
		form.forEach(function(value, key){
			message[key] = value;
		});
		message.from = null;
		message.fromId = null;
		message.to = this.state.currentUser.username;
		message.toId = this.state.currentUser.id;
		const data = {message: message};
		this.state.socket.emit('chat', data, (d) => {
			console.log(d);
			const messages = this.state.messages.slice();
			messages.unshift(d);
			this.setState({messages: messages});
		})
	}

	render() {
		return <Chat
					listOpen={this.state.listOpen}
					boxOpen={this.state.boxOpen}
					userOpen={this.state.userOpen}
					currentUser={this.state.currentUser}
					users={this.state.users}
					messages={this.state.messages}
					onMainClick={this.handleMainClick}
					onListClick={this.handleListClick}
					onUserClick={this.handleUserClick}

					onMessageSubmit={this.handleMessageSubmit}
				/>;
	}

}

export default ChatContainer;
