import React from 'react';
import Flash from '../flash';

function Search(props) {
  return (
    <div className="Search">
    	<div className="container">
		    <h2 className="mt-2">Search</h2>
		    <Flash errors={props.errors}/>
		    <Flash notices={props.notices}/>
	    	
		</div>
    </div>
  );
}

export default Search;