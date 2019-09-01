import React from 'react';
import './Flash.css';

function Flash(props) {
  	let type;
  	let message;

	if (props.errors && props.errors.length > 0) {
		type = "danger";
		message = props.errors;
	} else if (props.notices && props.notices.length > 0) {
		type = "success";
		message = props.notices;
	} else
		return (null);

	return (
		<div className={"alert my-3 alert-" + type}>
			{message.map((value, key) => {
				return <li key={key}>{value}</li> 
			})}
		</div>
	);
}

export default Flash;