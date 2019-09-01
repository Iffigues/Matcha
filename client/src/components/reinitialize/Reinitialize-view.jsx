import React from 'react';
import Flash from '../flash';
import './Reinitialize.css';

function Reinitialize(props) {
  return (
    <div className="Reinitialize">
    	<div className="container">
		    <h2 className="my-4">Réinitialisation du Mot de passe</h2>
	 	    <Flash errors={props.errors}/>
		    <Flash notices={props.notices}/>
	    	<form onSubmit={props.onSubmit} className="needs-validation" noValidate>
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
						<button id="forgotbut" className="btn btn-primary mr-1">Réinitialiser</button>
						<button type="reset" className="btn btn-light mr-1">Annuler</button>
					</div>
				</div>
			</form>
		</div>
    </div>
  );
}

export default Reinitialize;