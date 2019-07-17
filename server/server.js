const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const mg = require('./mongo.js');

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/ping', function (req, res) {
	 return res.send('pong');
});

app.post('/login', function (req, res) {
	let user = req.body.user;
	let pwd = req.body.pwd;
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end("<p>hello world</p>");
});

app.listen(process.env.PORT || 8080);
