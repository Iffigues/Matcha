const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
const middles = require("./middleware.js");
var jwtDecode = require('jwt-decode');

router.use(middles);

router.post('/', function (req, res) {
	let tag = req.body.furry.toLowerCase();
	var decoded = jwtDecode(req.token);
	let f = `INSERT INTO furry (userId, name) VALUES (?,?)`;
	con.connect(function (err) {
		let r = decoded.rr.id;
		con.query(f,[r, tag], function (err, result) {
			console.log(err);
			res.status(200).send(JSON.stringify({code:0, msg:"furry created"}));
		});
	});
});

router.get("/", function (req, res) {
	let f = `SELECT name, COUNT(name) AS nbr FROM furry GROUP BY name ORDER BY nbr DESC`;
	con.connect(function (err) {
		con.query(f, function (err, result) {
			console.log(err);
			res.status(200).send(JSON.stringify({code:0, furries:result}));
		});
	});
});

router.get("/own", function (req, res) {
	var decoded = jwtDecode(req.token);
	let f = `SELECT name FROM furry WHERE userId = ?`;
	con.connect(function(err) {
		con.query(f,[decoded.rr.id], function (err, result) {
			res.status(200).send(JSON.stringify({code:0, furry:result}));
		});
	});
});

router.post("/pref", function (req, res) {
	var decoded = jwtDecode(req.token);
	var gg = req.body.id;
	let f = `INSERT INTO furry_pref (userId, furryId) VALUES (?,?)`;
	con.connect(function (err) {
		con.query(f, [decoded.rr.id, gg], function (err, result) {
			res.status(200).send(JSON.stringify({code:0, msg:"bien enregister"}));
		});
	});
});

router.get("/pref", function(req, res) {
	let f = `SELECT * FROM furry, furry_pref WHERE furry_pref.userId = ? `;
	var decoded = jwtDecode(req.token);
	con.connect(function(err) {
		con.qquery(f, [decoded.rr.idd], function (err, st) {
			res.status(200).send(JSON.stringify({code:0, pref:st}));
		});
	});
});

router.delete("/", function (req, res) {
	let name = req.body.name;
	let f = `DELETE FROM furry WHERE name = ? AND userId = ?`;
	var decoded = jwtDecode(req.token);
	con.connect(function (err) {
		con.query(f,[name, decoded.rr.id], function (err, result) {
			console.log(err);
			res.status(200).send(JSON.stringify({code: 0, msg:"furrysupprimer"}));
		});
	});
});

router.delete("/pref/:id", function (req, res) {
	let name = req.params.id;
	let f = `DELETE FROM furry_PREF WHERE userId = ? AND furryId = ?`;
	var decoded = jwtDecode(req.token);
	con.connect(function (err) {
		con.query(f,[decoded.r.id, name], function (err, result) {
			res.status(200).send(JSON.stringify({code: 0, msg:"furrysupprimer"}));
		});
	});
});

module.exports = router;
