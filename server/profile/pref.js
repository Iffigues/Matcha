function arr() {
	return (["asexual", "bisexual", "demisexual", "gay", "homoflexible", "heteroflexible", "lesbian", "pansexual", "queer", "questioning", "sapiosexual", "straight", "moreorientations"]);
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
				r = r + ",";
			r = r+i+"="+c[i].toString();
			b = 1;
		}
	};
	return r;
}

function types(a, c) {
	if (a)
		return ("INSERT INTO user_pref ( userId"+sel(c) +") VALUES (?"+counter(c)+")");
	return ("UPDATE user_pref SET "+up(c) +" WHERE userId = ?");
}

function genre(a,c) {
	return (types(a,c));
}
module.exports = genre;
