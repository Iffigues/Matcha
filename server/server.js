const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const mg = require('./mongo.js');
const query = require('./query');

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

app.get('/ping', function (req, res) {
	 return res.send('pong');
});

app.post('/login', function (req, res) {
	let user = req.body.user;
	let pwd = req.body.pwd;
	console.log(mg);
	console.log(query);
	res.writeHead(200, { 'Content-Type': 'application/json' });
	mg.query(query.alola);
	res.end();
	
});

app.listen(process.env.PORT || 8080);
