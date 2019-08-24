const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
const middles = require("./middleware.js");
var jwtDecode = require('jwt-decode');
const util = require('util');
router.use(middles);
const query = util.promisify(con.query).bind(con);

async function lol (g, res, me, type) {
	try {
		let profile = [];
		for (let n in g) {
			let oui = 0;
			let non = 0;
			let ye = 0;
			let popu = g[n].popularite;
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
			const rows2 = await query('SELECT * FROM likes WHERE likes.userOne = ? AND likes.userTwo = ?', [g[n].id, me.id]);
			if (rows2[0])
				ye = 8;
			profile.push({
				user:g[n],
				tag: rows,
				tagmatch: non,
				furry: rows1,
				furrymatch: oui,
				match: non + oui + popu + ye,
				like: rows2
			});
		}
		if (type == "all")
			res.status(200).send(JSON.stringify({code:0, profile}));
		if (type == "sugestion") {
			profile.sort((a, b) => (a.match <  b.match) ? 1 : -1);
			res.status(200).send(JSON.stringify({code:0, profile}));
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
		user.id, user.firstname, user.lastname, user.email, user.birthdate, user.city, user.username, user.popularite, img.path,
		3956 * 2 * ASIN(SQRT(POWER(SIN((? - abs(lat)) * pi()/180 / 2),2) + COS(? * pi()/180 ) * COS(abs(lat) *pi()/180) * POWER(SIN((? - lng) *pi()/180 / 2), 2) ))  as distance,
		DATE_FORMAT(user.birthdate, "%d-%m-%Y") AS birthdate
	FROM user 
	LEFT JOIN img as img ON img.id = user.profilephoto
	WHERE sexe = ? AND preferences = ? OR preferences = 0
	`;
	con.connect(function (err) {
		con.query(g, [decoded.rr.id], function (err, result) {
			if (!err && result) {
				let yy = [];
				let d = result[0];
				con.query(f, [d.lat, d.lng, d.lng, d.sexe, d.preferences], function (err, result1)  {
						lol(result1, res, d, id);
				});
			}
		})
	});
});

module.exports = router;
