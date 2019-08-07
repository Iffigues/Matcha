const email = require("./profile/email.js");
const genre = require("./profile/fgenre.js");
const pref = require("./profile/fpref.js");
const password = require("./profile/password.js");
const username = require("./profile/username.js");
const lastname = require("./profile/lastname.js");
const firstname = require("./profile/firstname.js");

function funcP() {
	let b = {};
	b.genre = genre;
	b.pref = pref;
	b.email = email;
	b.username = username;
	b.firstname = firstname;
	b.lastname = lastname;
	b.password = password;
	return (b);
}
