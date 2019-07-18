function alola(db, tab, res) {
	const collection = db.collection('user');
	collection.find(tab).toArray(function(err, docs) {
		res.writeHeader(200, {'Content-Type':'application/json'});
		res.end(JSON.stringify(docs));
	});
}

module.exports.alola = alola;
