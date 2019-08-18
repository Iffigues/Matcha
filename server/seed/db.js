var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "iffigues",
	password: "Marie1426",
	database: "matcha"
});

module.exports  = con;
