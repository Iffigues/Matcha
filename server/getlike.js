const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
var server = require('http').Server(router);
const middles = require("./middleware.js");
var jwtDecode = require('jwt-decode');
const notif = require('./notif.js');
router.use(middles);
const util = require('util');
const query = util.promisify(con.query).bind(con);

async function isMatched(id, user, res) {
	let liked = [];
	for (let i in id) {
	let f = await query('SELECT lastname, firstname, username FROM user WHERE id = ?', id[i].id).then((result) => result).catch((err) => false);
	let fr = await query(`SELECT COUNT(*) as d FROM likes WHERE userOne = ? AND userTwo = ?`,[id[i].id, user]).then((result) => result).catch((err) => false);
	if (f) {
			let r = f[0];
			let users = {
				lastname: r.lastname,
				firstname: r.firstname,
				username: r.username,
				id: id[i].id,
				matched: 0
			};
			if (fr && fr.length)
				users.matched = 1;
			liked.push(users);
		}
	}
	res.status(200).send(JSON.stringify({code:0, liked}))
}	

router.get("/", function (req, res) {
	let f = `SELECT userTwo AS id FROM likes WHERE userOne = ?`;
	let decoded = jwtDecode(req.token);
	con.connect(function (err) {
		con.query(f,[decoded.rr.id], function (err, result) {
			if (err) {
				return (res.status(400).send(JSON.stringify({code:3, msg:"une erreur server est survenue"})));
			}
			isMatched(result, decoded.rr.id, res)
		});
	});
});

module.exports = router;
