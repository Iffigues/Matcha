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
						<th scope="col">Rapporteur</th>
						<th scope="col">Signalé</th>
						<th scope="col">Date</th>
					</tr>
				</thead>
				<tbody>
					{props.reports.map((report, key) => {
						const date = new Date(report.date).toLocaleString('fr-FR');
						return (
							<tr key={key}>
								<th scope="row">{key}</th>
								<td>{report.userId}</td>
								<td>{report.who}</td>
								<td>{date}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default AdminReports;
