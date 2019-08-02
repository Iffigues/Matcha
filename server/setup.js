const con = require("./db.js");

function createUser(use) {
	use.query(`CREATE TABLE IF NOT EXISTS user (
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		firstname VARCHAR(155) NOT NULL,
		lastname  VARCHAR(155) NOT NULL,
		password  VARCHAR(155) NOT NULL,
		email     VARCHAR(155) NOT NULL UNIQUE,
		username  VARCHAR(155) UNIQUE NOT NULL,
		gender int,
		active boolean DEFAULT 0
	)`, function (err, res) {
		if (err) throw err;
		use.query(`CREATE TABLE IF NOT EXISTS verif (
			id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
			userId int,
			tok VARCHAR(155) UNIQUE NOT NULL,
			FOREIGN KEY (userId) REFERENCES user(id)
		)`, function (err, res) {
			if (err) throw err;
		});
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
