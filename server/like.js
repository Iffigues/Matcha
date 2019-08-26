const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
var server = require('http').Server(router);
const middles = require("./middleware.js");
var jwtDecode = require('jwt-decode');
const notif = require('./notif.js');
router.use(middles);

router.get("/new", function (req, res) {
	con.connect(function (err) {
		let f = `SELECT * FROM likes WHERE userTwo = ? AND accept = 0`;
		var decoded = jwtDecode(req.token);
		con.query(f, [decoded.rr.id], function (err, resu) {
			res.status(200).send(JSON.stringify({code: 0, msg: resu}));
		});
	});
});

router.post("/add", function (req, res) {
	con.connect(function (err) {
		let f = `INSERT INTO likes (userOne, userTwo) VALUES (?,?)`;
		var decoded = jwtDecode(req.token);
		let o = req.body.id;
		console.log(o);
		con.query(f, [decoded.rr.id, o], function (err, resu) {
			console.log(err);
			if (!err) {
				notif(decoded.rr, o, "like", "Vous avez ete liker");
				res.status(200).send(JSON.stringify({code: 0, msg:resu}));
			} else {
				con.query(`DELETE FROM likes WHERE userOne = ? AND userTwo = ?`, [decoded.rr.id, o], function (err, resu) {
					res.status(200).send(JSON.stringify({code:2, msg:"user unliker"}));
				});
			}
		});
	});
});

router.post("/accept", function (req, res) {
	con.connect(function (err) {
		let f = `UPDATE  likes SET accept = 1 WHERE userTwo = ?`;
		var decoded = jwtDecode(req.token);
		let o = req.body.user;
		con.query(f, [decoded.rr.id], function (err, resu) {
			console.log(err);
			res.status(200).send(JSON.stringify({code: 1, msg:resu}));
		});
	});
});

router.get("/accept", function (req, res) {
	con.connect(function (err) {
		let f = `SELECT * FROM likes WHERE userTwo = ? or userOne = ? AND accept = 1`;
		var decoded = jwtDecode(req.token);
		con.query(f, [decoded.rr.id, decoded.rr.id], function (err, resu) {
			console.log(err);
			res.status(200).send(JSON.stringify({code:0, msg:resu}));
		});
	});
});

router.post("/unlike", function (req, res) {
	con.connect(function (err) {
		let f = "UPDATE likes SET accept = 2 WHERE userOne = ? AND userTwo = ?";
		var decoded = jwtDecode(req.token);
		let cc = decoded.rr.id;
		var o = req.body.user;
		con.query(f, [cc,o] , function (err, resu) {
			res.status(200).send(JSON.stringify({code:0, msg:resu}));
		});
	});
})

module.exports = router;
