function arr() {
	return ["fox", "wolf", "dog", "dragon", "car", "big cats", "rabbit", "horse", "skunk", "otter", "bear", "coyotte", "hyena", "bird", "rat", "kangaroo", "gryphon", "ferret", "dinosaur", "squirrel", "jackal", "deer", "bat", "insect", "fish"];
}

function sel(c) {
	let r = "";
	let t = 0;
	let tab = arr();
	if (c)
		for (let i = 0; i < c.length; i++){
			if (tab.includes(c[i])) {
				r = r + ",";
				r = r + c[i];
				t = 1;
			}
		};
	return r;
}

function counter(c) {
	let r = "";
	if (c) {
		let b = c.length;
		for (let i = 0; i < b; i++) {
			r = r + ",";
			r = r+"1";
		}
	}
	return r;
}

function up(c) {
	let r = "";
	let b = 0;
	let tab = arr();
	for (let i in c) {
		if (tab.includes(i)) {
			if (b)
				r = r+",";
			r = r+i+"="+c[i].toString();
			b = 1;
		}
	};
	return r;
}

function types(y,a, c) {
	let r = "";
	if (y) 
		r = "user_genre";
	else
		r = "user_pref";
	if (a)
		return ("INSERT INTO "+r+" ( userId, sexe"+sel(c) +") VALUES (?,?"+counter(c)+")");
	return ("UPDATE "+r+" SET "+up(c)+" WHERE userId = ?");
}

function genre(a,c, y) {
	return (types(a,c,y));
}
module.exports = genre;
