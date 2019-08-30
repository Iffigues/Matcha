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
		this.state.socket.on('chat', (data) => {
			console.log('message reçu');
			console.log(data);
			if (data.message && data.message.content.length > 0) {
				console.log('message ok');
				if (this.state.currentUser && data.message.fromId === this.state.currentUser.id && this.state.boxOpen) {
					console.log('ajout message dans box');
					const messages = this.state.messages.slice();
					messages.unshift(data.message);
					this.setState({messages: messages});
				} else {
					data.message.unread = 1;
					this.state.socket.emit('unread', data);
					// const user = this.state.users.find(u => u.id === data.message.fromId);
					// user.unread = (user.unread || 0) + 1;
					// this.setState({});
				}
			}
		});
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
 						this.setState({messages: data.messages});
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
		if (this.state.boxOpen) {
			this.setState({boxOpen: 0});
		}
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
		const form = new FormData(e.target);
		const message = {};
		form.forEach(function(value, key){
			message[key] = value;
		});
		if (message.content.length > 0) {
			message.from = null;
			message.fromId = null;
			message.to = this.state.currentUser.username;
			message.toId = this.state.currentUser.id;
			message.date = new Date();
			const data = {message: message};
			console.log('message envoyé :');
			console.log(data);
			this.state.socket.emit('chat', data);
			const messages = this.state.messages.slice();
			messages.unshift(message);
			this.setState({messages: messages});
		}
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
