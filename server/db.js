var mysql = require('mysql');

var con = mysql.createConnection({
	host: "192.168.99.100",
	user: "root",
	password: "root"
});

module.exports  = con;
