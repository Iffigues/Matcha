const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const passport = require('./passport.js');

function login(db, tab, res, client) {
	let b = 400;
	let p = "not good"
	const collection = db.collection('user');
	collection.findOne({login: tab.login}, (err, docs) => {
		if (docs && docs.active) {
			bcrypt.compare(tab.pwd, docs.pwd, (err, ress) => {
				if (ress === true) {
					const payload = {
						id: user.id,
						name: user.name,
						avatar: user.avatar
					}
					jwt.sign(payload, 'secret', {
						expiresIn: 3600
					}, (err, token) => {
						this.b = 200;
						this.p = "user is connected";
						res.json({
							success: true,
							token: `Bearer ${token}`
						});
						return;
					});
				}
			});

		} else {
			res.end();
		}
		//res.writeHeader(b,{"Conten-Type":"text/plain"});
		//res.end(p);
	});
}

module.exports.login = login;
