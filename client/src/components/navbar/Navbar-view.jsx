import React from 'react';
import { Link } from "react-router-dom";

function Navbar(props) {

	return (
		<nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
			<a className="navbar-brand" href="/">Matcha</a>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

		<div className="collapse navbar-collapse" id="navbarSupportedContent">
				{ props.loggedIn
					?
						<ul className="navbar-nav mr-auto">
							<li className="nav-item">
								<Link className="nav-link" to="/suggestions">Suggestions <span className="sr-only">(current)</span></Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/search">Recherche</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/map">Carte</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/notifications">Notifications
									{props.notReadNotifs
										? <span className="badge badge-danger mx-2">{props.notReadNotifs}</span>
										: <div></div>
									}
								</Link>
							</li>
						</ul>
					:	<ul className="navbar-nav mr-auto"></ul>
				} 
			<ul className="navbar-nav">
				{props.loggedIn
					? 	(<li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							{props.username.length ? props.username : 'Login'}
							</a>
							<div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
								<Link className="dropdown-item" to="/account">Profil</Link>
								{props.role === 'admin'
									? <Link className="dropdown-item" to="/admin">Administration</Link>
									: <div></div>
								}
								<div className="dropdown-divider"></div>
								<Link className="dropdown-item" to="/logout">Déconnexion</Link>
							</div>
						</li>)
					:	(<li className="nav-item dropdown">
							<Link className="nav-link dropdown-toggle" to="/login" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Connexion
							</Link>
							<div className="dropdown-menu dropdown-menu-right">
								<Link className="dropdown-item" to="/login">Connexion</Link>
								<div className="dropdown-divider"></div>
								<Link className="dropdown-item" to="/register">Nouveau ici ? Inscription</Link>
								<Link className="dropdown-item" to="/reinitialize">Mot de passe oublié</Link>
							</div>
						</li>)
				}
			</ul>
		</div>
		</nav>
	);
}

export default Navbar;
