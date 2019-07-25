const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const tok = require('./tok');

function login(db, tab, res, client) {
	let b = 400;
	let p = "not good"
	console.log(tab);
	const collection = db.collection('user');
	collection.findOne({login: tab.login}, (err, docs) => {
		if (docs && docs.active) {
			bcrypt.compare(tab.pwd, docs.pwd, (err, ress) => {
				console.log(ress);
				if (ress === true) {
					toke = new tok();
					this.b = 200;
					this.p = "user is connected";
					const payload = { docs };
					const token = jwt.sign(payload, 'my-secret', {
						expiresIn: '1h'
					});
					console.log("hahaha");
					res.cookie('token', token, { httpOnly: true })
						.sendStatus(200);
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
