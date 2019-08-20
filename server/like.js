const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
var server = require('http').Server(router);
const middles = require("./middleware.js");
var jwtDecode = require('jwt-decode');

router.use(middles);

router.get("/new", function (req, res) {
	con.connect(function (err) {
		let f = `SELECT * FROM likes WHERE userTwo = ? AND accept = 0`;
		var decoded = jwtDecode(req.token);
		con.query(f, [decoded.rr.id], function (err, resu) {
			console.log(err)
			res.status(200).send(JSON.stringify({code: 0, msg: resu}));
		});
	});
});

router.post("/add", function (req, res) {
	con.connect(function (err) {
		let f = `INSERT INTO likes (userOne, userTwo) VALUES (?,?)`;
		var decoded = jwtDecode(req.token);
		let o = req.body.user;
		con.query(f, [decoded.rr.id, o], function (err, resu) {
			console.log(err);
			res.status(200).send(JSON.stringify({code: 0, msg:resu}));
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
		let f = "UPDATE likes SET accept = 2 WHERE (userTwo = ? AND userOne = ?) OR (userOne = ? AND userTwo = ?)";
		var decoded = jwtDecode(req.token);
		let cc = decoded.rr.id;
		var o = req.body.user;
		con.query(f, [cc,o,o,cc] , function (err, resu) {
			console.log(err);
			res.status(200).send(JSON.stringify({code:0, msg:resu}));
		});
	});
})

module.exports = router;
