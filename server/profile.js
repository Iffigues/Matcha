const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const tok = require('./tok');
const con = require('./dt.js');
const express = require('express');
const router = express.Router();
const middle = require('./middleware.js');
router.use(middle);
router.get("/:id", function (req, res)) {
});

router.post("/:id", function (req, res) {
	let act = req.params.id;
	let val = req.body.value;
});
module.exports = router;
