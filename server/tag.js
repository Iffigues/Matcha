const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
const middles = require("./middleware.js");

router.use(middles);

function sel(con, tag, req) {
	let f = `SELECT * FROM tag WHERE tag = ? LIMIT 1`;
	let p = `INSERT INTO tag_user (userId, tagId) VALUES (?, ?)`;
	con.query(f,tag, function (err, res) {
		if (!err) {
			let r = res[0];
			con.query(p, [req.session.user.id, r.id], function (err, res) {
				if (err) throw err;
			});
		}
	});
}

router.get("/new/:id", function (req, res) {
	let tag = req.params.id;
	let f = `INSERT INTO tag (tag) VALUES (?)`;
	con.connect(function (err) {
		con.query(f,tag, function(err, result, fields) {
			sel(con, tag, req);
		});
	});
});

router.get("/all", function (req, res) {
	let f = `SELECT tag FROM tag`;
	con.connect(function (err) {
		con.query(f,function (err, result) {
			if (err) throw err;
			res.status(200).send(JSON.stringify({code: 0,msg:result}));
		});
	});
});
module.exports = router;
