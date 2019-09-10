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

function makeMail(token, id, email) {
	let c = "<html><head></head><body><a href=\"http://gopiko.fr:8080/login/recover/"+token+"/"+id+"\">reset your password</a></body></html>";
}

function sendmai(token, id, email) {
	mail(token, id , makeMail());/
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
									sendmai(tok, id, email);
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
	let ff = `SELECT * FROM recover WHERE token = ? AND userId = ?`;
	let tok = req.params.toki;
	let id = req.params.id
	con.connect(function(err) {
		con.query(f, [tok, id], function (err, rst, fields) {
			if (rst && rst.length > 0) {
				res.redirect(":3000/recover/"+tok+'/'+id);
			}
		});
	});
});

router.post("/recover/:tok/:id" , function (req, res){
	let f = `DELETE FROM recover WHERE id = ? AND token =?`;
	let g = `UPDATE user SET password = ? WHERE id = ?`;
	let tok = req.params.tok;
	let id = req.params.id;
	let pwd = req.body.password;
	let valid = new validate();
	if (!valid.isPwd(pwd)) {
	}
	con.connect(function(err) {
		con.query(f, [id, tok], function (err, rst) {
			if (rst && rst.affectedRows) {
				con.query(g,[pwd, id], function (err, rlt) {
				
				})
			}
		})
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
			return res.status(400).send(JSON.stringify({code:0, msg:"un des champs est vide"}));
		let pwd = req.body.password;
		let email = req.body.username.trim();
		if(!ver(email)) {
			return res.status(200).send(JSON.stringify({code: 1, msg:"bad username"}));
		}
		var sql = `SELECT * FROM user WHERE user.username = ? LIMIT 1`;
		con.query(sql, [email] ,function (err, result, fields) {
			if (err) throw err;
			let rr = result[0];
			if (!rr || !rr.active)
				return res.status(404).send(JSON.stringify({code:2, msg:"l utilisateur n a pas accepter le compte ou n existe pas"}));
			if (rr && rr.active) {
				bcrypt.compare(pwd, rr.password, (err, ress) => {
					if (err) throw err;
					if (ress === true) {
						let toke = new tok();
						rr.date = Date.now();
						const payload = { rr };
						const token = jwt.sign(payload, 'my-secret', {
							expiresIn: 1000000
						});
						res.cookie('token', token, { httpOnly: true }).status(200).send(JSON.stringify({code:0, msg:"vous êtes connecte",token:token}));
					} else {
						res.status(404).send(JSON.stringify({code:2,msg:"bad password"}));
					}
				})

			}else{
				res.status(404).send(JSON.stringify({err:3,msg:"not found"}));
			}
		});
	});
});

router.get("/logout", mid, function(req, res){
	const payload = {rr:"forbidden"};
	const token = jwt.sign(payload, 'my-secret', {
		expiresIn: 0
	});
	res.cookie('token', token, { httpOnly: true }).status(200).send(JSON.stringify({code:0, msg:"vous êtes connecte",token:token}))
});

module.exports = router;
