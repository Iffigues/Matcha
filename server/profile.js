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

function builder(err, result, result1, result2, ips) {
	let b = {}
	let p = {};
	b.code = 0;
	p.bio = result.bio;
	p.email = result.email;
	p.lastname = result.lastname;
	p.firstname = result.firstname;
	p.birthdate = result.birthdate;
	p.lng = result.lng;
	p.lat = result.lat;
	p.sexe = result.sexe;
	p.profile = result.profile;
	p.pref = result.pref;
	p.username = result.username;
	b.profile = p;
	b.tag  = result1;
	b.photo = result2;
	b.ip = ips;
	console.log(p);
	return b;
}

router.get("/", function (req, res) {
	let f  =  `SELECT *, DATE_FORMAT(birthdate, "%d/%m/%Y") AS birthdate FROM user WHERE id = ?`;
	let ff = `SELECT tag FROM tag WHERE userId=? GROUP BY tag`;
	let fff = `SELECT path FROM img WHERE userId=?`;
	con.connect(function (err) {
		var dd = jwtDecode(req.token);
		var d = dd.rr.id;
		con.query(f,[d], function (err, result) {
			con.query(ff, [d], function (err, result1) {
				con.query(fff, [d], function (err, result2) {
						console.log(err);
						res.status(200).send(JSON.stringify(builder(err, result[0], result1, result2, req.ip)));
				});
			})
		});
	});
});

function getTab() {
	return ["lastname", "firstname", "bio", "birthdate", "lat", "lng", "preferences", "sexe", "email", "password","confirm", "username"];
}


function look(tab, r, obj) {
	let tt = {};
	tt.code = 0;
	for (var i = 0; i < r.length; i++) {
		if (!tab.includes(r[i])) {
			tt.code = 1;
			tt.msg = "valeur inexistante "+r[i];
			return tt;
		}
		if (r[i] == "password" &&  obj["confirm"] != obj["password"]) {
			tt.code = 1
			console.log(r[i]);
			tt.msg = "mauvais password";
			return tt;
		}
	}
	return tt;
};

function hh(ee, uu, obj, id) {
	let ff = ee;
	if (uu = "password") {
		if (obj['confirm'] == obj["password"]) {
				bcrypt.hash(ee, saltRounds, function(err, hash) {
					con.query(`UPDATE user SET password = ? WHERE id = ?`,[hash, id], function (err, res)  {
						return ;
					});
					
				});
		} else {
			return (false);
		}
	}
	return (ee);
}

function hard(obj, r, f, o, tab, id) {
	let b = look(tab, r, obj)
	if (b.code == 0) {
		for (var i in r) {
			let u = r[i];
			let haha = hh(obj[u], u, obj, id);
			if (r[i] != "confirm" || r[i] != "password") {
				if (o)
					f = f + `,`;
				if (u == "birthdate") {
				 	let vv = haha.split("/");
					haha = vv[02]+'-'+vv[1]+'-'+vv[0]
				}
				f = f+u+`=`+"'"+haha+"'";
				o = 1;
			}
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
		let y = hard(jj, Object.keys(jj), `UPDATE user SET `, 0, getTab(), decoded.rr.id);
		if (y.code == 0) {
			con.connect(function (err) {
				con.query(y.sql, [decoded.rr.id], function (err, result) {
					res.status(200).send(JSON.stringify({code:0, msg:"Vos donnees ont ete changer"}));
				});
			});
		} else {
			res.status(400).send(JSON.stringify(y));
		}
	} else {
	}
});

router.post("/profilephoto", function (err, res) {
	let f = `SELECT * FROM img WHERE userId = ? AND id = ?`;
	let ff = `UPDATE user SET profile = ? WHERE id= ?`;
	var decoded = jwtDecoded(req.token);
	con.connect(function (err) {
		con.query(f, [decoded.rr.id, req,body.profilephoto], function (err, result) {
			if (!err && result) {
				con.query(ff, [req.body.profilephoto, decoded.rr.id], function (err, result1) {
						res.status(200).send(JSON.stringify({code:0, msg:""}));
				});
			}
		});
	});
});

module.exports = router;
