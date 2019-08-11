const con = require("../dt.js");
function email(req, res, id) {
	let f = `UPDATE user SET email = ? WHERE id = ?`;
	let mail = req.body.email;
	con.connect(function(err) {
		con.query(f, [mail,id], function(err, res) {
		});
	});
}
module.exports = email;
