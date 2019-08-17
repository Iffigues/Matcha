const path = require("path");
const multer = require("multer");
const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
const middles = require("./middleware.js");
//router.use(middles);

const accepted_extensions = ['jpg', 'png', 'gif'];

const storage = multer.diskStorage({
	destination: "./public/uploads/",
	filename: function(req, file, cb){
		cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
	}
});

const upload = multer({
	fileFilter: function (req, file, cb){
		if (accepted_extensions.some(ext => file.originalname.endsWith("." + ext))) {
			return cb(null, true);
		}
		return cb(new Error('Only ' + accepted_extensions.join(", ") + ' files are allowed!'));
	},
	storage: storage,
	limits:{fileSize: 1000000},
}).single("file");


function validate_format(req, res, next) {
	let mime = fileType(req.file.buffer);
	if(!mime || !accepted_extensions.includes(mime.ext))
		return next(new Error('The uploaded file is not in ' + accepted_extensions.join(", ") + ' format!'));
	next();
}

router.post("/uppload",validate_format,function (req, res) {
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
						return res.status(400).send(JSON.stringify({code:0, msg:'something was bad'}));
					}
				})
			} else {
				return (res.status(400).send(JSON.stringify({code:0, msg:"vous avez dejas 5 images"})));
			}
		});
	});
});

module.exports = router;
