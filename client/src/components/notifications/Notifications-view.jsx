import React from 'react';
import './Notifications.css';
import TimeAgo from 'javascript-time-ago';
import fr from 'javascript-time-ago/locale/fr'
import { Link } from "react-router-dom";


function Notifications(props) {
	TimeAgo.addLocale(fr);
	const timeAgo = new TimeAgo('fr-fr');
	return (
		<div className="Notifications">
			<div className="container">
				<h2 className="mb-4">Notifications</h2>
				<ul>
					{props.notifications.length
						? props.notifications.map((notif, key) => {
							let date = new Date(notif.date);
							let message;
							switch (notif.type) {
								case "visited":
									message = <span><Link to={"/profiles/" + notif.userId}>{notif.username || "Un utilisateur"}</Link> a visité votre profil</span>;
									break;
								case "liked":
									message = <span><Link to={"/profiles/" + notif.userId}>{notif.username || "Un utilisateur"}</Link> a aimé votre profil</span>;
									break ;
								case "matched":
									message = <span><Link to={"/profiles/" + notif.userId}>{notif.username || "Un utilisateur"}</Link> a aimé votre profil en retour, c'est un match !</span>;
									break ;
								case "unmatched":
									message = <span><Link to={"/profiles/" + notif.userId}>{notif.username || "Un utilisateur"}</Link> n'aime plus votre profil</span>;
									break ;
								case "gotmessage":
									message = <span><Link to={"/profiles/" + notif.userId}>{notif.username || "Un utilisateur"}</Link> vous a envoyé un message</span>;
									break ;
								default:
							}
							if (notif.look)
								return <li key={key}>{message} - <i>{timeAgo.format(date)}</i></li>;
							else
								return <li key={key}><b>{message} - <i>{timeAgo.format(date)}</i></b></li>;
						})
						: <li><i>Aucune notification</i></li>
					}
				</ul>
			</div>
		</div>
	);
}

export default Notifications;