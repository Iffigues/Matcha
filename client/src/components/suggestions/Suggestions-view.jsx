import React from 'react';
import Flash from '../flash';

function Suggestions(props) {
  return (
    <div className="Suggestions">
    	<div className="container">
		    <h2 className="mt-2">Suggestions</h2>
		    <Flash errors={props.errors}/>
		    <Flash notices={props.notices}/>
	    	
		</div>
    </div>
  );
}

export default Suggestions;