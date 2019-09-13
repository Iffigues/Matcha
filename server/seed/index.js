const faker = require('faker');
const bcrypt = require('bcryptjs');
const con = require('./db.js');
var nodemailer = require('nodemailer');

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function rr() {
	const f = `INSERT INTO user (firstname, lastname, password, email, username, city, sexe, lat, lng, preferences, profilephoto, popularity , birthdate,active,role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,? ,1, 'user')`;
	con.connect(function(err) {
		if (err) throw err;
		for (let i = 0; i < 1000; i++) {
			let b = faker.fake("{{internet.email}}\1{{internet.userName}}\1{{name.lastName}}\1{{name.firstName}}\1{{address.latitude}}\1{{address.longitude}}\1{{address.city}}");
			let c = b.split('\1');
			bcrypt.hash("123456789", 10, function(err, hash) {
				con.query(f,[c[3],c[2],hash,c[0],c[1], c[6], getRandomInt(3) + 1, c[4],c[5], getRandomInt(3) + 1, 0, getRandomInt(400), faker.date.between('1960-01-01', '2001-12-31')],function (err, result, fields) {
					console.log(err)
					if (result && !err) {
						con.query("INSERT INTO img (userId, path) VALUES (?,?)",[result.insertId, "../public/photo/user"+getRandomInt(501)+".png"] , function (err, rp) {
							con.query("UPDATE user SET profilephoto=? WHERE id=?", [rp.insertId, result.insertId], function (err, resf) {
							});
						})
					}
				});
			});
		}
	});
}
rr();
