const jwt = require('jsonwebtoken');
const secret = 'my-secret';
const withAuth = function(req, res, next) {
	if (!req.session.login['co']) {
		res.status(401).send("Merde");
		return ;
	}
	const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;
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
