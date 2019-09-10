const con = require('../dt.js');
const express = require('express');
const  router = express.Router();
const middles = require("./middleware.js");
var jwtDecode = require('jwt-decode');
const util = require('util');
const query = util.promisify(con.query).bind(con);

router.use(middles);

async function getreport (req, res, report) {
	let reports = [];
	for (var i in report) {
		var reporter = await query('SELECT firstname, lastname, username, id FROM user WHERE id = ?', report[i].UserId);
		var reported = await query('SELECT firstname, lastname, username, id FROM user WHERE id = ?', report[i].who);
		var date = report[i].date;
		reports.push({
			reporter:reporter[0],
			reported:reported[0],
			date
		});
	}
	res.status(200).send(JSON.stringify({code:0, reports}));
}

router.get("/report", function (req, res) {
	con.connect(function (err){
		con.query(`SELECT *  FROM report ORDER BY date DESC`, function (err, resultats) {
			if (!err)
				getreport(req, res, resultats);
			else 
				res.status(400).send(JSON.stringify({code:1, msg:"Une erreur s'est produite"}));
		});
	});
});


router.get("/users", function (req, res) {
	con.connect(function (err)  {
		con.query("SELECT username , lastname, firstname, id FROM user WHERE role != 'admin'", function (err, users) {
			res.status(200).send(JSON.stringify({code:0, users}));
		});
	});
})

router.delete("/delete/tag",function (req, res){
	con.connect(function (err){ 
		con.query('DELETE FROM tag WHERE tag.tag = ?',req.body.name, function (err, result) {
			res.status(200).send(JSON.stringify({code:0, msg:"Le centre d'intérêt a été supprimé"}));
		});	
	});
});

router.delete("/delete/furries",function (req, res){
	con.connect(function (err){
		con.query('DELETE FROM furry WHERE name = ?',req.body.name, function (err, result) {
			res.status(200).send(JSON.stringify({code:0, msg:"Le type de furry a été supprimé"}));
		});
	});
});

router.delete("/delete/user",function (req, res){
		con.connect(function (err){
					con.query('DELETE FROM user WHERE id = ?',req.body.id, function (err, result) {
									res.status(200).send(JSON.stringify({code:0, msg:"L'utilisateur a été supprimé"}));
								});
				});
});

module.exports = router;
