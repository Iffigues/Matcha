const faker = require('faker');
const con = require('./db.js');

function rr() {
	const f = `INSERT INTO user (firstname, lastname, password, email, username) VALUES (?, ?, ?, ?, ?, ?)`;
	con.connect(function(err) {
		for (let i = 0; i < 1000; i++) {
			let b = faker.fake("{{internet.password}}\1{{internet.email}}\1{{internet.userName}}\1{{name.lastName}}\1{{name.firstName}}\1{{address.latitude}}\1{{address.longitude}}");
			let c = b.split('\1');
			con.qurey(f,[c[4],c[3],c[0],c[1],c[2]]);
		}
	});
}
rr();
