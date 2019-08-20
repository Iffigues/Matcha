const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
var server = require('http').Server(router);
const middles = require("./middleware.js");
var jwtDecode = require('jwt-decode');

router.use(middles);

router.get("/", function (req, res) {
	con.connect(function (err) {
		let f = `SELECT * FROM likes WHERE userOne = ? OR userTwo = ?`;
		var decoded = jwtDecode(req.token);
		con.query(f, [decoded.rr.id, decoded.rr.id], function (err, resu) {
			console.log(err)
			res.status(200).send({code: 0, msg: resu});
		});
	});
});

module.exports = router;
