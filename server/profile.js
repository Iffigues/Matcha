const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const tok = require('./tok');
const con = require('./dt.js');
const express = require('express');
const func = require('./func.js');
const router = express.Router();
var jwtDecode = require('jwt-decode');
const middle = require('./middleware.js');

router.use(middle);

router.get("/", function (req, res) {
	let f  =  `SELECT * FROM user WHERE id = ?`;
	con.connect(function (err) {
		var dd = jwtDecode(req.token);
		var d = dd.rr.id;
		con.query(f,[d], function (err, result) {
			res.status(200).send(JSON.stringify({code:0, msg:result}));
		});
	});

});
router.post("/:id", function (req, res) {
	let act = req.params.id;
	let val = req.body.value;
	let id = req.session.user['id'];
	var pointer = func();
	if (pointer[act])
		pointer[act](req,res,id);
});
module.exports = router;
