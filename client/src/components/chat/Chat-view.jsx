import React from 'react';
import './Chat.css';

function Chat(props) {
	let unread = props.users.map(x => x.unread);
	if (unread.length > 0) {
		unread = unread.reduce((x, y) => x + y);
	}
	return (
		<div className="Chat">
			<div className="chat-main" onClick={props.onMainClick}>
				Messagerie {unread ? '(' + unread + ')' : ''}
			</div>
			{props.listOpen
				? (<div className="chat-list">
						<ul>
							{props.users.map((user, key) => {
								return <li key={key} value={user.id} onClick={props.onListClick}>{user.username} {user.unread ? '(' + user.unread + ')' : ''}</li>
							})}
						</ul>
					</div>) : (<div></div>)
			}
			{props.userOpen
				? (<div className="chat-user" onClick={props.onUserClick}>
					{props.currentUser.username}
					</div>) : (<div></div>)
			}
			{props.boxOpen
				? (<div className="chat-box">
						<div className="chat-text">
							{props.messages.map((message, key) => {
								const date = new Date(message.date).toLocaleString('fr-FR');
								if (message.fromId === props.currentUser.id) {
									return 	<div key={key} className="chat-text-him">
												<div className="chat-text-him-body">{message.content}</div>
												<small className="chat-text-him-date">{date}</small>
											</div>;
								} else {
									return	<div key={key} className="chat-text-me">
												<div className="chat-text-me-body">{message.content}</div>
												<small className="chat-text-me-date">{date}</small>
											</div>;
								}
							})}
									{/*<div className="chat-text-him">
										<div className="chat-text-him-body">sdklfkdfs dfslkljgk fsdjfd lkdfj gkl</div>
										<small className="chat-text-him-date">youpi</small>
									</div>
									<div className="chat-text-me">
										<div className="chat-text-me-body">sdklfkdfs dfslkljgk fsdjfd lkdfj gkl</div>
										<small className="chat-text-me-date">youpi</small>
									</div>
									<div className="chat-text-him">
										<div className="chat-text-him-body">sdklfkdfs dfslkljgk fsdjfd lkdfj gkl</div>
										<small className="chat-text-him-date">youpi</small>
									</div>
									<div className="chat-text-me">
										<div className="chat-text-me-body">sdklfkdfs dfslkljgk fsdjfd lkdfj gkl</div>
										<small className="chat-text-me-date">youpi</small>
									</div>
									<div className="chat-text-him">
										<div className="chat-text-him-body">sdklfkdfs dfslkljgk fsdjfd lkdfj gkl</div>
										<small className="chat-text-him-date">youpi</small>
									</div>
									<div className="chat-text-me">
										<div className="chat-text-me-body">sdklfkdfs dfslkljgk fsdjfd lkdfj gkl</div>
										<small className="chat-text-me-date">youpi</small>
									</div>
									<div className="chat-text-me">
										<div className="chat-text-me-body">sdklfkdfs dfslkljgk fsdjfd lkdfj gkl</div>
										<small className="chat-text-me-date">youpi</small>
									</div>*/}
						</div>
						<form className="row" onSubmit={props.onMessageSubmit}>
							<div className="col-sm-9">
								<input name="content" type="text" className="chat-input form-control mx-2"/>
							</div>
								<button value={props.currentUser.id} type="submit" className="chat-submit btn btn-primary">Envoyer</button>
						</form>
					</div>) : (<span></span>)
			}
		</div>
	);
}

export default Chat;