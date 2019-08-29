const con = require('./dt.js');

const userAuth = function(req, res, next) {
	con.connect(function(err) {
		let f = `SELECT COUNT(*) FROM bloque WHERE userId = ? AND bloqueId =?`;
		let r = req.body.id;
		var decoded = jwtDecode(req.token);
		con.query(f,[r, decoded.rr.id], function (err, result) {
			if (err)
				return res.status(401).send(JSON.stringify({code:2, msg:'error occured'}));
			req.bloquer = 0;
			if (result.length)
				req.bloquer = 1;
			next();
		});
	});
}
module.exports = userAuth;
