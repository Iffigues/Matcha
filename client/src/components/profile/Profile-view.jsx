import React from 'react';
import Flash from '../flash';
import TagsInput from './tagsinput';
import PhotosInput from './photosinput';
import './Profile.css';

function Profile(props) {
	return (
		<div className="Profile">
			<div className="container">
				<h2 className="my-4">Profil Utilisateur</h2>
				<Flash errors={props.errors}/>
				<Flash notices={props.notices}/>
				<form onSubmit={props.onSubmit} className="needs-validation" noValidate>
					<div className="form-group row">
						<label className="col-sm-2 col-form-label">Prénom</label>
						<div className="col-sm-9">
							<input name="firstname" type="firstname" value={props.firstname} onChange={props.onChange}
								autoComplete="firstname" className="form-control" placeholder="Martin" required/>
							<div className="invalid-feedback">
								Fournissez un prénom valide (uniquement caractères littéraires).
							</div>
						</div>
						<div className="col-sm-1">
							<button className="btn btn-primary">Modifier</button>
						</div>
					</div>
				</form>	
				<form onSubmit={props.onSubmit} className="needs-validation" noValidate>
					<div className="form-group row">
						<label className="col-sm-2 col-form-label">Nom</label>
						<div className="col-sm-9">
							<input name="lastname" type="lastname" value={props.lastname} onChange={props.onChange}
								autoComplete="lastname" className="form-control" placeholder="Rivière" required/>
							<div className="invalid-feedback">
								Fournissez un nom valide (uniquement caractères littéraires).
							</div>
						</div>
						<div className="col-sm-1">
							<button className="btn btn-primary">Modifier</button>
						</div>
					</div>
				</form>
				<form onSubmit={props.onSubmit} className="needs-validation" noValidate>
					<div className="form-group row">
						<label className="col-sm-2 col-form-label">Date de naissance</label>
						<div className="col-sm-9">
							<input name="birthdate" value={props.birthdate} onChange={props.onChange}
								className="form-control" placeholder="dd/mm/aaaa" required/>
							<div className="invalid-feedback">
								Indiquez une date valide.
							</div>
						</div>
						<div className="col-sm-1">
							<button className="btn btn-primary">Modifier</button>
						</div>
					</div>
				</form>
				<form onSubmit={props.onSubmit} className="needs-validation" noValidate>
					<div className="form-group row">
						<label className="col-sm-2 col-form-label">Localisation</label>
						<div className="col-sm-8">
							<input name="city" type="city" value={props.city} onChange={props.onChange}
								autoComplete="city" className="form-control" placeholder="75017" required/>
							<div className="invalid-feedback">
								Indiquez la ville où vous vous situez.
							</div>
						</div>
						<div className="col-sm-1">
							<button className="btn btn-primary" onClick={props.onLocateClick}>Localiser</button>
						</div>
						<div className="col-sm-1">
							<button className="btn btn-primary">Modifier</button>
						</div>
					</div>
				</form>
				<form className="needs-validation" noValidate>
					<div className="form-group row">
						<label className="col-sm-2 col-form-label">Genre</label>
						<div className="col-sm-9">
							<div className="form-check">
								<input name="sexe" type="radio" autoComplete="gender" className="form-check-input"
									value="1" onChange={props.onRadioChange} checked={props.sexe === 1}/>
								<label className="form-check-label">Homme</label>
							</div>
							<div className="form-check">
								<input name="sexe" type="radio" autoComplete="gender" className="form-check-input"
									value="2" onChange={props.onRadioChange} checked={props.sexe === 2}/>
								<label className="form-check-label">Femme</label>
							</div>
						</div>
					</div>
				</form>
				<form onChange={props.onRadioChange} className="needs-validation" noValidate>
					<div className="form-group row">
						<label className="col-sm-2 col-form-label">Prérérences</label>
						<div className="col-sm-9">
							<div className="form-check">
								<input name="preferences" type="radio" autoComplete="gender" className="form-check-input" value="1"/>
								<label className="form-check-label">Hommes</label>
							</div>
							<div className="form-check">
								<input name="preferences" type="radio" autoComplete="gender" className="form-check-input" value="2"/>
								<label className="form-check-label">Femmes</label>
							</div>
							<div className="form-check">
								<input name="preferences" type="radio" autoComplete="gender" className="form-check-input" value="3" defaultChecked/>
								<label className="form-check-label">Les deux</label>
							</div>
						</div>
					</div>
				</form>
				<form onSubmit={props.onSubmit} className="needs-validation" noValidate>
					<div className="form-group row">
						<label className="col-sm-2 col-form-label">Bio</label>
						<div className="col-sm-9">
							<textarea name="bio" value={props.bio} onChange={props.onChange} className="form-control" placeholder="Bio" required/>
							<div className="invalid-feedback">
								Completez la bio.
							</div>
						</div>
						<div className="col-sm-1">
							<button className="btn btn-primary">Modifier</button>
						</div>
					</div>
				</form>
				<TagsInput/>
				<PhotosInput/>
				<h2 className="my-4">Compte Utilisateur</h2>
				<form onSubmit={props.onSubmit} className="needs-validation" noValidate>
					<div className="form-group row">
						<label className="col-sm-2 col-form-label">Nom d'Utilisateur</label>
						<div className="col-sm-9">
							<input name="username" type="username" value={props.username} onChange={props.onChange}
								autoComplete="username" className="form-control" placeholder="Pelote" required/>
							<div className="invalid-feedback">
								Fournissez un nom d'utilisateur valide (minimum 4 caractères littéraires).
							</div>
						</div>
						<div className="col-sm-1">
							<button className="btn btn-primary">Modifier</button>
						</div>
					</div>
				</form>
				<form onSubmit={props.onSubmit} className="needs-validation" noValidate>
					<div className="form-group row">
						<label className="col-sm-2 col-form-label">Email</label>
						<div className="col-sm-9">
							<input name="email" type="email" value={props.email} onChange={props.onChange}
								autoComplete="email" className="form-control"  placeholder="pelote@delaine.fr" required/>
							<div className="invalid-feedback">
								Fournissez une adresse email valide.
							</div>
						</div>
						<div className="col-sm-1">
							<button className="btn btn-primary">Modifier</button>
						</div>
					</div>
				</form>
				<form onSubmit={props.onSubmit} className="needs-validation" noValidate>
					<input name="username" style={{display:'none'}} autoComplete="off" readOnly="readonly"/>
					<div className="form-group row">
						<label className="col-sm-2 col-form-label">Mot de Passe</label>
						<div className="col-sm-9">
							<input name="password" type="password" autoComplete="new-password" className="form-control" placeholder="Mot de Passe" required/>
							<div className="invalid-feedback">
								Fournissez un mot de passe valide (minimum 8 caractères dont 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial).
							</div>
						</div>
					</div>
					<div className="form-group row">
						<label className="col-sm-2 col-form-label">Confirmer</label>
						<div className="col-sm-9">
							<input name="confirm" type="password" autoComplete="new-password" className="form-control" placeholder="Mot de Passe" required/>
							<div className="invalid-feedback">
								Retapez le mot de passe à l'identique.
							</div>
						</div>
						<div className="col-sm-1">
							<button className="btn btn-primary">Modifier</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Profile;