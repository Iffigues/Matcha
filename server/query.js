const bcrypt = require('bcrypt');
const saltRounds = 10;

function alola(db, tab, res, client) {
	let b = 400;
	let p = "not good"
	const collection = db.collection('user');
	collection.findOne({login: tab.login}, function(err, docs) {
		console.log(docs);
	if (docs) {
			bcrypt.compare(tab.pwd, docs.pwd, function(err, ress) {
				console.log(err);
				    if (ress === true) {
					    console.log(ress);
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

module.exports.alola = alola;