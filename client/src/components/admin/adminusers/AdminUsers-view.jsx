import React from 'react';
import Flash from '../../flash';

function AdminUsers(props) {
	return (
		<div className="AdminUsers">
			<div className="form-group row m-3">
				<div className="col-sm-3">
					<input name="user" autoComplete="off" className="form-control"
							placeholder="Recherche" onChange={props.onUserChange} required/>
				</div>
			</div>
			<table className="table table-sm">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Id</th>
						<th scope="col">Utilisateurs</th>
						<th scope="col">Nom</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				<tbody>
					{props.users.map((user, key) => {
						return (
							<tr key={key}>
								<th scope="row">{key}</th>
								<td>{user.id}</td>
								<td>{user.username}</td>
								<td>{user.firstname} {user.lastname}</td>
								<td>
									<div className="btn-group" role="group">
										<button	className="btn btn-sm btn-primary"
												type="button" value={user.id}
												onClick={props.onEditUserClick}
										>Modifier</button>
										<button	className="btn btn-sm btn-danger"
												type="button" value={user.id}
												onClick={props.onRemoveUserClick}
										>Suppprimer</button>
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default AdminUsers;
