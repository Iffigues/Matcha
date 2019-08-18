import React from 'react';
import Flash from '../flash';

function Journal(props) {
	return (
		<div className="Journal">
			<div className="container">
				<h2 className="mt-2">Journal</h2>
				<Flash errors={props.errors}/>
				<Flash notices={props.notices}/>
			</div>
		</div>
		);
}

export default Journal;