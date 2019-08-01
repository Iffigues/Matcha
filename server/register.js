const TokenGenerator = require('uuid-token-generator');
const sendmail = require('sendmail')();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Validateur = require("./validateur.js");
const express = require('express');
const  router = express.Router();
const con = require('./dt.js');

router.use(function timeLog(req, res, next) {
	  console.log('Time: ', Date.now());
	  next();
});

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

function table(req) {
	let b = {};
	b.user = req.body.username;
	b.pwd = req.body.password;
	b.email = req.body.email;
	b.firstname = req.body.firstname;
	b.lastname = req.body.lastname;
	b.gender = req.body.gender;
	return (b);
}

router.post("/", function login(req, res) {
	i = table(req);
	bcrypt.hash(i.pwd, saltRounds, function(err, hash) {
		con.connect(function(err) {
			const f = `
				
			`;
			con.query(sql, function (err, result) {
			});
		});
	});

});

module.exports = router;
