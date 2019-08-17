const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const tok = require('./tok');
const con = require('./dt.js');
const express = require('express');
const func = require('./func.js');
const router = express.Router();
var jwtDecode = require('jwt-decode');
const middle = require('./middleware.js');

router.use(middle);

function builder(err, result) {
	let b = {}
	let p = {};
	b.code = 0;
	p.email = result.email;
	p.lastname = result.lsatname;
	p.firstname = result.firstname;
	p.date = result.date;
	p.lng = result.lng;
	p.lat = result.lat;
	p.sexe = result.sexe;
	p.pref = result.pref;
	p.username = result.username;
	b.profile = p;
	return b;
}

router.get("/", function (req, res) {
	let f  =  `SELECT * FROM user WHERE id = ?`;
	con.connect(function (err) {
		var dd = jwtDecode(req.token);
		var d = dd.rr.id;
		con.query(f,[d], function (err, result) {
			res.status(200).send(JSON.stringify(builder(err, result[0])));
		});
	});

});
router.post("/:id", function (req, res) {
	let act = req.params.id;
	var pointer = func();
	if (pointer[act])
		pointer[act](req,res);
});
module.exports = router;
