const TokenGenerator = require('uuid-token-generator');
const sendmail = require('sendmail')();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const Validateur = require("./validateur.js");
const express = require('express');
const  router = express.Router();
const con = require('./dt.js');
const mail = require('./mail.js');

function verif(data) {
	let valid = new Validateur();
	if (!valid.isName(data.firstname+" "+data.lastname)) {
		return ({code:1, msg:"Le non ou le prénom est invalide"});
	} else {
		data.firstname = data.firstname.trim();
		data.lastname = data.lastname.trim();
	}

	if (!valid.isEmail(data.email)) {
		return ({code:1, msg: "L'adresse email est invalide"});
	} else {
		data.email = data.email.trim();
	}
	if (!valid.isPwd(data.pwd)) {
		return ({code:1, msg: "Le mot de passe est invalide"});
	} 
	if (!valid.isLogin(data.login)) {
		return ({code:1, msg: "Le nom d'utilisateur est invalide"});
	} else {
		data.login = data.login.trim();
	}
	if (!data.sexe)
		return({code:1, msg: "Le genre est invalide"});
	return ({code:0,msg:data});
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

function sendmai(token, username, email, host){
	let i = 'http://'+host+"/";
	mail(email, 'Création du compte', "<html><head></head><body><a href=\""+i+"validate/"+username+"/"+token+"\">http://gopiko.fr:8080/validate/"+username+"/"+token+"</a></body></html>");
}

function table(req) {
	let b = {};
	b.login = req.body.username.trim();
	b.pwd = req.body.password.trim();
	b.email = req.body.email.trim();
	b.firstname = req.body.firstname.trim();
	b.lastname = req.body.lastname.trim();
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
		b.msg =  "Le "+err.sqlMessage.split("'")[3]+" "+err.sqlMessage.split("'")[1]+" existe déjà";	
	}
	return b;
}

router.post("/", function (req, res) {
	i = table(req);
	bcrypt.hash(i.pwd, saltRounds, function(err, hash) {
		console.log(err);
		let r = user(i, hash);
		let y  = r.msg;
		if (!r.code) {
		con.connect(function(err) {
			const f = `INSERT INTO user (firstname, lastname, password, email, username, sexe) VALUES (?, ?, ?, ?, ?, ?)`;
			con.query(f, [y.firstname, y.lastname, y.pwd,y.email, y.login, y.sexe], function (err, result, fields) {
				if (result && !err) {
					const lol = `INSERT INTO verif (userId, tok) VALUES (?, ?)`;
					const id = result.insertId;
					con.query(lol, [id, y.token], function (err, results, field) {
						sendmai(y.token, id, y.email, req.headers.host);
					});
					res.status(200).send(JSON.stringify({code:0, msg:"Le compte vient d'être créé, un email de confirmation vient de vous être envoyé"}));
				}	else {
					res.status(400).send(JSON.stringify(err));
				}
			});
		});
		} else {
			res.status(400).send(JSON.stringify(r.res));
		}
	});

});

module.exports = router;
