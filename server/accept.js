const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
router.post("/:id/:tok", function (req, res) {
	let tok = req.body.tok;
	let user = req.body.id;
	con.connect(function(err) {
		const f = `DELETE FROM verif WHERE userId = ? AND tok = ?`;
		con.query(f, [user, tok], function (err, result) {
			const c = `UPDATE user SET valide=1 WHERE id=?`;
			if (result && !err)
				con.query(c, [user], function (err, result) {
				});
		});
	});
});
module.exports = router;
