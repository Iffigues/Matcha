const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const tok = require('./tok');
const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
const mid = require("./middleware.js");
router.post("/", function (req, res) {
	if (req.session.log) {
		return ;
	}
	con.connect(function (err) {
		let pwd = req.body.password;
		let email = req.body.email;
		var sql = `SELECT * FROM user WHERE email = ? LIMIT 1`;
		con.query(sql, [email] ,function (err, result, fields) {
			if (err) throw err;
			let rr = result[0];
			if (rr.active) {
				bcrypt.compare(pwd, rr.password, (err, ress) => {
					if (err) throw err;
					console.log(ress)
					if (ress === true) {
						let toke = new tok();
						const payload = { rr };
						req.session.login['co'] = 1;
						console.log(req.session);
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

router.get("/logout/:token", mid, function(err, res){
	req.session.destroy();
});

module.exports = router;
