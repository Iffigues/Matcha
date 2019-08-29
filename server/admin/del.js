const con = require('../dt.js');
const express = require('express');
const  router = express.Router();
const middles = require("./middleware.js");
var jwtDecode = require('jwt-decode');

router.use(middles);

router.get("/report", function (req, res) {
	con.connect(function (err){
		con.query(`SELECT * FROM report 
			LEFT JOIN user ON user.id = report.userId
			ORDER BY date`, function (err, resultats) {
			console.log(err);
			res.status(200).send(JSON.stringify({code:0, resultats}));
		});
	});
});

router.delete("/delete/tag",function (req, res){
	con.connect(function (err){ 
		con.query('DELETE FROM tag WHERE tag.tag = ?',req.body.name, function (err, result) {
			res.status(200).send(JSON.stringify({code:0, msg:"tag suprimmé"}));
		});	
	});
});

router.delete("/delete/furries",function (req, res){
	con.connect(function (err){
		con.query('DELETE FROM furry WHERE name = ?',req.body.name, function (err, result) {
			res.status(200).send(JSON.stringify({code:0, msg:"tag suprimmé"}));
		});
	});
});

router.delete("/delete/user",function (req, res){
		con.connect(function (err){
					con.query('DELETE FROM user WHERE id = ?',req.body.id, function (err, result) {
									res.status(200).send(JSON.stringify({code:0, msg:"user suprimm�"}));
								});
				});
});

module.exports = router;
