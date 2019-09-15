import React from 'react';
import './Reinitialize.css';

function Reinitialize(props) {
  return (
	<div className="Reinitialize">
		{!props.token
			?   (<div className="container">
					<h2 className="mb-4">Réinitialisation du Mot de passe</h2>
					<form onSubmit={props.onEmailSubmit} className="needs-validation" noValidate>
						<div className="form-group row">
							<label className="col-sm-2 col-form-label">Adresse Email</label>
							<div className="col-sm-10">
								<input name="email" type="email" autoComplete="email" className="form-control" placeholder="pelote@delaine.fr" required/>
								<div className="invalid-feedback">
									Entrez une adresse email valide.
								</div>
							</div>
						</div>
						<div className="form-group row">
							<div className="col-sm-10">
								<button className="btn btn-primary mr-1">Réinitialiser</button>
								<button type="reset" className="btn btn-light mr-1">Annuler</button>
							</div>
						</div>
					</form>
				</div>)
			:	(<div className="container">	
					<h2 className="mb-4">Changement du Mot de passe</h2>
					<form onSubmit={props.onPasswordSubmit} className="needs-validation" noValidate>
						<input name="username" style={{display:'none'}} autoComplete="off" readOnly="readonly"/>
						<input name="token" value={props.token} style={{display:'none'}} autoComplete="off" readOnly="readonly"/>
						<div className="form-group row">
							<label className="col-sm-2 col-form-label">Nouveau mot de passe</label>
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
								<button className="btn btn-primary mr-1">Valider</button>
								<button type="reset" className="btn btn-light mr-1">Annuler</button>
							</div>
						</div>
					</form>
				</div>)
		}
	</div>
  );
}

export default Reinitialize;