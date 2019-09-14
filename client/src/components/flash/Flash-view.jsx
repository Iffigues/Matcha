import React from 'react';
import './Flash.css';

function Flash(props) {
  	const notices = [];
  	const errors = [];

	props.flashes.forEach(flash => {
		if (flash.type === "notice") {
			notices.push(flash);
		} else if (flash.type === "error") {
			errors.push(flash);
		}
	});

	return (
		<div className="Flash">
			{ notices.length
				?	<div className="alert my-3 alert-success" role="alert">
						<button type="button" className="close" aria-label="Close">
							<span aria-hidden="true" value="notice" onClick={props.onCloseClick}>&times;</span>
						</button>
						{notices.map((notice, key) => <li key={key}>{notice.msg}</li>)}
					</div>
				: null
			}

			{ errors.length
				?	<div className="alert my-3 alert-danger" role="alert">
						<button type="button" className="close" aria-label="Close">
							<span aria-hidden="true" value="error" onClick={props.onCloseClick}>&times;</span>
						</button>
						{errors.map((error, key) => <li key={key}>{error.msg}</li>)}
					</div>
				: null
			}



		</div>
	);
}

export default Flash;