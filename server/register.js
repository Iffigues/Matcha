const TokenGenerator = require('uuid-token-generator');
const sendmail = require('sendmail')();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Validateur = require("./validateur.js");

const googleMapsClient = require('@google/maps').createClient({
	key: 'your API key here'
});

function verif(data) {
	let valid = new Validateur();
	if (!valid.isName(data.firstname+" "+data.lastname))
		return ({i:0, res:"invalide  firstname or lastname"});
	if (!valid.isEmail(data.email))
		return ({i:0, res: "invalide email"});
	if (!valid.isPwd(data.pwd))
		return ({i:0, res: "invalide password"});
	if (!valid.isLogin(data.login))
		return ({i:0, res: "invalide username"});
	return ({i:1,res:data});
}

function user(tab, hash) {
	let user = {};
	const token = new TokenGenerator();
	user.login = tab.login;
	user.lastname = tab.lastname;
	user.firstname = tab.firstname;
	user.pwd = hash;
	user.email = tab.email;
	user.active = 0;
	user.token = token.generate();
	return verif(user);
}

function sendmai(token, username){
	sendmail({
		from: 'no-reply@yourdomain.com',
		to: 'iffigues@vivaldi.net',
		subject: 'test sendmail',
		html: "<html><head></head><body><a href=\"http://gopiko.fr:8080/validate/"+username+"/"+token+"\">https://gopiko.fr:3000/?token="+token+"</a></body></html>",
	}, function(err, reply) {
		console.log(err && err.stack);
		console.dir(reply);
	});
}

function register(db, tab, res, client) {
	let b = 202;
	let r = {};
	bcrypt.hash(tab.pwd, saltRounds, (err, hash) => {
		r = user(tab, hash);
		const collection = db.collection('user');
		if (!r.i) {
			b = 404;
		}
		if (r.i)
			collection.findOne({$or:[{login: r.res.login}, {email: r.res.email}]}, function(err, docs){
				if (!docs) {
					collection.insertOne(r.res, function(err, rest) {
						sendmai(r.res.token, r.res.login);
					});
				}
			});
	});
	res.writeHeader(b,{"Content-Type":"application/json"});
	res.end(JSON.stringify(r.res));
}

module.exports.register = register;
