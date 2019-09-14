import React from 'react';
import './Home.css';
import { Link } from "react-router-dom";

function Home(props) {
	return (
		<div className="Home">
			<div className="container text-center">
				<h1>Matcha</h1>
				<div><Link className="btn btn-primary my-2" to="/login">Connexion</Link></div>
				<div><Link className="btn btn-success my-2" to="/register">Nouveau compte</Link></div>
			</div>
		</div>
	);
}

export default Home;