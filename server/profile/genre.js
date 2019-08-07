function arr() {
	return ["woman", "man", "agender", "androgynous", "bigender", "genderfluid", "genderqueer", "gendernonconforming", "hijra", "intersex", "cisman", "ciswoman", "nonbinary", "pangender", "transfeminine", "transgender", "transman", "transmasculine", "transexual", "transwoman", "twospirit"];
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
	let b = c.length;
	if (c)
	for (let i = 0; i < b; i++) {
		r = r + ",";
		r = r+"1";
	}
	return r;
}

function up(c) {
	let r = "";
	let b = 0;
	let tab = arr();
	for (let i = 0; i < c.length; i++) {
		if (tab.includes(c[i])) {
			if (b)
				r = r + ",";
			r = r + c[i] + "=" + "?"
		}
	};
	return r;
}

function types(a, c) {
	if (a)
		return ("INSERT INTO user_genre ( userId"+sel(c) +") VALUES (?"+counter(c)+")");
	return ("UPDATE user_genre SET "+up(c) + "userId = ?");
}

function genre(a,c) {
	return (types(a,c));
}
module.exports = genre;
