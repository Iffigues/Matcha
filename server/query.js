const bcrypt = require('bcrypt');
const saltRounds = 10;

function login(db, tab, res, client) {
	let b = 400;
	let p = "not good"
	const collection = db.collection('user');
	collection.findOne({login: tab.login}, (err, docs) => {
		if (docs && docs.active) {
			bcrypt.compare(tab.pwd, docs.pwd, (err, ress) => {
				console.log(err);
				if (ress === true) {
					this.b = 200;
					this.p = "user is connected";
					res.writeHeader(200,{"Content-Type":"application:json"});
					res.end(JSON.stringify(docs));
					return;
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
