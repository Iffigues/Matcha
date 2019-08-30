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
		con.query(`SELECT  user1.id as fromId, user2.id as toId , user1.username as 'from', user2.username as 'to', messages.message  as 'content', messages.id , messages.date FROM messages LEFT JOIN user as user1 ON  user1.id = messages.userOne LEFT JOIN user as user2 ON user2.id  = messages.userTwo  WHERE (userOne = ? AND userTwo = ?) OR (userTwo = ? AND userOne = ?) ORDER BY date DESC`,[tt.rr.id, id, tt.rr.id,id],function (err, messages) {
			console.log(err);
			ccon.query(`UPDATE messages SET look=1 WHERE userOne = ?`, tt.rr.id, function (era, tttt) {});
			res.status(200).send(JSON.stringify({code:0, messages}));
		});
	});
});

module.exports = router;
