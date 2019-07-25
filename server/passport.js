const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const opts = {};
const mongo = require('mongodb').MongoClient;
var sanitinize = require('mongo-sanitize');

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

module.exports = passport => {
	passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
		client.connect(function(err) {
			assert.equal(null, err);
			const db = client.db('matchas');
			User = db.collection('user');
			User.findById(jwt_payload.id)
				.then(user => {
					if(user) {
						return done(null, user);
					}
					return done(null, false);
				}).catch(err => console.error(err));
		});
	}))
}
