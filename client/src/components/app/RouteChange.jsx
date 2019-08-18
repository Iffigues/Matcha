import React from 'react';
import { withRouter } from 'react-router';

class RouteChange extends React.Component {

	componentDidMount () {
		this.routeChanged();
	}

	componentDidUpdate (prevProps) {
		let { location: { pathname } } = this.props;

		if (prevProps.location.pathname === pathname) return ;
		this.routeChanged();
	}

	routeChanged () {
		let { location, push, replace, actions } = this.props;

		actions.forEach(action => {
			action(location, { push, replace });
		});
	}

	render () {
		return null;
	}
}

export default withRouter(RouteChange);