const path = require("path");
const multer = require("multer");
const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
const middles = require("./middleware.js");
var jwtDecode = require('jwt-decode');
router.use(middles);
const fileType = require('file-type');

const accepted_extensions = ['jpg', 'png', 'gif','jpeg'];

const storage = multer.diskStorage({
	destination: "./public/uploads/",
	filename: function(req, file, cb){
		cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
	}
});

const upload = multer({
	limits: { files: 1},
	fileFilter: function (req, file, cb){
		if (accepted_extensions.some(ext => file.originalname.endsWith("." + ext))) {
			return cb(null, true);
		} else {
			return cb(new Error('Seuls les fichiers ' + accepted_extensions.join(", ") + ' sont acceptés'));
		}
	},
	storage: storage,
	limits:{fileSize: 1000000},
}).single("file");

router.post("/upload", function (req, res) {
	let f = `SELECT count(*) as nbr FROM img WHERE userId = ?`;
	let ff = `INSERT INTO img (userId, path) VALUES (?, ?)`;
	let decoded = jwtDecode(req.token);
	con.connect(function (err){
		con.query(f, decoded.rr.id, function (err, result) {
			let r = result[0]['nbr'];
			if (r < 5) {
				upload(req, res, (err) => {
					if(!err) {
						var decoded = jwtDecode(req.token);
						con.query(ff, [decoded.rr.id, req.file.path],  function (err, ress) {
							if (r == 0) {
								con.query("UPDATE user SET profilephoto = ? WHERE id = ?",[ress.insertId, decoded.rr.id], function (err, resultats) {
									
								});
							}
							return res.status(200).send(JSON.stringify({code:0, msg:"La photo a bien été enregistrée"}));
						});
					} else {
						return res.status(400).send(JSON.stringify({code:1, msg:"Une erreur s'est produite"}));
					}
				})
			} else {
				return (res.status(400).send(JSON.stringify({code:1, msg:"Vous avez déjà atteint la limite de 5 photos"})));
			}
		});
	});
});

const fs = require('fs')

router.post("/update", function(req, res) {
	let f = `UPDATE img SET path = ? Where id = ? AND userId = ?`
	let r = `SELECT path FROM img WHERE id = ? AND userID = ?`;
	let gg = req.body.id;
	var decoded = jwtDecode(req.token);
	con.connect(function (err) {
		con.query(r, [gg, decoded.rr.id], function (err, result) {
			if (!err   && result) {
				let yy = result[0].path;
				upload(req, res, (err) => {
					if (!err) {
						con.query(f, [req.file.path, gg, decoded.rr.id], function (err, resul) {
							if (!err) {
								fs.unlink(yy, (err) => {
								})
								res.status(200).send(JSON.stringify({code:0, msg: req.file.path}));
							}
						});
					}
				});
			}
		});
	});
});

router.delete("/:id", function (req, res) {
	var decoded = jwtDecode(req.token);
	let f = 'DELETE FROM img WHERE id = ? AND userId = ?';
	let ff = `SELECT path FROM img WHERE id = ? AND userId = ?`;
	con.connect(function (err) {
		con.query(ff, [req.params.id, decoded.rr.id], function (err, results) {
			if (!err && results && results[0].path) {
				fs.unlink(results[0].path, (err) => {
				})
				con.query(`SELECT * FROM user WHERE id = ?`, decoded.rr.id, function (err, rt) {
					if (rt[0].profilephoto == req.params.id) {
						con.query("SELECT * FROM img WHERE userId = ?", decoded.rr.id, function (err, rz) {
							let rrr = 0;
							if (!err && rz[0])
								rrr = rz[0].id;
							con.query("UPDATE user SET profilephoto = ? WHERE id = ?",  [rrr, decoded.rr.id], function (err, rst){
							});
						})
					}
				});
			}
		});
		con.query(f,[req.params.id, decoded.rr.id], function (err, result) {
			res.status(200).send(JSON.stringify({code:0, msg:"La photo a été supprimée"}));
		});
	});
});

module.exports = router;
