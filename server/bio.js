const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
const middles = require("./middleware.js");

router.post(req, res) {
	let f = req.query.bio;
	let f = "REPLACE INTO bio(userId, bio) VALUES (?,?)";
	con.connect(function (err) {
		con.query(f,[req.session.user['id'], h], function (err, result) {
		});
	});
}

module.exports = router;
