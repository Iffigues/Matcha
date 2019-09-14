const con = require('./dt.js');
const util = require('util');
const query = util.promisify(con.query).bind(con);

async function role (id) {
	let f = `SELECT * FROM user WHERE id = ?`;
	const rst = await query(f,id).then((rsts, err) => {
		return rsts;
	});
	if (rst && rst.length > 0) {
		let e = rst[0];
		if (e.lat && e.lng && e.birthdate && e.city && e.firstname && e.lastname) {
			let res = await query(`UPDATE user SET role = 'user' WHERE id = ?`, id).then((rd, err) => { 
				return 1;
			});
		} else {
			let res = await query(` UPDATE user SET role = 'peuser' WHERE id = ?`, id).then((rd, err) => {
				return 0;
			})
		}
		return res;
	}
	return 0;
}

module.exports = role;
