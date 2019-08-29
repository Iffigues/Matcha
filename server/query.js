const bcrypt = require('bcrypt');
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

function sendmai(token, username){
	sendmail({
		from: 'no-reply@yourdomain.com',
		to: 'iffigues@vivaldi.net',
		subject: 'test sendmail',
		html: "<html><head></head><body><a href=\"http://gopiko.fr:8080/login/recover/"+token+"\">password="+username+"</a></body></html>",
	}, function(err, reply) {
	});
}


router.post("/recover", function(req, res) {
	let f = `INSERT INTO recover (userId, tok, password) VALUES ((SELECT id FROM user WHERE email = ? AND active = 1),?,?)`;
	let y = `UPDATE recover SET tok = ? , password = ? WHERE userId = (SELECT id FROM user WHERE email = ?)`;
	let email = req.body.email.trim();
	let tok = randomToken(16);
	let valida = new validate();
	if (!valida.isEmail(email))
		return res.status(400).send("bad email");
	let pass = faker.fake("{{internet.password}}");
	con.connect(function(err) {
		console.log(err);
		if (err) 
			return res.status(500).send(JSON.stringify({code:1,msg: "internals error"}));
		bcrypt.hash(pass, saltRounds, function(err, hash) {
			if (err) 
				return res.satus(500).send(JSON.stringify({code:1,msg:"internal error"}));
			con.query(f,[email, tok, hash], function(err, result, field) {
				if (!err) 
					sendmai(tok, pass);
				else 
					con.query(y, [tok,hash,email], function (err, result) {sendmai(tok, pass);});
				res.status(200).send(JSON.stringify({code:0, msg:"un email viens de vous être envoye"}));
			});
		});
	});
});

router.get("/recover/:toki", function(req, res) {
	let ff = `UPDATE user SET password = (SELECT password FROM recover WHERE tok = ?) WHERE id = (SELECT userId FROM recover WHERE tok = ?)`;
	let f = ` UPDATE user b, recover p SET b.password = p.password WHERE p.tok = ?`;
	let tok = req.params.toki;
	console.log(tok);
	con.connect(function(err) {
		con.query(f, [tok], function (err, res, fields) {
			console.log(res);
			console.log(err);
			if (res.affectedRows == 1) {
				con.query(`DELETE FROM recover WHERE tok = ?`,[tok], function(err, res){
					console.log(err);
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
	/*try {
		let haha = req.body;
	} catch (e){
		return res.status(400).send(JSON.stringify({code:1, msg:"mauvais json"}));
	}*/
	con.connect(function (err) {
		if (!req.body.password || !req.body.username) {
			return res.status(400).send(JSON.stringify({code:0, msg:"un des champs est vide"}));
		}
		let pwd = req.body.password;
		let email = req.body.username.trim();
		if(!ver(email)) {
			res.status(200).send(JSON.stringify({code: 1, msg:"bad username"}));
		}
		var sql = `SELECT * FROM user WHERE user.username = ? LIMIT 1`;
		con.query(sql, [email] ,function (err, result, fields) {
			if (err) throw err;
			let rr = result[0];
			console.log(rr);
			if (!rr || !rr.active) {
				res.status(404).send(JSON.stringify({code:2, msg:"l utilisateur n a pas accepter le compte ou n existe pas"}));
				return ;
			}
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
