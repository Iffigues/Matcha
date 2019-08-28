const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
const middles = require("./middleware.js");
var jwtDecode = require('jwt-decode');
const util = require('util');
router.use(middles);
const query = util.promisify(con.query).bind(con);

router.get('/:id', function (req, res)  {
	let id = req.params.id;
	var tt = jwtDecode(req.token);
	con.connect(function (err) {
		con.query(`SELECT * FROM messages WHERE (userOne = ? AND userTwo = ?) OR (userTwo = ? AND userOne = ?) ORDER BY date ASC`,[tt.rr.id, id, tt.rr.id,id],function (err, messages) {
			console.log(err);
			res.status(200).send(JSON.stringify({code:0, messages}));
		});
	});
});

module.exports = router;
