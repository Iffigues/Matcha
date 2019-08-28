import React from 'react';
import AdminReports from './AdminReports-view.jsx';

class AdminReportsContainer extends React.Component {

	constructor() {
		super();
		this.state = {
			reports: []
		}
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		const token = localStorage.getItem('token');
		fetch('http://gopiko.fr:8080/adm/report', {
			method: 'GET',
			headers: {
				'x-access-token': token,
				Accept: 'application/json'
			}
		})
		.then(response => {
			if (response) {
				response.json().then(data => {
					if (data.code === 0) {
 						console.log("all reports");
 						console.log(data);
 						this.setState({reports: data.reports});
		 			}
				}).catch(error => {
					console.log('Il y a eu un problème avec la lecture de la réponse');
				});
			} else
				throw Error('Pas de réponse');
		}).catch(error => {
			console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message);
		});
	}
	
	render() {
		return <AdminReports
				reports={this.state.reports}
			/>;
	}

}

export default AdminReportsContainer;
