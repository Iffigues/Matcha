import React from 'react';
import Flash from '../flash';
import './Register.css';

function Register(props) {
  return (
	<div className="Register">
		<div className="container">
			<h2 className="mb-4">Création de compte</h2>
			<form onSubmit={props.onSubmit} className="needs-validation" noValidate>
				<div className="form-group row">
					<label className="col-sm-2 col-form-label">Nom d'Utilisateur</label>
					<div className="col-sm-10">
						<input name="username" type="username" autoComplete="username" className="form-control" placeholder="Pelote" required/>
						<div className="invalid-feedback">
							Fournissez un nom d'utilisateur valide (minimum 4 caractères littéraires).
						</div>
					</div>
				</div>
				<div className="form-group row">
					<label className="col-sm-2 col-form-label">Prénom</label>
					<div className="col-sm-10">
						<input name="firstname" type="firstname" autoComplete="firstname" className="form-control" placeholder="Martin" required/>
						<div className="invalid-feedback">
							Fournissez un prénom valide (uniquement caractères littéraires).
						</div>
					</div>
				</div>
				<div className="form-group row">
					<label className="col-sm-2 col-form-label">Nom</label>
					<div className="col-sm-10">
						<input name="lastname" type="lastname" autoComplete="lastname" className="form-control" placeholder="Rivière" required/>
						<div className="invalid-feedback">
							Fournissez un nom valide (uniquement caractères littéraires).
						</div>
					</div>
				</div>
				<div className="form-group row">
					<label className="col-sm-2 col-form-label">Genre</label>
					<div className="col-sm-10">
						<div className="form-check">
							<input name="sexe" type="radio" autoComplete="gender" className="form-check-input" value="1" defaultChecked/>
							<label className="form-check-label">Homme</label>
						</div>
						<div className="form-check">
							<input name="sexe" type="radio" autoComplete="gender" className="form-check-input" value="2"/>
							<label className="form-check-label">Femme</label>
						</div>
					</div>
				</div>
				<div className="form-group row">
					<label className="col-sm-2 col-form-label">Email</label>
					<div className="col-sm-10">
						<input name="email" type="email" autoComplete="email" className="form-control"  placeholder="pelote@delaine.fr" required/>
						<div className="invalid-feedback">
							Fournissez une adresse email valide.
						</div>
					</div>
				</div>
				<div className="form-group row">
					<label className="col-sm-2 col-form-label">Mot de Passe</label>
					<div className="col-sm-10">
						<input name="password" type="password" autoComplete="new-password" className="form-control" placeholder="Mot de Passe" required/>
						<div className="invalid-feedback">
							Fournissez un mot de passe valide (minimum 8 caractères dont 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial).
						</div>
					</div>
				</div>
				<div className="form-group row">
					<label className="col-sm-2 col-form-label">Confirmer</label>
					<div className="col-sm-10">
						<input name="confirm" type="password" autoComplete="new-password" className="form-control" placeholder="Mot de Passe" required/>
						<div className="invalid-feedback">
							Recopier le mot de passe à l'identique.
						</div>
					</div>
				</div>
				<div className="form-group row">
					<div className="col-sm-10">
						<button id="newbut" className="btn btn-primary mr-1">Créer le compte</button>
						<button type="reset" className="btn btn-light mr-1">Annuler</button>
					</div>
				</div>
			</form>
		</div>
	</div>
  );
}

export default Register;