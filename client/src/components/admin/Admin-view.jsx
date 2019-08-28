import React from 'react';
import Flash from '../flash';
import AdminUsers from './adminusers';
import AdminTags from './admintags';
import AdminFurries from './adminfurries';
import AdminReports from './adminreports';
import './Admin.css';

function Admin(props) {
	return (
		<div className="Admin">
			<div className="container">
				<h2 className="my-4">Administration</h2>
				<Flash errors={props.errors}/>
				<Flash notices={props.notices}/>
				<ul className="nav nav-tabs" id="myTab" role="tablist">
					<li className="nav-item">
						<a className="nav-link active" id="users-tab" data-toggle="tab" href="#users" role="tab" aria-controls="home" aria-selected="true">Utilisateurs</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" id="tags-tab" data-toggle="tab" href="#tags" role="tab" aria-controls="profile" aria-selected="false">Intérêts</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" id="furries-tab" data-toggle="tab" href="#furries" role="tab" aria-controls="contact" aria-selected="false">Furries</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" id="reports-tab" data-toggle="tab" href="#reports" role="tab" aria-controls="contact" aria-selected="false">Signalements</a>
					</li>
				</ul>
{/*				<Router>
					<Route path="/" component={AdminUsers}/>
					<Route path="/users" component={AdminUsers}/>
					<Route path="/tags" component={AdminTags}/>
					<Route path="/furries" component={AdminFurries}/>
					<Route path="/reports" component={AdminReports}/>
				</Router>*/}
				<div className="tab-content" id="myTabContent">
					<div className="tab-pane fade show active" id="users" role="tabpanel" aria-labelledby="home-tab">
						<AdminUsers/>
					</div>
					<div className="tab-pane fade" id="tags" role="tabpanel" aria-labelledby="profile-tab">
						<AdminTags/>
					</div>
					<div className="tab-pane fade" id="furries" role="tabpanel" aria-labelledby="contact-tab">
						<AdminFurries/>
					</div>
					<div className="tab-pane fade" id="reports" role="tabpanel" aria-labelledby="contact-tab">
						<AdminReports/>
					</div>
				</div>	

			</div>
		</div>
	);
}

export default Admin;
