const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const tok = require('./tok');
const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
const mid = require("./middleware.js");
const faker = require('faker');
const randomToken = require('random-token');
const sendmail = require('sendmail')();
const validate = require("./validateur.js");
const mail = require("./mail.js");

function sendmai(token, username, email, host) {
	let i = 'http://'+host+"/";
	mail(email, "Réinitialisation du mot de passe", "<html><head></head><body><a href=\""+i+"login/recover/"+token+"\">password="+username+"</a></body></html>");
}

router.post("/recover", function(req, res) {
	let f = `INSERT INTO recover (userId, tok, password) VALUES ((SELECT id FROM user WHERE email = ? AND active = 1),?,?)`;
	let y = `UPDATE recover SET tok = ? , password = ? WHERE userId = (SELECT id FROM user WHERE email = ?)`;
	if (!req.body.email) {
		return res.status(400).send(JSON.stringify({code:0, msg:'Envoyer un email'}));
	}
	let email = req.body.email.trim();
	let tok = randomToken(16);
	let valida = new validate();
	if (!valida.isEmail(email))
		return res.status(400).send("L'adresse email est incorrecte");
	let pass = faker.fake("{{internet.password}}");
	bcrypt.hash(pass, saltRounds, function(err, hash) {
		if (err) {
			res.satus(500).send(JSON.stringify({code:1,msg:"Un problème interne est survenu"}));
		} else {
			con.connect(function (err) {
			con.query(f,[email, tok, hash], function(err, result, field) {
				if (!err) 
					sendmai(tok, pass, email, req.headers.host);
				else 
					con.query(y, [tok,hash,email], function (err, result) {sendmai(tok, pass, email);});
				res.status(200).send(JSON.stringify({code:0, msg:"Un email vient de vous être envoyé"}));
			});
			});
		}
	});
});

router.get("/recover/:toki", function(req, res) {
	let ff = `UPDATE user SET password = (SELECT password FROM recover WHERE tok = ?) WHERE id = (SELECT userId FROM recover WHERE tok = ?)`;
	let f = ` UPDATE user b, recover p SET b.password = p.password WHERE p.tok = ?`;
	let tok = req.params.toki;
	con.connect(function(err) {
		con.query(f, [tok], function (err, res, fields) {
			if (res.affectedRows == 1) {
				con.query(`DELETE FROM recover WHERE tok = ?`,[tok], function(err, res){
				})
			}
		});
	});
});

function ver(a){
	let valid = new validate();
	if (!valid.isLogin(a))
		return (0);
	return (1);
}

router.post("/", function (req, res) {
	con.connect(function (err) {
		if (!req.body.password || !req.body.username)
			return res.status(400).send(JSON.stringify({code:0, msg:"Un des champs est vide"}));
		let pwd = req.body.password;
		let email = req.body.username.trim();
		if(!ver(email)) {
			return res.status(200).send(JSON.stringify({code: 1, msg:"Le nom d'utilisateur est incorrecte"}));
		}
		var sql = `SELECT * FROM user WHERE user.username = ? LIMIT 1`;
		con.query(sql, [email] ,function (err, result, fields) {
			if (err || !result || result.length == 0) 
				return res.status(404).send(JSON.stringify({code:2, msg:"le compte n'existe pas"}))
			let rr = result[0];
			if (!rr || !rr.active)
				return res.status(404).send(JSON.stringify({code:2, msg:"Ce compte n'est pas activé ou n'existe pas"}));
			if (rr.active) {
				bcrypt.compare(pwd, rr.password, (err, ress) => {
					if (ress === true) {
						let toke = new tok();
						rr.date = Date.now();
						const payload = { rr };
						const token = jwt.sign(payload, 'my-secret', {
							expiresIn: 1000000
						});
						res.cookie('token', token, { httpOnly: true }).status(200).send(JSON.stringify({code:0, msg:"Vous êtes connecté",token:token}));
					} else {
						res.status(404).send(JSON.stringify({code:2,msg:"Le mot de passe est incorrect"}));
					}
				})

			}else{
				res.status(404).send(JSON.stringify({err:3,msg:"L'utilisateur est introuvable"}));
			}
		});
	});
});

router.get("/logout", mid, function(req, res){
	const payload = {rr:"forbidden"};
	const token = jwt.sign(payload, 'my-secret', {
		expiresIn: 0
	});
	res.cookie('token', token, { httpOnly: true }).status(200).send(JSON.stringify({code:0, msg:"Vous êtes connecté",token:token}))
});

module.exports = router;
