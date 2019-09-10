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

function makeMail(token, id, email, host,i) {
	let c = "<html><head></head><body><a href=\""+i+"/login/recover/"+token+"/"+id+"\">reset your password</a></body></html>";
}

function sendmai(token, username, email, host) {
	let i = 'http://'+host+"/";
	mail(email, "Réinitialisation du mot de passe", makeMail(token, id, host,i));
}

router.post("/recover", function(req, res) {
	let f = `INSERT INTO recover (userId, tok) VALUES ((SELECT id FROM user WHERE email = ? AND active = 1),?) ON DUPLICATE KEY UPDATE   userId= (SELECT id FROM user WHERE email = ? AND active = 1)`;
	let g = `SELECT id FROM user WHERE email = ?`
		if (!req.body.email) {
			return res.status(400).send(JSON.stringify({code:0, msg:'Envoyer un email'}));
		}
	let email = req.body.email.trim();
	let valida = new validate();
	if (!valida.isEmail(email))
		return res.status(400).send("bad email");
	bcrypt.hash(pass, saltRounds, function(err, hash) {
		if (err) {
			res.satus(500).send(JSON.stringify({code:1,msg:"internal error"}));
		} else {
			require('crypto').randomBytes(48, function(err, buffer) {
				let token = buffer.toString('hex');
				con.connect(function (err) {
					con.query(g,[email],function(err, rst) {
						if (rst && rst.lenght > 0) {
							let id = rst[0].id;
							con.query(f,[email, token], function(err, result, field) {
								if (!err) {
									sendmai(tok, id, email, req.headers.host);
									res.status(200).send(JSON.stringify({code:0, msg:"Un message viens de vous etre envoyer"}));
								}else {
									res.status(404).send(JSON.stringify({code:1, msg:"Une erreur est survenue"}))
								}
							});
						}
					})
				});
				)}
		}
	});
});

router.get("/recover/:toki/:id", function(req, res) {
	let ff = `SELECT * FROM recover WHERE token = ? AND id = ?`;
	let tok = req.params.toki;
	let id = req.params.id
		con.connect(function(err) {
			con.query(f, [tok, id], function (err, rst, fields) {
				if (rst && rst.length > 0) {
					res.redirect(":3000/");
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
