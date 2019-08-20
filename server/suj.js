const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
const middles = require("./middleware.js");
var jwtDecode = require('jwt-decode');

router.use(middles);

router.get("/",function (req, res) {
	let g = `SELECT * FROM user WHERE id = ?`;
	var decoded = jwtDecode(req.token);
		let f = `SELECT *, 3956 * 2 * ASIN(SQRT(POWER(SIN((? - abs(lat)) * pi()/180 / 2),2) + COS(? * pi()/180 ) * COS(abs(lat) *pi()/180) * POWER(SIN((? - lng) *pi()/180 / 2), 2) ))  as distance, tag.tag, tag.userId, img.path, (SELECT COUNT(id) FROM tag WHERE tag.tag = tag.tag AND tag.userId = ? ) as TT, (SELECT id FROM likes) as lolo 
	FROM user 
	LEFT JOIN tag as tag ON tag.userId = user.id 
	LEFT JOIN  img as img ON img.userId = user.id 
	INNER JOIN likes as likes ON likes.userOne = user.id
	WHERE sexe = ? AND preferences = ?   
	GROUP BY user.username having distance < 100000000`;
	con.connect(function (err) {
		con.query(g, [decoded.rr.id], function (err, result) {
			console.log(err);
			if (!err && result) {
				let d = result[0];
				con.query(f, [d.lat, d.lng, d.lng, d.id, d.sexe, d.preferences,d.id], function (err, result1)  {
					console.log(err);
					res.status(200).send({code:0, user:result1});
				});
			}
		})
	});
});

module.exports = router;
