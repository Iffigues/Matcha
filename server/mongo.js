const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var sanitize = require('mongo-sanitize');

const url = 'mongodb://localhost:27017';
const dbName = 'matcha';
const client = new MongoClient(url,{ useNewUrlParser: true });

function query(callback, tab, res) {
	client.connect(function(err) {
		assert.equal(null, err);
		const db = client.db(dbName);
		callback(db, tab, res);
		client.close();
	});
}

module.exports.query = query;
