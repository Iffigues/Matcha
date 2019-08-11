const con = require("./db.js");

function createUser(use) {
	use.query(`CREATE TABLE IF NOT EXISTS user (
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		firstname VARCHAR(155) NOT NULL,
		lastname  VARCHAR(155) NOT NULL,
		password  VARCHAR(155) NOT NULL,
		email     VARCHAR(155) NOT NULL UNIQUE,
		username  VARCHAR(155) UNIQUE NOT NULL,
		active boolean DEFAULT 0
	)`, function (err, res) {
		if (err) throw err;
		use.query(`CREATE TABLE IF NOT EXISTS verif (
			id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
			userId int,
			tok VARCHAR(155) UNIQUE NOT NULL,
			FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
		)`, function (err, res) {
			if (err) throw err;
		});
	});
	use.query(`CREATE TABLE IF NOT EXISTS user_genre (
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		userId int NOT NULL UNIQUE,
		sexe boolean DEFAULT 0,
		fox  boolean DEFAULT 0,
		wolf boolean DEFAULT 0,
		dog boolean DEFAULT 0,
		dragon boolean DEFAULT 0,
		cat boolean DEFAULT 0,
		big cats boolean DEFAULT 0,
		rabbit boolean DEFAULT 0,
		horse boolean DEFAULT 0,
		skunk boolean DEFAULT 0,
		otter boolean DEFAULT 0,
		bear boolean DEFAULT 0,
		coyotte boolean DEFAULT 0,
		hyena boolean DEFAULT 0,
		bird boolean DEFAULT 0,
		rat boolean DEFAULT 0,
		kangaroo boolean DEFAULT 0,
		gryphon boolean DEFAULT 0,
		ferret boolean DEFAULT 0,
		dinosaur boolean DEFAULT 0,
		squirrel boolean DEFAULT 0,
		jackal boolean DEFAULT 0,
		deer boolean DEFAULT 0,
		bat boolean DEFAULT 0,
		insect boolean DEFAULT 0,
		fish boolean DEFAULT 0
		FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
	)`, function (err, res) {
		if (err) throw err;
	});
	use.query(`CREATE TABLE IF NOT EXISTS user_pref (
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		userID int NOT NULL UNIQUE,
		asexual boolean DEFAULT 0,
		bisexual boolean DEFAULT 0,
		demisexual boolean DEFAULT 0,
		gay boolean DEFAULT 0,
		homoflexible boolean DEFAULT 0,
		heteroflexible boolean DEFAULT 0,
		lesbian boolean DEFAULT 0,
		pansexual boolean DEFAULT 0,
		queer boolean DEFAULT 0,
		questioning boolean DEFAULT 0,
		straight boolean DEFAULT 0,
		FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
	)`,function (err, res) {
		if (err) throw err;
	});
	use.query(`CREATE TABLE IF NOT EXISTS user_geo (
		id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
		userId int NOT NULL UNIQUE,
		lat double,
		lon double,
		FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
	)`,function(err,res){
		if (err) throw err;
	});
	use.query(`CREATE TABLE IF NOT EXISTS recover (
		id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
		userId int NOT NULL UNIQUE,
		tok VARCHAR(155) NOT NULL UNIQUE,
		password VARCHAR(155) NOT NULL,
		FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
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
