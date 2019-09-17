const con = require('./dt.js');
const express = require('express');
const http = require('http')
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
const ioreq = require("socket.io-request");
router.use((req, res, next)=>{ res.locals['socketio'] = io; next(); });
var users = {};

router.get('/',function (req, res) {
	res.send('jh');
})

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
	const r = await query(`SELECT * FROM id = ?`).then((b) => {
		if (b && b.length)
			return 1;
		return 0;
	});
	if (!r)
		return 0;
	const v = await query(`SELECT userId, bloqueId FROM bloque WHERE (bloqueId = ? AND userId = ?) OR (bloqueId = ? AND userId = ?)`, [user.rr.id, data.message.toId, data.message.toId, user.rr.id]).then((b) => {
		if (b && b.length)
		   return 0;
		return 1;   
	});
	return v;
}

module.exports = function (socket) {
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
						isBloque(user, data).then((rr) => {
							if (rr)
								lol(data, user);
						});
					} catch (e) {
				}
			});
			socket.on('unread', function (data) {
				isBloque(user, data).then((r) => {
					if (r)
						unreader(user, data);
				})
			});
			socket.on('disconnect', function(){
				delete users[user.rr.id];
			});
		}
	} catch (e) {
	}
}
