const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
var server = require('http').Server(router);
const middles = require("./middleware.js");
var jwtDecode = require('jwt-decode');
var io = require('socket.io').listen(server);
module.exports = router;
