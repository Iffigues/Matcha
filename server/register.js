const TokenGenerator = require('uuid-token-generator');
const sendmail = require('sendmail')();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Validateur = require("./validateur.js");
const express = require('express');
const  router = express.Router();
const con = require('./dt.js');

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
	user.gender = 1;
	return verif(user);
}

function sendmai(token, username){
	sendmail({
		from: 'no-reply@yourdomain.com',
		to: 'iffigues@vivaldi.net',
		subject: 'test sendmail',
		html: "<html><head></head><body><a href=\"http://gopiko.fr:8080/validate/"+username+"/"+token+"\">https://gopiko.fr:8080/validate/"+username+"/"+token+"</a></body></html>",
	}, function(err, reply) {
	});
}

function table(req) {
	let b = {};
	b.login = req.body.username;
	b.pwd = req.body.password;
	b.email = req.body.email;
	b.firstname = req.body.firstname;
	b.lastname = req.body.lastname;
	b.gender = req.body.gender;
	return (b);
}

router.post("/", function (req, res) {
	i = table(req);
	bcrypt.hash(i.pwd, saltRounds, function(err, hash) {
		let r = user(i, hash);
		let y  = r.res;
		con.connect(function(err) {
			const f = `INSERT INTO user (firstname, lastname, password, email, username, gender) VALUES (?, ?, ?, ?, ?, ?)`;
			con.query(f, [y.firstname, y.lastname, y.pwd,y.email, y.login, y.gender], function (err, result, fields) {
				if (result && !err) {
					const lol = `INSERT INTO verif (userId, tok) VALUES (?, ?)`;
					const id = result.insertId;
					console.log(id);
					con.query(lol, [id, y.token], function (err, results, field) {
						sendmai(y.token, id);
					});
				}
			});
		});
	});

});

module.exports = router;
