const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const tok = require('./tok');
const con = require('./dt.js');
const express = require('express');
const  router = express.Router();

router.post("/", function (req, res) {
	con.connect(function (err) {
		let pwd = req.body.password;
		let email = req.body.email;
		var sql = `SELECT * FROM user WHERE email = ?`;
		con.query(sql, [email] ,function (err, result) {
			if (err) throw err;
			let toke = new tok();
			const payload = { result };
			req.session.views = 1;
			const token = jwt.sign(payload, 'my-secret', {
				expiresIn: '1h'
			});
			res.cookie('token', token, { httpOnly: true }).sendStatus(200);
		});
	});
});

module.exports = router;
