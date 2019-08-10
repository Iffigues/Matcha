const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const tok = require('./tok');
const con = require('./dt.js');
const express = require('express');
const func = require('./func.js');
const router = express.Router();
const middle = require('./middleware.js');
router.use(middle);
router.get("/", function (req, res) {
	res.writeHeader(202, {"Content-Type": "application/json"});
	res.end(JSON.stringify(req.session.user));

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
