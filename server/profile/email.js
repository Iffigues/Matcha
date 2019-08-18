var jwtDecode = require('jwt-decode');
const con = require('../dt.js');

function firstname(req, res) {
	let f = "UPDATE user SET email = ? WHERE id = ?";
	var decoded = jwtDecode(req.token);	
	con.connect(function (err) {
		con.query(f,[req.body.email , decoded.rr.id], function(err, result) {
					res.status(200).send(JSON.stringify({code:0,msg:"operation reussie"}));
		});
	});
}
module.exports = firstname;
