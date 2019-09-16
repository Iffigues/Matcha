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

function makeMail(token, id, email, host,i,name) {
	//let c = "<html><head></head><body><a href=\""+i+"/login/recover/"+token+"/"+id+"\">reset your password</a></body></html>";
	let c = `
	<html>
	<body>
	<p>Hello ${name},</p>
	<p>Nous avons reçu une demande de réinitialisation du mot de passe associé à ton compte Matcha ${email} sur matcha. Si tu en es bien l'auteur, clique sur le lien ci-dessous :</p>
	<a href="http://localhost:8080/login/recover/${token}/${id}"><button style:"background-color:#00CC00;">Reinitialiser</button></a>
	<p>Si tu n'as pas demandé la réinitialisation de ton mot de passe, tu peux simplement ignorer cet e-mail. Sois rassuré, ton compte reste sécurisé.</p>
	<p>Merci de faire confiance à Matcha !</p>
	<p>L'équipe Matcha</p>
	</body>
	</html>
	`;
	return c;
}

function sendmai(token,id, email, host, name) {
	let i = 'http://'+host;
	let r = makeMail(token, id, email,host,i, name)
		mail(email, "Réinitialisation du mot de passe", r);
}

router.post("/recover", function(req, res) {
	let f = `REPLACE INTO recover SET tok = ? , userId = ?`;
	if (!req.body.email) {
		return res.status(400).send(JSON.stringify({code:0, msg:'Envoyer un email'}));
	}
	let email = req.body.email.trim();
	let valida = new validate();
	if (!valida.isEmail(email))
		return res.status(400).send("bad email");
	require('crypto').randomBytes(48, function(err, buffer) {
		let token = buffer.toString('hex');
		con.connect(function (err) {
			con.query('SELECT id, username FROM user WHERE email = ?',email, function (err, resl) {
				if (!err && resl && resl.length) {
					let id = resl[0].id;
					let names = resl[0].username;
					con.query(f,[token, id], function(err, result, field) {
						if (!err) {
							sendmai(token, id, email, req.headers.host, names);
							res.status(200).send(JSON.stringify({code:0, msg:"Un message viens de vous etre envoyer"}));
						}else {
							res.status(404).send(JSON.stringify({code:1, msg:"Une erreur est survenue"}))
						}
					});
				} else {
					res.status(400).send(JSON.stringify({code:5, msg:'l utilisateur n existe pas'}));
				}
			});
		})
	});
});


router.get("/recover/:toki/:id", function(req, res) {
	let f = `SELECT * FROM recover WHERE tok = ? AND userId = ?`;
	let tok = req.params.toki;
	let id = req.params.id;
	con.connect(function(err) {
		con.query(f, [tok, id], function (err, rst, fields) {
			if (rst && rst.length > 0) {
				return res.redirect("http://localhost:3000/reinitialize/"+tok+'/'+id);
			} else {
				res.redirect("http://localhost:3000/reinitialize");
			}
		});
	});
});

router.post("/recover/:tok/:id" , function (req, res){
	let f = `DELETE FROM recover WHERE userId = ? AND tok =?`;
	let g = `UPDATE user SET password = ? WHERE id = ?`;
	let tok = req.params.tok;
	let id = req.params.id;
	let pwd = req.body.password;
	let valid = new validate();
	if (!valid.isPwd(pwd)) {
		return res.status(400).send(JSON.stringify({code:1, msg:"verifier votre ;ot de passe"}))
	}
	con.connect(function(err) {
		con.query(f, [id, tok], function (err, rst) {
			if (rst && rst.affectedRows) {
				bcrypt.hash(pwd, 10, function(err, hash) {
				con.query(g,[hash, id], function (err, rlt) {
					return res.status(200).send(JSON.stringify({code:0, msg:'mot de passe changer'}));
				})
				});
			} else {
				res.status(400).send(JSON.stringify({code:4, msg:"verifier vote mot de passe"}));
			}
		});
	});
})

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
