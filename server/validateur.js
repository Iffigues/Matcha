class Validate {
	constructor() {
		this.name = /^[a-z ,.'-]+$/i;
		this.email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		this.password = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;
		this.username = /^(?!.*__.*)(?!.*\.\..*)[a-z0-9A-Z_.]+$/;
	}
	hasUp(str) {
		return (/[A-Z]/.test(str));
	}
	hasLo (str) {
		return (/[a-z]/.test(str));
	}
	spec (str) {
		return !/.*[!A-Za-z0-9]+.*/.test(str)
	}
	hasLowerCase(str) {
		return (/[0-9]/.test(str));
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
	if (name.length === 0 || !this.isEmpty(name))
	    return false;
	    if (!/[A-Za-z0-9αßÁáÀàÅåÄäÆæÇçÉéÈèÊêÍíÌìÎîÑñÓóÒòÔôÖöØøÚúÙùÜüŽž]+/.test(name))
	    return false;
	return true
		return(this.name.test(name));
	}
	isEmail (email) {
		if (!this.isEmpty(email))
			return false;
		return (this.email.test(email));
	}
	isPwd (pwd) {
		if (pwd.length < 8 || !this.isEmpty(pwd))	
			return false;
		if (!this.hasUp(pwd) || !this.hasLo(pwd) || !this.hasLowerCase(pwd) || this.spec(pwd))
			return false;
		return true;
		return (this.password.test(pwd));
	}
    isLogin (login) {
	    if(!this.isEmpty(login))
		    return false;
	if (!/[A-Za-z0-9αßÁáÀàÅåÄäÆæÇçÉéÈèÊêÍíÌìÎîÑñÓóÒòÔôÖöØøÚúÙùÜüŽž]+/.test(login))
	    return false;
	return true;
		return (this.username.test(login));
	}
}

module.exports = Validate;
