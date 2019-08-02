const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
router.post("/", function (req, res) {
	let tok = req.body.token;
	let user = req.body.id;
	con.connect(function(err) {
		const f = `SELECT userId, tok FROM verif WHERE userId = ? AND tok = ?`;
		con.query(f, [tok, user], function (err, result) {
			if (resut) {
				const c = `UPDATE user SET valide=1 WHERE id=?`;
				con.query(c, [user], function (err, result) {
				});
			}
		});
	});
});
module.exports = router;
