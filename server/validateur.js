class Validate {
	constructor() {
		this.name = /^[a-z ,.'-]+$/i;
		this.email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		this.password = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;
		this.username = /^(?!.*__.*)(?!.*\.\..*)[a-z0-9_.]+$/;
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
