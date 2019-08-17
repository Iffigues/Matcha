const email = require("./profile/email.js");
const password = require("./profile/password.js");
const username = require("./profile/username.js");
const lastname = require("./profile/lastname.js");
const firstname = require("./profile/firstname.js");
const sexe = require("./profile/sexe.js");
const pref = require("./profile/pref.js");
const lng = require("./profile/lng.js");
const lat = require("./profile/lat.js");
const bio = require("./profile/bio.js");

function funcP() {
	let b = {};
	b.lng = lng;
	b.lat = lat;
	b.sexe = ssexe;
	b.pref = pref;
	b.bio = b.bio;
	b.email = email;
	b.username = username;
	b.firstname = firstname;
	b.lastname = lastname;
	b.password = password;
	return (b);
}

module.exports = funcP;
