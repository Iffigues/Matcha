const faker = require('faker');
const con = require('./db.js');

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function sel(c, tab) {
	let r = "";
	for (let i = 0; i < c.length; i++){
		r = r + ",";
		r = r + c[i];
	};
	return r;
}

function counter(c) {
	let r = "";
	let b = c.length;
	for (let i = 0; i < b; i++) {
		r = r + ",";
		r = r+"1";
	}
	return r;
}


function getg() {
	return ["woman", "man", "agender", "androgynous", "bigender", "genderfluid", "genderqueer", "gendernonconforming", "hijra", "intersex", "cisman", "ciswoman", "nonbinary", "pangender", "transfeminine", "transgender", "transman", "transmasculine", "transexual", "transwoman", "twospirit"];
}

function getf() {
	return (["asexual", "bisexual", "demisexual", "gay", "homoflexible", "heteroflexible", "lesbian", "pansexual", "queer", "questioning", "sapiosexual", "straight", "moreorientations"]);
}

function getGenre(tar,bb) {
	let b = [];
	let e = getRandomInt(tar.length);
	while (e) {
		let c = getRandomInt(2);
		if (c) {
			let r = getRandomInt(getRandomInt(tar.length));
			if (!(b.includes(tar[r])))
				b.push(tar[r]);
		}
		e--;
	}
	return (b);
}

function rr() {
	const f = `INSERT INTO user (firstname, lastname, password, email, username) VALUES (?, ?, ?, ?, ?)`;
	con.connect(function(err) {
		if (err) throw err;
		for (let i = 0; i < 1000; i++) {
			let b = faker.fake("{{internet.password}}\1{{internet.email}}\1{{internet.userName}}\1{{name.lastName}}\1{{name.firstName}}\1{{address.latitude}}\1{{address.longitude}}");
			let c = b.split('\1');
			con.query(f,[c[4],c[3],c[0],c[1],c[2]],function (err, result, fields) {
				if (result && !err) {
					let id = result.insertId;
					let gs= getGenre(getg());
					let gc = getGenre(getf());
					let gg = "INSERT INTO user_genre (userId"+sel(gs, gs) +") VALUES (?"+counter(gs)+")";
					let haha = "INSERT INTO user_pref (userId"+sel(gc, gc)+") VALUES (?"+counter(gc)+")";
					con.query(gg, id, function (err, res) {
					});
					con.query(haha, id, function (err, res) {
					});
					con.query(`INSERT INTO user_geo (userId,lat,lon) VALUES (?,?,?)`, [id, c[5],c[6]], function (err, res) {
						if (err) throw err;
					});
				}
			});
		}
	});
}
rr();
