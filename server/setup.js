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
		userId int,
		woman boolean DEFAULT 0,
		man boolean DEFAULT 0,
		agender boolean DEFAULT 0,
		androgynous boolean DEFAULT 0,
		bigender boolean DEFAULT 0,
		genderfluid boolean DEFAULT 0,
		genderqueer boolean DEFAULT 0,
		gendernonconforming boolean DEFAULT 0,
		hijra boolean DEFAULT 0,
		intersex boolean DEFAULT 0,
		cisman boolean DEFAULT 0,
		ciswoman boolean DEFAULT 0,
		nonbinary boolean DEFAULT 0,
		pangender boolean DEFAULT 0,
		transfeminine boolean DEFAULT 0,
		transgender boolean DEFAULT 0,
		transman boolean DEFAULT 0,
		transmasculine boolean DEFAULT 0,
		transexual boolean DEFAULT 0,
		transwoman boolean DEFAULT 0,
		twospirit boolean DEFAULT 0,
		FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
	)`, function (err, res) {
		if (err) throw err;
	});
	use.query(`CREATE TABLE IF NOT EXISTS user_pref (
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		userID int,
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
		sapiosexual boolean DEFAULT 0,
		straight boolean DEFAULT 0,
		moreorientations boolean DEFAULT 0,
		FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
	)`,function (err, res) {
		if (err) throw err;
	});
	use.query(`CREATE TABLE IF NOT EXISTS user_geo (
		id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
		lat double,
		lon double
	)`,function(err,res){
		if (err) throw err;
	})
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
