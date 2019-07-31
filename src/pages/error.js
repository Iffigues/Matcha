import React, { Component } from 'react';
import injectSheet from 'react-jss';
import InputForm from '../components/InputForm';


class ErrorMess extends Component<Props, State> {
	render() {
		return (
			<div>	
			            <p>{this.props.error}</p>
			</div>
		)
	}
}

const styles = {
};

export default injectSheet(styles)(ErrorMess);
