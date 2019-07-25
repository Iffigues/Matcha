class Validate {
	constructor() {
		this.name = /^[a-z ,.'-]+$/i;
		this.email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		this.password = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;
		this.username = /^(?!.*__.*)(?!.*\.\..*)[a-z0-9_.]+$/;
	}
	isEmpty(value) {
		return (
			value === undefined ||
			value === null ||
			(typeof value === 'object' && Object.keys(value).length === 0) ||
			(typeof value === 'string' && value.trim().length === 0)
		);
	}
	isName (name) {
		return(this.name.test(name));
	}
	isEmail (email) {
		return (this.email.test(email));
	}
	isPwd (pwd) {
		return (this.password.test(pwd));
	}
	isLogin (login) {
		return (this.username.test(login));
	}
}

module.exports = Validate;
