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

router.post("/revover", function(req, res) {
	let f = `INSERT INTO recover (userId, tok, password) VALUE ((SELECT id FROM user WHERE email = ?),?,?)`;
	let email = req.body.email;
	let tok = randomToken(16);
	let pass = faker.fake("{{internet.password}}");
	con.connect(function(err) {
		con.query(f,[emil, tok, pass], function(err, res, field) {
			
		});
	});
});

router.get("/recover/:tok" function(req, res) {
	
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
