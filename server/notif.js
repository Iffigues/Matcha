const con = require('./dt.js');

function notif(me, who, type, mess) {
	con.connect(function (err){
		let f = `SELECT COUNT(*) AS d FROM bloque WHERE userId = ? AND bloqueId = ?`;
		con.query(f, [who, me.id],function (err, res){
			console.log(err);
			console.log(res[0].d)
			if (!err && res[0].d == 0) {
				let g = `INSERT INTO notif (type, userId, who,message) VALUES (?,?,?,?)`;
				con.query(g,[type,me.id, who,mess], function (err, res) {
					console.log(err);
				});
			}
		});
	});
}

module.exports = notif;
