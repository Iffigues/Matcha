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
	  limits: { 
		     //    fileSize: 5 * 1024 * 1024,  // 5 MB upload limit
		          files: 1                    // 1 file
		      },
	fileFilter: function (req, file, cb){
		if (accepted_extensions.some(ext => file.originalname.endsWith("." + ext))) {
			return cb(null, true);
		} else {
		return cb(new Error('Only ' + accepted_extensions.join(", ") + ' files are allowed!'));
		}
	},
	storage: storage,
	limits:{fileSize: 1000000},
}).single("file");

router.post("/upload", function (req, res) {
	let f = `SELECT count(id) as nbr FROM img WHERE userId = ?`;
	let ff = `INSERT INTO img (userId, path) VALUES (?, ?)`;
	con.connect(function (err){
		con.query(f, 1, function (err, result) {
			let r = result[0]['nbr'];
			if (r < 5) {
				upload(req, res, (err) => {
			 		if(!err) {
						var decoded = jwtDecode(req.token);
						con.query(ff, [decoded.rr.id, req.file.path],  function (err, ress) {
						return res.status(200).send(JSON.stringify({code:0, msg:ress}));
						});
					} else {
						return res.status(400).send(JSON.stringify({code:0, msg:'something was bad'}));
					}
				})
			} else {
				return (res.status(400).send(JSON.stringify({code:0, msg:"vous avez dejas 5 images"})));
			}
		});
	});
});

const fs = require('fs')

router.post("/update", function(req, res) {
	let f = `UPDATE img SET path = ? Where id = ?`
	let r = `SELECT path FROM img WHERE id = ?`;
	let gg = req.body.id;
	con.connect(function (err) {
		con.query(r, [gg], function (err, result) {
			if (!err   && result) {
				let yy = result[0].path;
				upload(req, res, (err) => {
					if (!err) {
						con.query(f, [req.file.path, gg], function (err, resul) {
							if (!err) {
								fs.unlink(yy, (err) => {
									  if (err) {
										      console.error(err)
									}
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

module.exports = router;
