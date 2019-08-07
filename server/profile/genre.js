function tab() {
	return ["woman", "man", "agender", "androgynous", "bigender", "genderfluid", "genderqueer", "gendernonconforming", "hijra", "intersex", "cisman", "ciswoman", "nonbinary", "pangender", "transfeminine", "transgender", "transman", "transmasculine", "transexual", "transwoman", "twospirit"];
}

function sel(c) {
	let r = "";
	let t = 0;
	let tab = arr();
	c.forEach(function(elem) {
		if (tab.includes(elem)) {
			if (t)
				r = r + ",";
			r = r + elem;
			t = 1;
		}
	});
	return r;
}

function counter(c) {
	let r = "";
	let b = c.length;
	for (let i = 0; i < b; i++) {
		if (i)
			r = r + ",";
		r = r+"1";
	}
	return r;
}

function up(c) {
	let r = "";
	let b = 0;
	let tab = arr();
	c = forEach(function (elem) {
		if (tab.includes(elem)) {
			if (b)
				r = r + ",";
			r = r + elem + "=" + "?"
		}
	});
	return r;
}

function types(a, c) {
	if (a)
		return ("INSERT INTO user_genre ( userId, "+sel(c) +") VALUES (?, "+counter(c)+")");
	return ("UPDATE user_genre SET "+up(c) + "userId = ?");
}

function genre(a,c) {

}
module.exports = genre;
