const con = require('./dt.js');
const util = require('util');
const query = util.promisify(con.query).bind(con);

async function role (id) {
	let f = `SELECT * FROM USER WHERE ID = ?`;
<<<<<<< HEAD
	const vv = await query(F,id).then((rst, err) => {
		if (rst && rst.length > 0) {
			let e = rst[0];
			if (e.birthdate, e.profilephoto, e.city) {
				const e = await query(`UPDATE user SET role = 'user' WHERE id = ?`,id).then((rd, err) => { 
					return 1;
				});
			} else {
				const e = await query(`UPDATE user SET role = 'peuser' WHERE id = ?`,id).then((rd, err) => {
					return 0;
				});
			}
=======
	const rst = await query(f,id).then((rsts, err) => {
		return rsts;
	});
	if (rst && rst.length > 0) {
		let e = rst[0];
		if (e.lat && e.lng && e.birthdate && e.city && e.firstname && e.lastname) {
			const res = await query(`UPDATE user SET role = 'user' WHERE id = ?`, id).then((rd, err) => { 
				return 1;
			});
		} else {
			const res = await query(` UPDATE user SET role = 'peuser' WHERE id = ?`, id).then((rd, err) => {
				return 0;
			})
>>>>>>> iffigues
		}
		return res;
	}
	return 0;
}

module.exports = role;
