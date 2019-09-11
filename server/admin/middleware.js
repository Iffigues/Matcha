const jwt = require('jsonwebtoken');
const secret = 'my-secret';
const con = require('../dt.js');
var jwtDecode = require('jwt-decode');
const util = require('util');
const query = util.promisify(con.query).bind(con);


async function fete(req, res, next, decoded, token) {
	const ee = await query("SELECT role FROM user WHERE id =?", decoded.rr.id);
	if (ee[0].role != "admin") {
		res.status(401).send({code:3, msg:"You are not an administrator"});
	} else {
		res.token = jwt.sign(jwt.decode(token), "my-secret", {})
		next();

	}
}

const withAuth =  function(req, res, next) {
	const token = req.params.token || req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;
	if (!token) {
		res.status(401).send('Unauthorized: No token provided');
	} else {
		jwt.verify(token, "my-secret", function(err, decoded) {
			if (err) {
				res.status(401).send('Unauthorized: Invalid token');
			} else {
					fete(req,res,next,decoded, token);
				}
		});
	}
}
module.exports = withAuth;
