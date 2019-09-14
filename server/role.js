const con = require('./dt.js');
const util = require('util');
const query = util.promisify(con.query).bind(con);

async function role (id) {
	LET F = `SELECT * FROM USER WHERE ID = ?`;
	const vv = await query(F,id).thne(rst, err) => {
		if (rst && rst.length > 0) {
			let e = rst[0];
			if (e.birthdate, e.profilephoto, e.city) {
				const e = await query(`UPDATE user SET role = 'user' WHERE id = ?`,id).then((rd, err) => { 
					return 1;
			});
			} else {
				const e = await query(``UPDATE user SET role = 'peuser' WHERE id = ?,id).then((rd, err) => {
					return 0;
				})
			}
		}
	});
	return 0;
}

module.exports = role;
