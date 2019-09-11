const con = require('./dt.js');

function isC (a, b) {
	if (!a)
		return true;
	var d = new Date(a);
	var diff = Math.abs(b - a);
	if (diff < 30 * 60 * 1000)
		return true;
	return false;
}

function notif(me, who, type, mess) {
	if (me.id != who) {
		con.connect(function (err){
			let f = `SELECT COUNT(*) AS d FROM bloque WHERE userId = ? AND bloqueId = ?`;
			con.query(f, [who, me.id],function (err, res){
				if (!err && res[0].d == 0) {
					con.query(`SELECT * FROM notif  WHERE userId = ? AND who = ? AND type = ? ORDER BY date DESC`,[me.id, who, type], function (err,ttt) {
						let g = `INSERT INTO notif (type, userId, who) VALUES (?,?,?)`;
						let b = 1;
						if (ttt && ttt.length) {
							let k = ttt[0];
							if (isC(k.date, Date.now()))
								b = 0;
						}
						if (b)
							con.query(g,[type,me.id, who], function (err, res) {
								con.query(`UPDATE user SET popularity = popularity + 1 WHERE id = ?`,who,function (err, rts) {
								});
							});
					});
				}
			});
		});
	}
}

module.exports = notif;
