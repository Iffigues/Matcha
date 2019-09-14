import React from 'react';

function AdminReports(props) {
	return (
		<div className="AdminReports">
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
						if (report.reporter && report.reported) {
							return (
								<tr key={key}>
									<th scope="row">{key}</th>
									<td>{report.reporter.firstname} {report.reporter.lastname} - {report.reporter.username}</td>
									<td>{report.reported.firstname} {report.reported.lastname} - {report.reported.username}</td>
									<td>{date}</td>
								</tr>
							);
						} else {
							return <tr key={key}></tr>
						}
					})}
				</tbody>
			</table>
		</div>
	);
}

export default AdminReports;
