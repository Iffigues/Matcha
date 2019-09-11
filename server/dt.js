var mysql = require('mysql');

var con = mysql.createConnection({
	host: '127.0.0.1',
	user: "iffigues",
	password: "Marie1426",
	database: "matcha"
});

module.exports  = con;
