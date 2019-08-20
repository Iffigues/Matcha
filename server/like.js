const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
var server = require('http').Server(router);
const middles = require("./middleware.js");
var jwtDecode = require('jwt-decode');

router.get("/", function (req, res) {
	con.connect(function (err) {
		let f = `SELECT * FROM tag WHERE userOne = ? OR userTwo`;
		con.query();
	});
});

module.exports = router;
