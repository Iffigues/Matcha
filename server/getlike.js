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

async function isMatched(id, user) {
	let f = await query('SELECT lastname, firstname, username FROM user WHERE id = ?', id).then((result) => result).catch((err) => false);
	let fr = await query(`SELECT COUNT(*) FROM likes WHERE userOne = ? AND userTwo = ?`,[id, user]).then((result) => result).catch((err) => false);
	if (f) {
			let r = f[0];
			let user = {
				lastname: r.lastname,
				firstname: r.firtname,
				username: r.username,
				id: id,
				matched: 0
			};
			if (fr && fr.length)
				user.matched = 1;
			return user;
	}
	return false;
}	

router.get("/", function (req, res) {
	let f = `SELECT userTwo FROM likes WHERE userOne = ?`;
	let liked = [];
	let decoded = jwtDecode(req.token);
	console.log(decoded);
	con.connect(function (err) {
		con.query(f,[decoded.rr.id], function (err, result) {
			if (err) {
				return (res.status(400).send(JSON.stringify({code:3, msg:"une erreur server est survenue"})));
			}
			console.log(result);
			for (let g in result) {
				let user = isMatched(result[g].userTwo, decoded.rr.id);
				if (user)
					liked.push(user);
			}
			res.status(200).send(JSON.stringify({code:0, liked}));
		});
	});
});

module.exports = router;
