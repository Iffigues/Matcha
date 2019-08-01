const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const tok = require('./tok');
const con = require('./dt.js');
const express = require('express');
const  router = express.Router();

router.post("/", function login(req, res) {
	con.connect(function(err) {
		let user = req.body.username;
		let pwd = req.body.password;
		let email = req.body.email;
		let firstname = req.body.firstname;
		let lastname = req.body.lastname;
		let gender = req.body.gender;
		var sql = `INSERT INTO customers (firstname, lastname, password, username, gender) VALUES ()`;
		con.query(sql, function (err, result) {
			    if (err) throw err;
			    console.log("1 record inserted");
		});
	});
}

module.exports.login = router;
