const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
const middles = require("./middleware.js");
var jwtDecode = require('jwt-decode');
const notif = require("./notif.js");

router.use(middles);

router.get("/:id", function (req, res) {
	let id = req.params.id;
	var decoded = jwtDecode(req.token);
	con.connect(function (err) {
		con.query(`SELECT * FROM user WHERE id = ?`, id, function (err, result1) {
			con.query(`SELECT * FROM furry WHERE userId = ?`, id, function (err, resultat2) {
				con.query(`SELECT * FROM tag WHERE userId = ?`,id, function (err, resultat3) {
					con.query(`SELECT * FROM likes WHERE userOne = ? AND userTwo= ?`,[id, decoded.rr.id], function (err, resultat3){
						notif(decoded.rr, id, 'visited',"un utilisateur a vu vorte profile");
						res.status(200).send(JSON.stringify({code:0, result1, resultat2, like:resultat3.length > 0 }));
					});
				});
			});
		});
	});
});

module.exports = router;
