const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
const middles = require("./middleware.js");
var jwtDecode = require('jwt-decode');
router.use(middles);

router.post("/", function (req, res) {
	var decoded = jwtDecode(req.token);
	con.connect(function (err) {
		con.query(`INSERT INTO report (userId, who) VALUES (?,?)`,[decoded.rr.id, req.body.id], function (err, result) {
			res.status(200).send(JSON.stringify({code:0, msg: "L'utilisateur a été signalé"}));
		});
	});
});
module.exports = router;
