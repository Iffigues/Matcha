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
	return ["fox", "wolf", "dog", "dragon", "cat", "rabbit", "horse", "skunk", "otter", "bear", "coyotte", "hyena", "bird", "rat", "kangaroo", "gryphon", "ferret", "dinosaur", "squirrel", "jackal", "deer", "bat", "insect", "fish"];
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
					let fff = getRandomInt(2) + 1;
					let fer = getRandomInt(3) + 1;
					let gg = "INSERT INTO user_genre (userId, sexe "+sel(gs, gs) +") VALUES (?,"+fff.toString()+counter(gs)+")";
					let haha = "INSERT INTO user_pref (userId,sexe "+sel(gs, gs)+") VALUES (?,"+fer.toString()+counter(gs)+")";
					console.log(gg);
					console.log(haha);
					con.query(gg, id, function (err, res) {
						if (err) throw err;
					});
					con.query(haha, id, function (err, res) {
						if (err) throw err;
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
