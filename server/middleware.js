const jwt = require('jsonwebtoken');
const secret = 'my-secret';
const  jwtDecode = require('jwt-decode');

const withAuth = function(req, res, next) {
	console.log("hahahaha");
	const token = req.params.token || req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;
	if (!token) {
		res.status(401).send(JSON.stringify({code:41, msg:'Unauthorized: No token provided'}));
	} else {
		jwt.verify(token, "my-secret", function(err, decoded) {
			if (err) {
				res.status(401).send(JSON.stringify({code:1,msg:'Unauthorized: Invalid token'}));
			} else {
				req.token = token;
				next();
			}
		});
	}
}
module.exports = withAuth;
