const jwt = require('jsonwebtoken');
const secret = 'my-secret';
const  jwtDecode = require('jwt-decode');
const con = require('./dt.js');
const util = require('util');
const query = util.promisify(con.query).bind(con);

async function verify(req, res, next, tok) {
	const b = await query(`UPDATE user  SET ds = 1 WHERE id=?`,[tok.rr.id]).then((tt, err) => {
<<<<<<< HEAD
	}).catch(err => console.log(err));
=======
	}).catch();
>>>>>>> iffigues
	const v = await query(`SELECT id FROM user WHERE id = ?`,[tok.rr.id]).then((rr, tt) => {
		if (rr && rr.length) {
			next();
		} else {
			return res.status(401).send(JSON.stringify({code:1, msg:"L'utilisateur a été supprimé"}));
		}
<<<<<<< HEAD
	}).catch(err => console.log(err));
=======
	}).catch();
>>>>>>> iffigues
}

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
				verify(req,res,next,decoded);
			}
		});
	}
}
module.exports = withAuth;
