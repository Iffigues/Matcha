const TokenGenerator = require('uuid-token-generator');
const sendmail = require('sendmail')();
const bcrypt = require('bcrypt');
const saltRounds = 10;


const googleMapsClient = require('@google/maps').createClient({
	key: 'your API key here'
});

function user(tab, hash) {
	let user = {};
	const tokgen = new TokenGenerator();
	user.login = tab.login;
	user.pwd = hash;
	user.email = tab.email;
	user.active = 0;
	user.token = tokgen.generate();
	return user;
}

function sendmai(token){
	sendmail({
		from: 'no-reply@yourdomain.com',
		to: 'iffigues@vivaldi.net',
		subject: 'test sendmail',
		html: "<html><head></head><body><a href=\"http://gopiko.fr:8080/?token="+token+"\">https://gopiko.fr:3000/?token="+token+"</a></body></html>",
	}, function(err, reply) {
		console.log(err && err.stack);
		console.dir(reply);
	});
}

function register(db, tab, res, client) {
	bcrypt.hash(tab.pwd, saltRounds, (err, hash) => {
		let r = user(tab, hash);
		const collection = db.collection('user');
		collection.findOne({$or:[{login: r.login}, {email: r.email}]}, function(err, docs){
			if (!docs) {
				collection.insertOne(r, function(err, rest) {
					sendmai(docs.token);
				});
			}
		});
	});
	res.end();
}

module.exports.register = register;
