import React from 'react';
import Flash from '../flash';
import './Admin.css';

function Admin(props) {
	return (
		<div className="Admin">
			<div className="container">
				<h2 className="my-4">Administration</h2>
				<Flash errors={props.errors}/>
				<Flash notices={props.notices}/>
			</div>
		</div>
	);
}

export default Admin;
