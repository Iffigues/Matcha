const bcrypt = require('bcrypt');
const saltRounds = 10;


const googleMapsClient = require('@google/maps').createClient({
	  key: 'your API key here'
});

function user(tab, hash) {
	let user = {};
	user.login = tab.login;
	user.pwd = hash;
	user.email = tab.email
	return user;
}

function register(db, tab, res, client) {
	bcrypt.hash(tab.pwd, saltRounds, (err, hash) => {
		let r = user(tab, hash);
		const collection = db.collection('user');
		collection.findOne({$or:[{login: r.login}, {email: r.email}]}, function(err, docs){
			if (!docs) {
				collection.insertOne(r, function(err, rest) {
					console.log(err);
				});
			}
		});
	});
	res.end();
}

module.exports.register = register;
