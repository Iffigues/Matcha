const jwt = require('jsonwebtoken');
const secret = 'my-secret';
const withAuth = function(req, res, next) {
	if (!req.session.co) {
		console.log(req.session);
		res.status(401).send(JSON.stringify({code:1,msg:"you are not log"}));
		return ;
	}
	if (req.session.user['role'] != "admin") {
		res.status(402).send(JSON.stringify({code:1,msg:"you are not admin"}));
		return ;
	}
	const token = req.params.token || req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;
	if (!token) {
		res.status(401).send('Unauthorized: No token provided');
	} else {
		jwt.verify(token, "my-secret", function(err, decoded) {
			if (err) {
				res.status(401).send('Unauthorized: Invalid token');
			} else {
				res.token = jwt.sign(jwt.decode(token), "my-secret", {})
				next();
			}
		});
	}
}
module.exports = withAuth;
