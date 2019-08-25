const jwt = require('jsonwebtoken');
const secret = 'my-secret';
const  jwtDecode = require('jwt-decode');
const con = require('./dt.js');

const withAuth = function(req, res, next) {
	const token = req.params.token || req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;
	if (!token) {
		return res.status(401).send(JSON.stringify({code:41, msg:'Unauthorized: No token provided'}));
	} else {
		jwt.verify(token, "my-secret", function(err, decoded) {
			if (err) {
				return res.status(401).send(JSON.stringify({code:1,msg:'Unauthorized: Invalid token'}));
			} else {
				req.token = token;
				con.connect(function (err) {
					con.query(`UPDATE user SET visited = CURRENT_TIMESTAMP WHERE id = ?`,decoded.rr.id, function (err, result) {
						
					});
				});
				next();
			}
		});
	}
}
module.exports = withAuth;
