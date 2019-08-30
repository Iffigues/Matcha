const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
const middles = require("./middleware.js");
var jwtDecode = require('jwt-decode');
const util = require('util');
router.use(middles);
const query = util.promisify(con.query).bind(con);

async function lol(req, res) {
	let users = [];
	var t = jwtDecode(req.token);
	const r = await query('SELECT * FROM likes WHERE userOne = ?', [t.rr.id])
	if (r) {
		for (var i in r) {
			const e = await query('SELECT COUNT(*) as v FROM likes WHERE userOne = ? AND userTwo = ?', [r[i].userTwo, t.rr.id])
			if (e) {
				if (e[0].v) {
					const finals = await query('SELECT username FROM user WHERE id = ?', [r[i].userTwo]);
					const fifi = await query('SELECT COUNT(id) as c FROM messages WHERE look = 0 AND  userOne = ? AND userTwo=?',[r[i].userTwo, t.rr.id]);
					let un = 0;
					if (fifi.length) 
						un = fifi[0].c;
					users.push({username:finals[0].username, id:r[i].userTwo, unread:un})
				}
			};
		}
	}
	res.status(200).send(JSON.stringify({code: 0, users}));
}

router.get("/", function (req, res) {
	lol(req, res);
});

module.exports = router;
