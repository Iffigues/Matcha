function alola(db, login) {
	const collection = db.collection('user');
	collection.find({'login': login}).toArray(function(err, docs) {
		assert.equal(err, null);
		console.log("Found the following records");
		console.log(docs);
		return (docs);
	});
}

module.exports.alola = alola;
