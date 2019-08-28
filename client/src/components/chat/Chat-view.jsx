import React from 'react';
import './Chat.css';

function Chat(props) {
	return (
		<div className="Chat">
			<div className="chat-main" onClick={props.onMainClick}>
				Messagerie
			</div>
			{props.listOpen
				? (<div className="chat-list">
						<ul>
							{props.users.map((user, key) => {
								return <li key={key} value={user.id} onClick={props.onListClick}>{user.username}</li>
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
{/*							{props.messages.map((message, key) => {
								if (message.him)
									return <small className="chat-text-me-date">{message.date}</small>
											<p className="text-him">{message.text}</p>;
								else
									return <p className="text-me">{message.text}</p>;
							})}*/}
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
									</div>
						</div>
						<form className="row" onSubmit={props.onMessageSubmit}>
							<div className="col-sm-9">
								<input name="content" type="text" className="form-control mx-2"/>
							</div>
							<button value={props.currentUser.id} type="submit" className="btn btn-primary">Envoyer</button>
						</form>
					</div>) : (<span></span>)
			}
		</div>
	);
}

export default Chat;