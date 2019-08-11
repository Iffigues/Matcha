function suj() {
	let f = `SELECT *, 3956 * 2 * ASIN(SQRT(POWER(SIN((? - abs(lat)) * pi()/180 / 2),2) + COS(? * pi()/180 ) * COS(abs(lat) *pi()/180) * POWER(SIN((? - lng) *pi()/180 / 2), 2) ))  as distance FROM user_geo WHERE userId = ? having distance < 10000000  ORDER BY distance`;
}
