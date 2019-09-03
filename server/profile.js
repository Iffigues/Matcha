const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const tok = require('./tok');
const con = require('./dt.js');
const express = require('express');
const router = express.Router();
var jwtDecode = require('jwt-decode');
const middle = require('./middleware.js');
const val = require('./validateur.js');

router.use(middle);

function ffe(e) {
}

function tte(e) {
	let hh = [];
	for (var i in e)
		hh.push(e[i].tag);
	return (hh);
}

function ttes(e) {
	let hh = [];
	for (var i in e) 
		hh.push(e[i].name);
	return (hh);
}

function builder(err, result, result1, result2, ips, fufu) {
	let b = {}
	b.code = 0;
	b.bio = result.bio;
	b.email = result.email;
	b.lastname = result.lastname;
	b.firstname = result.firstname;
	b.birthdate = result.birthdate;
	b.lng = result.lng;
	b.lat = result.lat;
	b.sexe = result.sexe;
	b.profilephoto = result.profilephoto;
	b.pref = result.pref;
	b.username = result.username;
	b.tags  = tte(result1);
	b.photos = result2;
	b.city = result.city;
	b.furries = ttes(fufu);
	return b;
}

router.get("/", function (req, res) {
	let f  =  `SELECT *, DATE_FORMAT(birthdate, "%d/%m/%Y") AS birthdate FROM user WHERE id = ?`;
	let ff = `SELECT tag FROM tag WHERE userId=? GROUP BY tag`;
	let fff = `SELECT * FROM img WHERE userId=?`;
	let rre = `SELECT * FROM furry WHERE userId = ?`;
	con.connect(function (err) {
		var dd = jwtDecode(req.token);
		var d = dd.rr.id;
		con.query(f,[d], function (err, result) {
			con.query(ff, [d], function (err, result1) {
				con.query(fff, [d], function (err, result2) {
					con.query(rre,[d], function (err, repp) {
						res.status(200).send(JSON.stringify(builder(err, result[0], result1, result2, req.ip, repp)));
					})
				});
			})
		});
	});
});

function getTab() {
	return ["city","lastname", "firstname", "bio", "birthdate", "lat", "lng", "preferences", "sexe", "email", "password","confirm", "username"];
}


function protect(u) {
	let tt = {};
	let valid = new val();
	tt.code = 0;
	if ((u == "lastname" || u == "firstname") && !valid.isName(u))
		retun ({code: 1, msg:"nom ou prenom invalide"})
	if (u == "username" && !valid.isLogin(u))
		return ({code:1, msg:"username invalide"});
	if (u == "email" && !valid.isEmail(u)) {
		return ({code:1, msg:"email invalide"});
	}
	return tt;
}

function look(tab, r, obj) {
	let tt = {};
	tt.code = 0;
	console.log(r[i])
	for (var i = 0; i < r.length; i++) {
		if (!tab.includes(r[i])) {
			tt.code = 1;
			tt.msg = "valeur inexistante "+r[i];
			return tt;
		} else if (r[i] == "password" &&  obj["confirm"] != obj["password"]) {
			tt.code = 1
			console.log(r[i]);
			tt.msg = "mauvais password";
			return tt;
		} else {
			let u = protect(obj[r[i]]);
			if (u.code)
				return u;
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
					console.log(err);
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
	let jj = req.body;
	if (jj) {
		var decoded = jwtDecode(req.token);
		let y = hard(jj, Object.keys(jj), `UPDATE user SET `, 0, getTab(), decoded.rr.id);
		if (y.code == 0) {
			con.connect(function (err) {
				con.query(y.sql, [decoded.rr.id], function (err, result) {
					res.status(200).send(JSON.stringify({code:0, msg:"Vos donnees ont ete changer"}));
					con.query('SELECT lat, lng FROM user WHERE id = ? AND lat != null AND lng != null', decoded.rr.id, function (err, rem){
						if(!err && rem.length) {
							con.query("SETUP user SET role = user WHERE id = ?",decoded.rr.id, function (err, rrr) {
								console.log(err);	
							});
						}
					});
				});
			});
		} else {
			res.status(400).send(JSON.stringify(y));
		}
	} else {
	}
});

router.post("/profilephoto", function (req, res) {
	let f = `SELECT * FROM img WHERE userId = ? AND id = ?`;
	let ff = `UPDATE user SET profilephoto = ? WHERE id= ?`;
	var id = req.body.profilePhoto
	var decoded = jwtDecode(req.token);
	con.connect(function (err) {
		con.query(f, [decoded.rr.id, id], function (err, result) {
			console.log(err);
			if (!err && result) {
				con.query(ff, [id, decoded.rr.id], function (err, result1) {
					console.log(err);
					res.status(200).send(JSON.stringify({code:0, msg:"photo de profile changer"}));
				});
			}
		});
	});
});

module.exports = router;
