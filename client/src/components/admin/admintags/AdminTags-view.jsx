import React from 'react';
import Flash from '../../flash';

function AdminTags(props) {
	return (
		<div className="AdminTags">
			<div className="form-group row m-3">
				<div className="col-sm-3">
					<input name="tag" autoComplete="off" className="form-control"
							placeholder="Recherche" onChange={props.onTagChange} required/>
				</div>
			</div>
			<table className="table table-sm">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Centres d'intérêts</th>
						<th scope="col">Utilisations</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				<tbody>
					{props.tags.map((value, key) => {
						return (
							<tr key={key}>
								<th scope="row">{key}</th>
								<td>{value.name}</td>
								<td>{value.nbr}</td>
								<td><button	className="btn btn-sm btn-danger"
											type="button" value={value.name}
											onClick={props.onRemoveTagClick}
									>Suppprimer</button></td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default AdminTags;
