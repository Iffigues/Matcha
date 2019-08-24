const faker = require('faker');
const con = require('./db.js');
var nodemailer = require('nodemailer');

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function rr() {
	const f = `INSERT INTO user (firstname, lastname, password, email, username, city, sexe, lat, lng, preferences, profilephoto, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,? ,1)`;
	con.connect(function(err) {
		if (err) throw err;
		for (let i = 0; i < 1000; i++) {
			let b = faker.fake("{{internet.password}}\1{{internet.email}}\1{{internet.userName}}\1{{name.lastName}}\1{{name.firstName}}\1{{address.latitude}}\1{{address.longitude}}\1{{address.city}}");
			let c = b.split('\1');
			con.query(f,[c[4],c[3],"123456789",c[1],c[2], c[7], getRandomInt(3), c[5],c[6], getRandomInt(2), "/public/uploadsIMAGE-1566061394435.jpg"],function (err, result, fields) {
				console.log(err);
				if (result && !err) {
					
				}
			});
		}
	});
}
rr();
