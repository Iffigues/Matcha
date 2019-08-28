const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
const middles = require("./middleware.js");
var jwtDecode = require('jwt-decode');
const util = require('util');
router.use(middles);
const query = util.promisify(con.query).bind(con);

function ids(a, b) {
	for (var tt in b) 
		if (b[tt].id == a)
			return 1;
	return 0;
}

function age(birthday) {
	if (!birthday)
		return null;
	   var ageDifMs = Date.now() - birthday.getTime();
	    var ageDate = new Date(ageDifMs);
	    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function pok(a, b) {
	let res = 0;
	if (a > b)
		res = a - b;
	else
		res = b - a;
	let f = 100 - res;
	if (f < 0)
		f = 0;
	return (f)
}

async function lol (g, res, me, type) {
	try {
		console.log(g.length);
		let profile = [];
		for (let n in g) {
			let oui = 0;
			let non = 0;
			let ye = 0;
			let li = 0;
			let ooo= 1;
			if (!g[n].distance) {
				console.log("fdfddfdfdffsdfs");
			}
			let popu = g[n].popularity;
			const rows = await query('select * FROM tag WHERE tag.userId = ?', g[n].id);
			for (var e in rows) {
				const re = await query('SELECT COUNT(*) as d FROM tag WHERE userId = ? AND tag  = ?', [me.id, rows[e].tag]);
				if (re[0].d)
					non = non + 1;
			}
			const rows1 = await query('select * FROM furry WHERE furry.userId = ?',  g[n].id);
			for (var e in rows1) {
				const re = await query('SELECT COUNT(*) as d FROM furry WHERE userId = ? and name = ?', [me.id, rows1[e].name]);
				if (re[0].d)
					oui = oui + 1;
			}
			const rows2 = await query('SELECT * FROM likes WHERE userOne = ? AND userTwo = ?', [me.id, g[n].id]);
			if (rows2.length)
				li = 1;
			const blok = await query('SELECT* FROM bloque WHERE (userId = ? AND  bloqueId = ?) OR (userId = ? AND bloqueId = ?)',[g[n].id, me.id, me.id , g[n].id]);
			if (blok.length)
				ooo = 0;
			g[n].age = age(g[n].birthdate);
			g[n].profilephoto = g[n].path;
			delete g[n].birthdate;
			delete g[n].path;
			if (ooo)
			profile.push(Object.assign({
				tags: rows,
				tagmatch: non,
				furries: rows1,
				distance: g[n].distance,
				furrymatch: oui,
				match: non + oui + pok(popu + 1, me.popularity + 1)+ ye,
				like: li
			}, g[n]));
		}
		if (type == "all") {
			let profiles = profile;
			res.status(200).send(JSON.stringify({code:0, profiles}));
		}
		if (type == "suggestions") {
			let i = 10;
			profile.sort((a, b) => (a.match <  b.match) ? 1 : -1);
			let profiles = [];
			while  (profiles.length < 100 && i >= 0) {
				let profil =  profile.filter(function(profile) {
					return profile.match >= i && !ids(profile.id, profiles);
				});
				if (profil)
					profiles.push(profil);
				profiles =  profiles.reduce((acc, val) => acc.concat(val), []);
				i--;
			}
			res.status(200).send(JSON.stringify({code:0, profiles}));
		}
	} finally {
	}
}



router.get("/:id",function (req, res) {
	let id = req.params.id;
	let g = `SELECT *,
		tag.tag,
		furry.name,
		img.path
	FROM user
	LEFT JOIN tag as tag ON tag.userId = user.id
	LEFT JOIN furry as furry ON furry.userId = user.id
	LEFT JOIN img as img ON img.id = user.profilephoto
	WHERE user.id = ?
		`;
	var decoded = jwtDecode(req.token);
	let f = `SELECT 
	user.id, user.firstname, user.lastname, user.birthdate, user.city, user.sexe, user.popularity, user.lat, user.lng, img.path,
		111.045*haversine(user.lat,user.lng ,latpoint, longpoint) AS  distance
	FROM user 
	 JOIN (
		      SELECT  ?  AS latpoint,  -? AS longpoint
	) AS p
	LEFT JOIN img as img ON img.id = user.profilephoto
	WHERE sexe = ? AND preferences = ? OR preferences = 0 AND user.id != ?
	`;
	con.connect(function (err) {
		con.query(g, [decoded.rr.id], function (err, result) {
			if (!err && result) {
				let yy = [];
				let d = result[0];
				con.query(f, [d.lat, d.lng, d.sexe, d.preferences, decoded.rr.id], function (err, result1)  {
					console.log(err);
					lol(result1, res, d, id);
				});
			}
		})
	});
});

module.exports = router;
