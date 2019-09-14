import React from 'react';
import './LikedList.css';
import { Link } from "react-router-dom";

function LikedList(props) {
	return (
		<div>
			<div className="LikedList">
				<div className="container">
					<h2 className="mb-4">Liste des profils aimés</h2>
					<ul>
					{props.profiles.map((profile, key) => {
						return <li key={key}><Link to={"/profiles/" + profile.id}>{profile.firstname} {profile.lastname} - {profile.username}</Link></li>
					})}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default LikedList;