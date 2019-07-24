function accept(db, tab, res, client) {
	const collection = db.collection("user");
	collection.findAndModify({$and:[{login: tab.log}, {token: tab.id}, {active: 0}]},
		[],
		{$set: {active: 1}},
		{},
		function(err, docs) {
		if (docs) {

		}
	})
}
module.exports.accept = accept;
