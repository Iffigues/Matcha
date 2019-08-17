const path = require("path");
const multer = require("multer");
const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
const middles = require("./middleware.js");
//router.use(middles);

const storage = multer.diskStorage({
	destination: "./public/uploads/",
	filename: function(req, file, cb){
		cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
	}
});

const upload = multer({
	fileFilter: function (req, file, cb){

		cb(null, true)
	},
	storage: storage,
	limits:{fileSize: 1000000},
}).single("file");

router.post("/upload", function (req, res) {
	console.log(req);
	let f = `SELECT count(id) as nbr FROM img WHERE userId = ?`;
	con.connect(function (err){
		con.query(f, 1, function (err, result) {
			let r = result[0]['nbr'];
			if (r < 5) {
				upload(req, res, (err) => {
					console.log("Request ---", req.body);
					console.log("Request file ---", req.file);
					console.log(err);
					if(!err) {
						return res.status(200).send(JSON.stringify({code:0, msg:result}));
					} else {
					}
				})
			} else {
				return (res.status(400).send(JSON.stringify({code:0, msg:"vous avez dejas 5 images"})));
			}
		});
	});
});

module.exports = router;
