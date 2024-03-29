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
				res.status(200).send(JSON.stringify({code:0,nbr:results.length}));
			}
		});
	});
});

router.get("/all", function (req, res) {
	var decoded = jwtDecode(req.token);
	let f = `SELECT notif.*, user.username FROM notif INNER JOIN user AS user ON user.id = notif.userId WHERE who = ? ORDER BY date DESC`;
	con.connect(function (err) {
		con.query(f, [decoded.rr.id], function(err, resultats) {
			con.query(`UPDATE notif SET look = 1 WHERE who = ?`, decoded.rr.id, function (err, rs){
				res.status(200).send(JSON.stringify({code:0, resultats}));
			})
		});
	});
});

module.exports = router;
