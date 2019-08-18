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
	p.lastname = result.lastname;
	p.firstname = result.firstname;
	p.date = result.date;
	p.lng = result.lng;
	p.lat = result.lat;
	p.sexe = result.sexe;
	p.pref = result.pref;
	p.username = result.username;
	b.profile = p;
	console.log(p);
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

function getTab() {
	return ["lastname", "firstname", "bio", "date", "lat", "lng", "pref", "sexe", "email", "password", "profile"];
}


function look(tab, r) {
	let tt = {};
	tt.code = 0;
	for (var i = 0; i < r.length; i++) {
		if (!tab.include(r[i])) {
			tt.code = 1;
			tt.msg = "valeur inexistante "+r[i];
		}
	}
	return tt;
};

function hard(obj, r, f, o, tab) {
	let b = look(tab, r)
	if (b.code == 0) {
	for (var i in r) {
		let u = r[i];
		if (o)
			f = f + `,`;
		f = f+u+`=`+"'"+obj[u]+"'";
		o = 1;
	}
	b.sql =  f + ` WHERE id = ?`;
	}
	return b;
}

router.post("/", function (req, res) {
	let act = req.params.id;
	let jj = req.body;
	if (jj) {
	var decoded = jwtDecode(req.token);
	let y = hard(jj, Object.keys(jj), `UPDATE user SET `, 0, getTab());
	if (y.code == 0) {
	con.connect(function (err) {
		con.query(y.sql, [decoded.rr.id], function (err, result) {
			console.log(err);
			res.status(200).send(JSON.stringify({code:0, msg:"good job"}));
		});
	});
	} else {
	}
	} else {
	}
});
module.exports = router;
