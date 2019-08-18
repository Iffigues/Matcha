const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
const middles = require("./middleware.js");
var jwtDecode = require('jwt-decode');

router.use(middles);

router.get("/",function (req, res) {
	// api = AIzaSyBS2V8xJYNTWhfEFaW7SW0mvOJfoZ1mmI8
	let g = `SELECT * FROM user WHERE id = ?`;
	var decoded = jwtDecode(req.token);
	let f = `SELECT *, 3956 * 2 * ASIN(SQRT(POWER(SIN((? - abs(lat)) * pi()/180 / 2),2) + COS(? * pi()/180 ) * COS(abs(lat) *pi()/180) * POWER(SIN((? - lng) *pi()/180 / 2), 2) ))  as distance FROM user WHERE  sexe = ? AND preferences = ? AND id != ? having distance < 100000000`;
	con.connect(function (err) {
		con.query(g, [decoded.rr.id], function (err, result) {
			console.log(err);
			if (!err && result) {
				let d = result[0];
				con.query(f, [d.lat, d.lng, d.lng, d.pref, d.sexe,d.id], function (err, result1)  {
					console.log(err);
					res.status(200).send({code:0, user:result1});
				});
			}
		})
	});
});

module.exports = router;
