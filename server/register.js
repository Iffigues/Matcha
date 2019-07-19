const bcrypt = require('bcrypt');
const saltRounds = 10;

function user(tab, hash) {
	let user = {};
	user.login = tab.login;
	user.pwd = hash;
	user.email = tab.mail
	return user;
}

function register(db, tab, res, client) {
	bcrypt.hash(tab.pwd, saltRounds, function(err, hash) {
		let r = user(tab, hash);
		const collection = db.collection('user');
		collection.insertOne(r, function(err, res) {
			console.log(err);
			client.close();
		});
	});
	res.end();
}

module.exports.register = register;
