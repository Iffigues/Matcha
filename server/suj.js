const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
const middles = require("./middleware.js");
const role = require("./role.js");
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
		let profile = [];
		const max = await query(`SELECT MAX(popularity) AS max FROM user`).catch(err => console.log(err));
		let mypop = ((me.popularity + 1) * 100) / (max[0].max + 1);
		for (let n in g) {
			if (g[n].lat && g[n].lng && g[n].birthdate && g[n].city && g[n].firstname && g[n].lastname) {
				let oui = 0;
				let non = 0;
				let ye = 0;
				let li = 0;
				let ooo= 1;
				let popu = ((g[n].popularity + 1) * 100) / (max[0].max + 1);
				g[n].popularity = popu;
				const rows = await query('select * FROM tag WHERE tag.userId = ?', g[n].id);
				for (var e in rows) {
					const re = await query('SELECT COUNT(*) as d FROM tag WHERE userId = ? AND tag  = ?', [me.ids, rows[e].tag]);
					if (re[0].d)
						non = non + 1;
				}
				const rows1 = await query('select * FROM furry WHERE furry.userId = ?',  g[n].id);
				for (var e in rows1) {
					const re = await query('SELECT COUNT(*) as d FROM furry WHERE userId = ? and name = ?', [me.ids, rows1[e].name]);
					if (re[0].d)
						oui = oui + 1;
				}
				const rows2 = await query('SELECT * FROM likes WHERE userOne = ? AND userTwo = ?', [me.ids, g[n].id]);
				if (rows2.length)
					li = 1;
				const blok = await query('SELECT * FROM bloque  WHERE (userId = ? AND  bloqueId = ?) OR (userId = ? AND bloqueId = ?)',[g[n].id, me.ids, me.ids , g[n].id]);
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
						match: non + oui + pok(popu + 1, mypop + 1) + ye,
						like: li,
						likable: g[n].path != null
					}, g[n]));
			}	
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

async function roles(id) {
	const b = await query(`SELECT role FROM user WHERE id = ?`, id);
	if (b && b.length) {
		if (b[0].role != "preuser") {
			return 1;
		}
	}
	return 0;
}

router.get("/:id",function (req, res) {
	let id = req.params.id;
	let g = `SELECT *,
		img.path
	FROM user
	LEFT JOIN img as img ON img.id = user.profilephoto
	WHERE user.id = ?
		`;
	var decoded = jwtDecode(req.token);
	if (!roles(decoded.rr.id)) {
		return res.status(200).send(JSON.stringify({code:3,  msg:"vous devez remplire votre profile"}));
	}
	let f = `SELECT 
	user.id, user.firstname, user.lastname, user.birthdate, user.city, user.sexe, user.popularity, user.lat, user.lng, img.path,
		111.045*haversine(user.lat,user.lng ,latpoint, longpoint) AS  distance
	FROM user 
	JOIN (
		SELECT  ?  AS latpoint,  ? AS longpoint
	) AS p
	LEFT JOIN img as img ON img.id = user.profilephoto
	WHERE role != 'preuser' AND  (sexe = `; 
		let gs = ` AND (preferences = ? OR preferences = 3) AND user.id != ?`;
		con.connect(function (err) {
			con.query(g, [decoded.rr.id], function (err, result) {
				if (!err && result && result.length > 0) {
					let yy = [];
					let ee = "1 OR sexe = 2 )";
					let ggg = ` AND (preferences = ? OR preferences = 3) AND user.id != ?`;
					let d = result[0];
					d.ids = decoded.rr.id;
					if (!d.lat || !d.lng || !d.birthdate || !d.city || !d.email || !d.firstname || !d.lastname || !d.username)
						return res.status(401).send(JSON.stringify({code:1, msg:"vous devez renseigner votre profile"}));
					if (d.preferences) {
						if (d.preferences == 1)
							ee = "1)";
						if (d.preferences == 2)
							ee = "2 )";
					}
					con.query(f+ee+ggg, [d.lat, d.lng, d.sexe, decoded.rr.id], function (err, result1)  {
						lol(result1, res, d, id);
					});
				} else {
					res.status(400).send(JSON.stringify({code:1, msg: "Une erreur s'est produite"}));
				}
			})
		});
});

module.exports = router;
