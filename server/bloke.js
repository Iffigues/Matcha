const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
const middles = require("./middleware.js");
var jwtDecode = require('jwt-decode');

router.use(middles);

router.post("/bloque", function (req, res) {
	var decoded = jwtDecode(req.token);
	con.connect(function (err) {
		let f = `INSERT INTO bloque (userId, bloqueId) VALUES (?,?)`;
		con.query(f,[decoded.rr.id, req.body.id], function (err, result) {
		});
	});
});

router.post("/unbloque", function (req, res) {
	var decoded = jwtDecode(req.token);
	con.connect(function (err) {
		let f = `DELETE FROM bloque WHERE userId = ? AND bloqueId = ?`;
		con.query(f, [decoded.rr.id, req.body.id], function (err, reu) {
			
		});
	});
});

module.exports = router;
