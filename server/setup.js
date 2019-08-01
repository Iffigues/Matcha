const con = require("./db.js");

function createUser(use) {
	use.query(`CREATE TABLE IF NOT EXISTS user (
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		firstname VARCHAR(155) UNIQUE NOT NULL,
		lastname  VARCHAR(155) UNIQUE NOT NULL,
		password  VARCHAR(155) UNIQUE NOT NULL,
		username  VARCHAR(155) UNIQUE NOT NULL,
		gender int,
		active boolean
	)`, function (err, res) {
		if (err) throw err;
	});
}

con.connect(function(err) {
	if (err) throw err;
	con.query("CREATE DATABASE IF NOT EXISTS matcha", function (err, result) {
		if (err) throw err;
		con.changeUser({database : 'matcha'}, function(err) {
			  if (err) throw err;
				createUser(con);
		});
	});
})
