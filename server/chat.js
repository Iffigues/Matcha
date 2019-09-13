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
const notif = require('./notif.js');
const query = util.promisify(con.query).bind(con);

var users = {};

async function putbdd(data, user) {
	let e = 0;
	let i = 0;
	if(users[data.message.toId])
		e = 1;
	if (data.message.unread && e)
		i = 1;
	const put = await query(`INSERT INTO messages (userOne, userTwo, message, look) VALUES (?,?,?,?)`,[user.rr.id, data.message.toId, data.message.content, i]).then( (tr, err) => {
		if (users[data.message.toId])
			users[data.message.toId].emit("chat", data);
		if (!e)
			notif(user.rr, data.message.toId, "gotmessage");
	});
}

function sender(data, user) {
	data.message.from = user.rr.username;
	data.message.fromId = user.rr.id;
	putbdd(data, user); 
}

async function lol(data, user) {
	const isAllow = await query(`SELECT COUNT(*) as d FROM likes WHERE userOne = ? AND userTwo = ?`,  [data.message.toId, user.rr.id]).then((rt, err) => {
			if (rt[0].d) 
				sender(data, user);
	})
}

async function unreader(user, data) {
	const yy = await query(`UPDATE messages SET look = false WHERE userTwo = ? AND userOne = ?`, [user.rr.id, data.message.toId]).then((erre, ew) => {
	}).catch((err) => {
	});
}

async function isBloque(user, data) {
	const v = await query(`SELECT userId, bloqueID FROM bloque WHERE (bloqueId = ? AND userId = ?) OR (bloqueId = ? AND userId = ?)`, user.rr.id, data.toId, user.rr.id);
	if (v && v.length)
		return 0;
	return 1;
}

io.sockets.on('connection', function (socket) {
	let good = 0;
	let token = socket.handshake.query.token;
	let user = {};
	try {
		user = jwt.verify(token, "my-secret");
		if (user && good == 0) {
			good = 1;
			users[user.rr.id] = socket
		}
		if (good) {
			socket.on('chat', function(data){
				try {
					if (isBloque(user, data))
						lol(data, user);
				} catch (e) {
				}
			});
			socket.on('unread', function (data) {
				if (isBloque(user, data))
					unreader(user, data)
			});
			socket.on('disconnect', function(){
				delete users[user.rr.id];
			});
		}
	} catch (e) {
	}
});

server.listen(8081)
	module.exports = router;
