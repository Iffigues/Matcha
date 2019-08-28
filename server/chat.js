const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
var server = require('http').Server(router);
const middles = require("./middleware.js");
var jwtDecode = require('jwt-decode');
var io = require('socket.io').listen(server);
const jwt = require('jsonwebtoken');
const secret = 'my-secret';
const util = require('util');
const query = util.promisify(con.query).bind(con);


var users = {};

async function lol(data, user) {
	if (users[data.username].tab.includes(data.to)) {


	} else {
		const isAllow = await query(`SELECT COUNT(*) as d FROM likes WHERE userOne = ?`,  data.to.id).then((rt) => {
			
		});
	}
}

io.sockets.on('connection', function (socket) {
	let good = 0;
	let token = socket.handshake.query.token;
	let user = {};
	try {
		user = jwt.verify(token, "my-secret");
		if (user) {
			good = 1;
			users[user.username] = {socket};
			users[user.username].tab = [];
		}
	} catch (e) {
	}
	if (good) {
		socket.on('chat', function(data){
			try {
				console.log(good);
			} catch (e) {
				console.log(e);
			}
		});
		socket.on('disconnect', function(){
			delete users[user.username];
		});
	}
});

server.listen(8081)
module.exports = router;
