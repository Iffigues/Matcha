import React from 'react';
import './Account.css';

function Account(props) {
	return (
		<div className="Account">
			<div className="container">
				<h2 className="mb-4">Profil Utilisateur</h2>
				<form onSubmit={props.onSubmit} className="needs-validation" noValidate>
					<div className="form-group row">
						<label className="col-sm-2 col-form-label">Prénom</label>
						<div className="col-sm-8">
							<input name="firstname" type="firstname" value={props.firstname} onChange={props.onChange}
								autoComplete="firstname" className="form-control" placeholder="Martin" required/>
							<div className="invalid-feedback">
								Fournissez un prénom valide (uniquement caractères littéraires).
							</div>
						</div>
						<div className="col-sm-2">
							<button className="btn btn-primary">Modifier</button>
						</div>
					</div>
				</form>	
				<form onSubmit={props.onSubmit} className="needs-validation" noValidate>
					<div className="form-group row">
						<label className="col-sm-2 col-form-label">Nom</label>
						<div className="col-sm-8">
							<input name="lastname" type="lastname" value={props.lastname} onChange={props.onChange}
								autoComplete="lastname" className="form-control" placeholder="Rivière" required/>
							<div className="invalid-feedback">
								Fournissez un nom valide (uniquement caractères littéraires).
							</div>
						</div>
						<div className="col-sm-2">
							<button className="btn btn-primary">Modifier</button>
						</div>
					</div>
				</form>
				<form onSubmit={props.onSubmit} className="needs-validation" noValidate>
					<div className="form-group row">
						<label className="col-sm-2 col-form-label">Date de naissance</label>
						<div className="col-sm-8">
							<input name="birthdate" value={props.birthdate} onChange={props.onChange}
								className="form-control" placeholder="dd/mm/aaaa" required/>
							<div className="invalid-feedback">
								Indiquez une date valide.
							</div>
						</div>
						<div className="col-sm-2">
							<button className="btn btn-primary">Modifier</button>
						</div>
					</div>
				</form>
				<form onSubmit={props.onCitySubmit} className="needs-validation" noValidate>
					<div className="form-group row">
						<label className="col-sm-2 col-form-label">Localisation</label>
						<div className="col-sm-8">
							<input name="lng" style={{display:'none'}} value={props.lng} autoComplete="off" readOnly="readonly"/>
							<input name="lat" style={{display:'none'}} value={props.lat} autoComplete="off" readOnly="readonly"/>
							<input name="city" type="city" value={props.city} onChange={props.onChange}
								autoComplete="city" className="form-control" placeholder="Laineville" required/>
							<div className="invalid-feedback">
								Indiquez la ville où vous vous situez ou localisez-vous.
							</div>
						</div>
						<div className="col-sm-2">
							<button className="btn btn-primary mb-2" onClick={props.onLocateClick}>Localiser</button>
							<button className="btn btn-primary">Modifier</button>
						</div>
					</div>
				</form>
				<form className="needs-validation" noValidate>
					<div className="form-group row">
						<label className="col-sm-2 col-form-label">Genre</label>
						<div className="col-sm-8">
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
				<form className="needs-validation" noValidate>
					<div className="form-group row">
						<label className="col-sm-2 col-form-label">Prérérences</label>
						<div className="col-sm-8">
							<div className="form-check">
								<input name="preferences" type="radio" autoComplete="gender" className="form-check-input"
									value="1" onChange={props.onRadioChange} checked={props.preferences === 1}/>
								<label className="form-check-label">Hommes</label>
							</div>
							<div className="form-check">
								<input name="preferences" type="radio" autoComplete="gender" className="form-check-input"
									value="2" onChange={props.onRadioChange} checked={props.preferences === 2}/>
								<label className="form-check-label">Femmes</label>
							</div>
							<div className="form-check">
								<input name="preferences" type="radio" autoComplete="gender" className="form-check-input"
									value="3" onChange={props.onRadioChange} checked={props.preferences === 3}/>
								<label className="form-check-label">Les deux</label>
							</div>
						</div>
					</div>
				</form>
				<form onSubmit={props.onFurrySubmit} className="needs-validation" noValidate>
					<div className="form-group row">
						<label className="col-sm-2 col-form-label">Types de Furry</label>
						<div className="col-sm-8">
							<input name="furry" autoComplete="off" className="form-control" placeholder="Lapin, Chat, Renard ..." onChange={props.onFurryChange} required/>
							<div className="invalid-feedback">
								Entre 1 et 30 caractères littéraires.
							</div>
							<h5 className="mt-2">
								{props.suggFurries.map((value, key) => {
									return (<span key={value.name} value={value.name} className="badge badge-light border mr-1" onClick={props.onAddSuggFurryClick}>{value.name} ({value.nbr})</span>);
								})}
							</h5>
							<h5 className="mt-1">
								{props.furries.map((value, key) => {
									return (<span key={key} className="badge badge-secondary mr-1">{value} <button type="button" value={value} onClick={props.onRemoveFurryClick}>x</button></span>);
								})}
							</h5>
						</div>
						<div className="col-sm-2">
							<button className="btn btn-primary">Ajouter</button>
						</div>
					</div>
				</form>
				<form onSubmit={props.onSubmit} className="needs-validation" noValidate>
					<div className="form-group row">
						<label className="col-sm-2 col-form-label">Bio</label>
						<div className="col-sm-8">
							<textarea name="bio" value={props.bio} onChange={props.onChange} className="form-control" placeholder="Bio" required/>
							<div className="invalid-feedback">
								Completez la bio.
							</div>
						</div>
						<div className="col-sm-2">
							<button className="btn btn-primary">Modifier</button>
						</div>
					</div>
				</form>
				<form onSubmit={props.onTagSubmit} className="needs-validation" noValidate>
					<div className="form-group row">
						<label className="col-sm-2 col-form-label">Centres d'intérets</label>
						<div className="col-sm-8">
							<input name="tag" autoComplete="off" className="form-control" placeholder="Cuisine, Sport, Piano ..." onChange={props.onTagChange} required/>
							<div className="invalid-feedback">
								Entre 1 et 30 caractères littéraires.
							</div>
							<h5 className="mt-2">
								{props.suggTags.map((value, key) => {
									return (<span key={value.name} value={value.name} className="badge badge-light border mr-1" onClick={props.onAddSuggTagClick}>{value.name} ({value.nbr})</span>);
								})}
							</h5>
							<h5 className="mt-1">
								{props.tags.map((value, key) => {
									return (<span key={key} className="badge badge-secondary mr-1">{value} <button type="button" value={value} onClick={props.onRemoveTagClick}>x</button></span>);
								})}
							</h5>
						</div>
						<div className="col-sm-2">
							<button className="btn btn-primary">Ajouter</button>
						</div>
					</div>
				</form>
				<form>
					<div className="form-group row">
						<label className="col-sm-2 col-form-label">Photos</label>
						<div className="col-sm-8">
							<div className="row">
								{props.photos.length
									? props.photos.map((value, key) => {
										return (
											<div key={key} className="col-sm-2">
												<div className="card my-2">
													<img src={'http://' + document.location.hostname + ':8080/' + value.path} className="card-img px-2 pt-2" alt=""/>
													<div>
														<div className="form-check form-check-inline m-2">
															<input name="profilephoto" className="form-check-input" type="radio"
															value={value.id} onChange={props.onAccountPhotoChange} checked={props.profilePhoto === value.id}/>
															<label className="form-check-label">{key + 1}</label>
														</div>
														<span className="miniclose close btn" value={value.id} onClick={props.onRemovePhotoClick}>x</span>
													</div>
												</div>
											</div>
										);
									})
									: <p>Aucune photo</p>
								}
							</div>
						</div>
						<div className="col-sm-2">
							<button className="btn btn-primary" onClick={props.onAddPhotoClick}>Ajouter</button>
						</div>
					</div>
				</form>
				<h2 className="my-4">Compte Utilisateur</h2>
				<form onSubmit={props.onSubmit} className="needs-validation" noValidate>
					<div className="form-group row">
						<label className="col-sm-2 col-form-label">Nom d'Utilisateur</label>
						<div className="col-sm-8">
							<input name="username" type="username" value={props.username} onChange={props.onChange}
								autoComplete="username" className="form-control" placeholder="Pelote" required/>
							<div className="invalid-feedback">
								Fournissez un nom d'utilisateur valide (minimum 4 caractères littéraires).
							</div>
						</div>
						<div className="col-sm-2">
							<button className="btn btn-primary">Modifier</button>
						</div>
					</div>
				</form>
				<form onSubmit={props.onSubmit} className="needs-validation" noValidate>
					<div className="form-group row">
						<label className="col-sm-2 col-form-label">Email</label>
						<div className="col-sm-8">
							<input name="email" type="email" value={props.email} onChange={props.onChange}
								autoComplete="email" className="form-control"  placeholder="pelote@delaine.fr" required/>
							<div className="invalid-feedback">
								Fournissez une adresse email valide.
							</div>
						</div>
						<div className="col-sm-2">
							<button className="btn btn-primary">Modifier</button>
						</div>
					</div>
				</form>
				<form onSubmit={props.onSubmit} className="needs-validation" noValidate>
					<input name="username" style={{display:'none'}} autoComplete="off" readOnly="readonly"/>
					<div className="form-group row">
						<label className="col-sm-2 col-form-label">Mot de Passe</label>
						<div className="col-sm-8">
							<input name="password" type="password" autoComplete="new-password" className="form-control" placeholder="Mot de Passe" required/>
							<div className="invalid-feedback">
								Fournissez un mot de passe valide (minimum 8 caractères dont 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial).
							</div>
						</div>
					</div>
					<div className="form-group row">
						<label className="col-sm-2 col-form-label">Confirmer</label>
						<div className="col-sm-8">
							<input name="confirm" type="password" autoComplete="new-password" className="form-control" placeholder="Mot de Passe" required/>
							<div className="invalid-feedback">
								Retapez le mot de passe à l'identique.
							</div>
						</div>
						<div className="col-sm-2">
							<button className="btn btn-primary">Modifier</button>
						</div>
					</div>
				</form>
				<h2 className="my-4">Utilisateurs bloqués</h2>
				<table className="table table-sm">
					<thead>
						<tr>
							<th scope="col">Nom</th>
							<th scope="col">Nom d'Utilisateur</th>
							<th scope="col">Action</th>
						</tr>
					</thead>
					<tbody>
						{props.blockedUsers.length > 0
							? 	props.blockedUsers.map((value, key) => {
									return (
										<tr key={key}>
											<td>{value.firstname} {value.lastname}</td>
											<td><i>{value.username}</i></td>
											<td>
												<button className="btn btn-sm btn-danger" type="button"
														value={value.blockedId}
														onClick={props.onUnblockClick}>
													Débloquer
												</button>
											</td>
										</tr>
									);
								})
							:	<tr><td colSpan="3"><i>Aucun</i></td></tr>
						}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Account;