import React from 'react';
import Flash from '../../flash';

function AdminReports(props) {
	return (
		<div className="AdminReports">
			<Flash errors={props.errors}/>
			<Flash notices={props.notices}/>
			<table className="table table-sm">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Signalements</th>
						<th scope="col">Date</th>
					</tr>
				</thead>
				<tbody>
					{props.reports.map((value, key) => {
						return (
							<tr key={key}>
								<th scope="row">{key}</th>
								<td>{value}</td>
								<td>{value}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default AdminReports;
