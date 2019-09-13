const con = require("./db.js");

function createUser(use) {
	use.query(`CREATE TABLE IF NOT EXISTS user (
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		firstname VARCHAR(155) NOT NULL,
		birthdate DATE,
		lastname  VARCHAR(155) NOT NULL,
		password  VARCHAR(155) NOT NULL,
		email     VARCHAR(155) NOT NULL UNIQUE,
		username  VARCHAR(155) UNIQUE NOT NULL,
		bio 	LONGTEXT,
		lat 	double,
		lng 	double,
		city	VARCHAR(255),
		sexe	int DEFAULT 1,
		preferences int DEFAULT 3,
		profilephoto  int,
		popularity int DEFAULT 1,
		role ENUM ("preuser", "user" ,"admin") DEFAULT "preuser",
		visited  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		completed boolean DEFAULT false,
		ds int,
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
		use.query(`CREATE TABLE IF NOT EXISTS recover (
			id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
			userId int NOT NULL UNIQUE,
			tok VARCHAR(155) NOT NULL UNIQUE,
			FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
		)`, function (err, res) {
			if (err) throw err;
		});
		use.query(`CREATE TABLE IF NOT EXISTS tag (
			id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
			userId int NOT NULL,
			tag VARCHAR(30) NOT NULL,
			FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE,
			UNIQUE KEY tag (tag,userId)
		)`, function (err, res)  {
			if (err) throw err;
		});
		use.query(`CREATE TABLE IF NOT EXISTS img (
			id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
			userId int NOT NULL,
			path varchar(155) NOT NULL,
			FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
		)`, function(err, res) {
			if (err) throw err;
		});
		use.query(`CREATE TABLE IF NOT EXISTS furry (
			id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
			userId int NOT NULL,
			name VARCHAR(155) NOT NULL,
			FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE,
			UNIQUE KEY name (name, userId)
	)`, function (err, res) {
		if (err) throw err;
	});
	use.query(`CREATE TABLE IF NOT EXISTS furry_pref (
		id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
		userId int NOT NULL,
		furryId int NOT NULL,
		FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE,
		FOREIGN KEY (furryId) REFERENCES furry(id) ON DELETE CASCADE,
		UNIQUE KEY furrys (userId, furryId)
		
	)`, function (err, res) {
		if (err) throw err;
	});
	use.query(`CREATE TABLE IF NOT EXISTS likes (
		id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
		userOne int NOT NULL,
		userTwo int NOT NULL,
		accept int DEFAULT 0,
		FOREIGN KEY (userOne) REFERENCES user(id) ON DELETE CASCADE,
		FOREIGN KEY (userTwo) REFERENCES user(id) ON DELETE CASCADE,
		UNIQUE  KEY liker (userOne, userTwo)
	)`, function (err, res) {
		if (err) throw err;
	});
	use.query(`CREATE TABLE IF NOT EXISTS bloque (
		id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
		userId int NOT NULL,
		bloqueId int NOT NULL,
		FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE,
		FOREIGN KEY (bloqueId) REFERENCES user(id) ON DELETE CASCADE,
		UNIQUE KEY bloc (userId, bloqueId)
	)`, function (err, res) {
		if (err) throw err;
	});
	use.query(`CREATE TABLE IF NOT EXISTS notif (
		id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
		type VARCHAR(50),
		userId int NOT NULL,
		who	int NOT NULL,
		look	boolean DEFAULT 0,
		date 	TIMESTAMP default now(),
		FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
	)`, function (err, res) {
		if (err) throw err;
	});
	use.query(`CREATE TABLE IF NOT EXISTS report (
		id int 	AUTO_INCREMENT PRIMARY KEY,
		UserId int NOT NULL,
		who int NOT NULL,
		date TIMESTAMP DEFAULT now(),
		FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE,
		FOREIGN KEY (who) REFERENCES user(id) ON DELETE CASCADE,
		UNIQUE KEY bloc	 (userId, who)
	)`,function (err, res) {
		if (err) throw err;
	});
	use.query(`CREATE TABLE IF NOT EXISTS messages (
			id int  AUTO_INCREMENT PRIMARY KEY,
			userOne int NOT NULL,
			userTwo int NOT NULL,
			message LONGTEXT,
			date TIMESTAMP DEFAULT now(),
			look boolean DEFAULT false
	)`, function (err, res) {
		if (err) throw err;
	});
	use.query(`DROP FUNCTION IF EXISTS haversine`, function (err, res) {
		if (err) throw err;
		use.query(`CREATE FUNCTION haversine(
			        lat1 FLOAT, lon1 FLOAT,
			        lat2 FLOAT, lon2 FLOAT
			     ) RETURNS FLOAT
			    NO SQL DETERMINISTIC
			BEGIN
			    RETURN DEGREES(ACOS(
				                  COS(RADIANS(lat1)) *
				                  COS(RADIANS(lat2)) *
				                  COS(RADIANS(lon2) - RADIANS(lon1)) +
				                  SIN(RADIANS(lat1)) * SIN(RADIANS(lat2))
				                ));
			END`,function (err, rt) {
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
