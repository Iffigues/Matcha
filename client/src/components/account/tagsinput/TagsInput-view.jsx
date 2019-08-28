import React from 'react';

function TagsInput(props) {
	return (
		<div className="TagsInput">
			<form onSubmit={props.onSubmit} className="needs-validation" noValidate>
				<div className="form-group row">
					<label className="col-sm-2 col-form-label">Centres d'intérets</label>
					<div className="col-sm-9">
						<input name="tag" autoComplete="off" className="form-control" placeholder="Cuisine, Sport, Piano ..." onChange={props.onChange} required/>
						<div className="invalid-feedback">
							Entre 1 et 30 caractères littéraires.
						</div>
						<h5 className="mt-2">
							{props.tagsSuggest.map((value, key) => {
								return (<span key={value.name} value={value.name} className="badge badge-light border mr-1" onClick={props.onClickAddSuggestion}>{value.name} ({value.nbr})</span>);
							})}
						</h5>
						<h5 className="mt-1">
							{props.userTags.map((value, key) => {
								return (<span key={key} className="badge badge-secondary mr-1">{value} <button type="button" value={value} onClick={props.onRemoveTagClick}>x</button></span>);
							})}
						</h5>
					</div>
					<div className="col-sm-1">
						<button className="btn btn-primary">Ajouter</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default TagsInput;