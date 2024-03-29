const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
const middles = require("./middleware.js");
var jwtDecode = require('jwt-decode');

router.use(middles);

function sel(con, tag, req) {
	let f = `SELECT * FROM tag WHERE tag = ? LIMIT 1`;
	let p = `INSERT INTO tag_user (userId, tagId) VALUES (?, ?)`;
	con.query(f,tag, function (err, res) {
		if (!err) {
			let r = res[0];
			con.query(p, [req, r.id], function (err, res) {
			});
		}
	});
}

router.post("/new", function (req, res) {
	let tag = req.body.tag.toLowerCase();
	var decoded = jwtDecode(req.token);
	let f = `INSERT INTO tag (tag, userId) VALUES (?,?)`;
	con.connect(function (err) {
				con.query(f,[tag, decoded.rr.id], function(err, result, fields) {
					if (err)
						res.status(400).send(JSON.stringify({code:1, msg:"Une erreur s'est produite"}));
					else
						res.status(200).send(JSON.stringify({code:0, msg:"Le centre d'intérêt a bien été ajouté"}));
				});
	});
});

router.get("/all", function (req, res) {
	let f = `SELECT tag AS name, COUNT(tag) AS nbr FROM tag GROUP BY tag ORDER BY nbr DESC`;
	con.connect(function (err) {
		con.query(f,function (err, result) {
			res.status(200).send(JSON.stringify({code: 0, tags:result}));
		});
	});
});

router.get("/adm", function (req, res) {
	con.connect(function(err){
		con.query('SELECT * FROM tag GROUP BY tag',function(err, resultats) {
			res.status(200).send({code: 0, resultats});
		});
	});
});

router.delete("/", function (req, res) {
	let f = `DELETE FROM tag WHERE userId = ? AND tag = ?`;
	let name = req.body.name;
	var decoded = jwtDecode(req.token);
	con.connect(function (err) {
		con.query(f, [decoded.rr.id, name], function (err, result) {
			res.status(200).send(JSON.stringify({code:0, msg:"Le centre d'intérêt a bien été supprimé"}));
		});
	});
});

module.exports = router;
