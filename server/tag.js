const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
const middles = require("./middleware.js");

router.use(middles);

router.pos("/new/:id", function (req, res) {
	let tag = req.params.id;
});

module.exports = router;
