const jwt = require('jsonwebtoken');
const secret = 'my-secret';
const  jwtDecode = require('jwt-decode');
const con = require('./dt.js');


function twoDigits(d) {
	    if(0 <= d && d < 10) return "0" + d.toString();
	    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
	    return d.toString();
}

Date.prototype.toMysqlFormat = function() {
	    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

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
					con.query(`UPDATE user  SET ds = 1 WHERE id=?`,[decoded.rr.id], function (err, result) {
						console.log(err);
					});
				});
				next();
			}
		});
	}
}
module.exports = withAuth;
