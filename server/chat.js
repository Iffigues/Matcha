const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
var server = require('http').Server(router);
const middles = require("./middleware.js");
var jwtDecode = require('jwt-decode');
var io = require('socket.io').listen(server);

var users = {};

io.sockets.on('connection', function (socket) {
	socket.on('chat', function(data){
			console.log("hghghg");	
			console.log(data);
	});
	socket.on('connect', function(data){
		console.log("hghg");
	});
});

server.listen(8081)
module.exports = router;
