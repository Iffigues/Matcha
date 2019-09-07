import React from 'react';
import Flash from '../flash';
import avatar from '../../avatar.jpg';
import './Profile.css';

function Profile(props) {
	const likeStatus = (props.liked > 0) + (props.beliked > 0) * 2;
	let likeMessage = null;
	if (likeStatus === 1)
		likeMessage = "Vous avez aimé ce profil";
	else if (likeStatus === 2)
		likeMessage = "Cet utilisateur a aimé votre profil";
	else if (likeStatus === 3)
		likeMessage = "Vous avez respectivement aimés vos profils, vous avez matché";
	
	const idPhoto = props.photos.findIndex(el => el.id === props.profilePhoto);
	const profilePhoto = props.photos.splice(idPhoto, 1)[0];
	const date = new Date(props.lastVisite).toLocaleString('fr-FR');
	return (
		<div className="Profile">
			<div className="container">
				<Flash errors={props.errors}/>
				<Flash notices={props.notices}/>
				<div className="row">
					<div className="col-sm-4">
						<img className="card-img pt-3 pb-3" src={profilePhoto ? 'http://:8080/' + profilePhoto.path : avatar} alt="..."/>
					</div>
				</div>
				<h2>{props.firstname} {props.lastname} <i>- {props.username}</i></h2>
				<h5>{props.age} ans - {props.sex === 1 ? "Homme" : "Femme"} - {props.city}</h5>
				<h6>{props.popularity} de popularité</h6>
				<p className="text-success">
					<i>
						{props.connected ? "En ligne" : "Dernière visite le " + date}
						{likeMessage ? " - " + likeMessage : ""}
					</i>
				</p>
				<p>
					<button value={props.id}
							className={"btn-sm btn" + (!props.liked ? "-outline" : "") + "-primary"}
							onClick={props.onLikeClick}>
							J'aime
					</button>
				</p>
				<div className="row">
					{props.photos.map((photo, key) => 
						<div key={key} className="col-sm-3">
							<div className="card">
								<img className="card-img-top" src={'http://:8080/' + photo.path} alt="..."/>
							</div>
						</div>)}
				</div>
				<div>
					<h5 className="pt-3">Furries</h5>
					<p>
						{props.furries.length
							? props.furries.map((furry, key) => {
								return (<span key={key} className="badge badge-secondary mr-1">{furry}</span>);
							})
							: <i>Aucun</i>
						}
					</p>
					<h5 className="pt-3">Centres d'intérêts</h5>
					<p>
						{props.tags.length
							? props.tags.map((tag, key) => {
								return (<span key={key} className="badge badge-secondary mr-1">{tag}</span>);
							})
							: <i>Aucun</i>
						}
					</p>
					<h5 className="pt-3">Bio</h5>
					<p>
						{props.bio
							? props.bio
							: <i>Aucune</i>
						}
					</p>
				</div>
				<div className="pt-3 my-3">
					<button value={props.id}
							className={"btn-sm btn" + (!props.blocked ? "-outline" : "") + "-danger"}
							onClick={props.onBlockClick}>
							Bloquer cet utilisateur
					</button>
				</div>
				<div className="my-3">
					<button value={props.id}
							className={"btn-sm btn-outline-success"}
							onClick={props.onReportClick}>
							Signaler ce profil comme faux
					</button>
				</div>
			</div>
		</div>
	);
}

export default Profile;