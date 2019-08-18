function suj() {
	// api = AIzaSyBS2V8xJYNTWhfEFaW7SW0mvOJfoZ1mmI8
	let f = `SELECT *, 3956 * 2 * ASIN(SQRT(POWER(SIN((? - abs(lat)) * pi()/180 / 2),2) + COS(? * pi()/180 ) * COS(abs(lat) *pi()/180) * POWER(SIN((? - lng) *pi()/180 / 2), 2) ))  as distance FROM user WHERE id  having distance < 10000000  ORDER BY distance AND sexe = ? AND preference = ?`;
}
