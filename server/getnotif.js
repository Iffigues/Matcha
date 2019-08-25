const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
const middles = require("./middleware.js");
var jwtDecode = require('jwt-decode');

router.use(middles);

router.get("/nbr", function (req, res) {
	var decoded= jwtDecode(req.token);
	con.connect(function (err) {
		let f = `SELECT * FROM notif WHERE who = ? AND look = 0 ORDER BY date DESC`;
		con.query(f, decoded.rr.id, function (err, results) {
			if (!err) {
				res.status(200).send(JSON.stringify({code:0, results, nbr:results.length}));
			}
		});
	});
});

router.get("/all", function (req, res) {
	var decoded = jwtDecode(req.token);
	let f = `SELECT * FROM notif WHERE who = ? ORDER BY date DESC`;
	con.connect(function (err) {
		con.query(f, [decoded.rr.id], function(err, resulats) {
			con.query(`UPDATE notif SET look = 1 WHERE who = ?`, decoded.rr.id, function (err, resu){
				res.status(200).send(JSON.stringify({code:0, resulats}));
			})
		});
	});
});

module.exports = router;
