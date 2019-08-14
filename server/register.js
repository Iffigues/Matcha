const TokenGenerator = require('uuid-token-generator');
const sendmail = require('sendmail')();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Validateur = require("./validateur.js");
const express = require('express');
const  router = express.Router();
const con = require('./dt.js');
const gender = require('./profile/genre.js');
const pref = require('./profile/pref.js');

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
	if (!data.sexe)
		return({i:0, res: "invalide sexe"});
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
	user.sexe = tab.sexe;
	user.gender = tab.gender;
	user.pref = tab.pref;
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
	b.sexe = req.body.sexe;
	b.gender = req.body.gender;
	b.pref = req.body.pref;
	return (b);
}

function errno(err) {
	let b = {};
	b.code = 0;
	if (err.errno == 1062) {
		b.code = 1;
		b.mess =  "le "+err.sqlMessage.split("'")[3]+" "+err.sqlMessage.split("'")[1]+" existent deja";	
	}
	return b;
}

router.post("/", function (req, res) {
	i = table(req);
	bcrypt.hash(i.pwd, saltRounds, function(err, hash) {
		let r = user(i, hash);
		let y  = r.res;
		if (r.i) {
		con.connect(function(err) {
			const f = `INSERT INTO user (firstname, lastname, password, email, username) VALUES (?, ?, ?, ?, ?)`;
			con.query(f, [y.firstname, y.lastname, y.pwd,y.email, y.login], function (err, result, fields) {
				if (result && !err) {
					const lol = `INSERT INTO verif (userId, tok) VALUES (?, ?)`;
					const id = result.insertId;
					con.query(gender(0,1, y.pref), [id, r.sexe], function (err, res,fi) {
						if (err) throw err;
					});
					con.query(gender(1, 1, y.gender), [id, r.sexe], function (err, res, fi) {
						if (err) throw err;
					})
					con.query(lol, [id, y.token], function (err, results, field) {
						sendmai(y.token, id);
					});
					con.query(`iNSERT INTO user_geo (userId,lat,lon) VALUES (?,0,0)`, [id],function (err, res) {
						if (err) throw err;
					});
					res.status(200).send(JSON.stringify("good job"));
				}	else {
					res.status(400).send(JSON.stringify(errno(err)));
				}
			});
		});
		} else {
			res.status(400).send(JSON.stringify(r.res));
		}
	});

});

module.exports = router;
