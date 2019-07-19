const bcrypt = require('bcrypt');
const saltRounds = 10;

function alola(db, tab, res, client) {
	let b = 400;
	let p = "not good"
	const collection = db.collection('user');
	collection.findOne({login: tab.login}, function(err, docs) {
	if (docs) {
			bcrypt.compare(tab.pwd, docs.pwd, function(err, res) {
				    if (res === true) {
					    this.b = 200;
					    this.p = "user is connected";
				    }
			});
		}
		res.writeHeader(b,{"Conten-Type":"text/plain"});
		res.end(p);
		client.close();
	});
}

module.exports.alola = alola;
