import React from 'react';
import Flash from '../flash';
import './Login.css';
import { Redirect } from "react-router-dom";

function Login(props) {
	return (
		<div>
			{props.redirect ? <Redirect to="/"/> : null}
			<div className="Login">
				<div className="container">
					<h2 className="my-4">Connexion</h2>
					<Flash errors={props.errors}/>
					<Flash notices={props.notices}/>
					<form onSubmit={props.onSubmit} className="needs-validation" noValidate>
						<div className="form-group row">
							<label className="col-sm-2 col-form-label">Nom d'Utilisateur</label>
							<div className="col-sm-10">
								<input name="username" type="username" autoComplete="username" className="form-control" placeholder="Pelote" required/>
								<div className="invalid-feedback">
									Entrez votre nom d'utilisateur.
								</div>
							</div>
						</div>
						<div className="form-group row">
							<label className="col-sm-2 col-form-label">Mot de Passe</label>
							<div className="col-sm-10">
								<input name="password" type="password" autoComplete="password" className="form-control" placeholder="Mot de Passe" required/>
								<div className="invalid-feedback">
									Entrez votre mot de passe.
								</div>
							</div>
						</div>
						<div className="form-group row">
							<div className="col-sm-10">
								<button id="loginpbut" className="btn btn-primary mr-1">Connexion</button>
								<button type="reset" className="btn btn-light mr-1">Annuler</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;