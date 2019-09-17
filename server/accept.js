const con = require('./dt.js');
const express = require('express');
const  router = express.Router();

router.get("/:id/:tok", function (req, res) {
	let tok = req.params.tok;
	let user = req.params.id;
	con.connect(function(err) {
		const f = `DELETE FROM verif WHERE userId = ? AND tok = ?`;
		con.query(f, [user, tok], function (err, result) {
			const c = `UPDATE user SET active = 1 WHERE id= ?`;
			if (result.affectedRows && !err) {
				con.query(c, [user], function (err, results) {
					if (!err && results && results.affectedRows) {
						res.redirect("http://localhost:3000/login/validated");
					} else {
						res.redirect("http://localhost:3000/register/non-validated");
					}
				});
			} else {
				res.redirect("http://localhost:3000/login/validated");
			}
		});
	});
});
module.exports = router;
