const bcrypt = require('bcrypt');
const saltRounds = 10;

function user(tab, hash) {
	let user = {};
	user.login = tab.login;
	user.pwd = hash;
	user.email = tab.email
	return user;
}

function register(db, tab, res, client) {
	bcrypt.hash(tab.pwd, saltRounds, function(err, hash) {
		let r = user(tab, hash);
		const collection = db.collection('user');
		collection.insertOne(r, function(err, res) {
			console.log(err);
			collection.createIndexes( { "login": 1 }, { unique: true }, function(err, res){
				collection.createIndexes( { "email": 1 }, { unique: true }, function(err, res){
				})
			})
		});
	});
	res.end();
}

module.exports.register = register;
