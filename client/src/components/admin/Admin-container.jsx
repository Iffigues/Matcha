import React from 'react';
import Admin from './Admin-view.jsx';

class AdminContainer extends React.Component {

	constructor() {
		super();
		this.state = {
		}
	}

	render() {
		return <Admin addFlash={this.props.addFlash}/>;
	}

}

export default AdminContainer;
