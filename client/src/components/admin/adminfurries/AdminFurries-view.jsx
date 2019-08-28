import React from 'react';
import Flash from '../../flash';

function AdminFurries(props) {
	return (
		<div className="AdminFurries">
			<Flash errors={props.errors}/>
			<Flash notices={props.notices}/>
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
						<th scope="col">Furries</th>
						<th scope="col">Utilisations</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				<tbody>
					{props.furries.map((furry, key) => {
						return (
							<tr key={key}>
								<th scope="row">{key}</th>
								<td>{furry.name}</td>
								<td>{furry.nbr}</td>
								<td><button	className="btn btn-sm btn-danger"
											type="button" value={furry.name}
											onClick={props.onRemoveFurryClick}
									>Suppprimer</button></td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default AdminFurries;
