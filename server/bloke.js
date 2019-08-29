const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
const middles = require("./middleware.js");
var jwtDecode = require('jwt-decode');

router.use(middles);

router.post("/", function (req, res) {
	var decoded = jwtDecode(req.token);
	if (decoded.rr.id != req.body.id) {
		con.connect(function (err) {
			let f = `INSERT INTO bloque (userId, bloqueId) VALUES (?,?)`;
			con.query(f,[decoded.rr.id, req.body.id], function (err, result) {
				console.log(err)
				if (!err) {
					res.status(200).send(JSON.stringify({code:0, msg:'user bloquer'}));
				} else  {
					con.query(`DELETE FROM bloque WHERE userId = ? AND bloqueId = ?`,[decoded.rr.id, req.body.id], function (err, resul) {
						console.log(err);
						res.status(200).send(JSON.stringify({code:0, msg:'user debloquer'}));
					});
				}
			});
		});
	}
});

router.post("/debloque", function (req, res) {
	var l = jwtDecode(req.token);
	let f = 'SELECT * FROM bloque WHERE userId = ?';
	con.connect(function(err) {
		con.query(f,[l.rr.id], function (err, resultats) {
			res.status(200).send(JSON.stringify({code: 0, resultats}));
		});
	});
});

module.exports = router;
