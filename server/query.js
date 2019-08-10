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
	let email = req.body.email;
	let tok = randomToken(16);
	let pass = faker.fake("{{internet.password}}");
	con.connect(function(err) {
		bcrypt.hash(pass, saltRounds, function(err, hash) {
			con.query(f,[email, tok, hash], function(err, res, field) {
				if (!err) {
					sendmai(tok, pass);
				} else {
					con.query(y, [tok,hash,email], function (err, res) {
						console.log(err);
						sendmai(tok, pass);
					});
				}

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

router.post("/", function (req, res) {
	if (req.session.log) {
		return ;
	}
	con.connect(function (err) {
		let pwd = req.body.password;
		let email = req.body.email;
		var sql = `SELECT * FROM user, user_pref, user_genre WHERE user.email = ? LIMIT 1`;
		con.query(sql, [email] ,function (err, result, fields) {
			if (err) throw err;
			let rr = result[0];
			if (rr.active) {
				bcrypt.compare(pwd, rr.password, (err, ress) => {
					if (err) throw err;
					if (ress === true) {
						let toke = new tok();
						const payload = { rr };
						req.session.login['co'] = 1;
						req.session.user = rr;
						req.session.save();
						const token = jwt.sign(payload, 'my-secret', {
							expiresIn: '1h'
						});
						res.cookie('token', token, { httpOnly: true }).sendStatus(200);
					}
				}
				)};
		});
	});
});

router.get("/logout", mid, function(err, res){
	req.session.destroy();
});

module.exports = router;
