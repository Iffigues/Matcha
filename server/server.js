const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const mg = require('./mongo.js');
const reg = require('./register.js');
const query = require('./query');

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' })) 
app.use(bodyParser.text({ type: 'text/html' }))

app.post('/register', function (req, res) {
	let user = req.body.user;
	let pwd = req.body.pwd;
	mg.query(reg.register, {login: user, pwd: pwd}, res);
});

app.post('/login', function (req, res) {
	let user = req.body.user;
	let pwd = req.body.pwd;
	mg.query(query.alola, {login: user, pwd: pwd}, res);
});

app.listen(process.env.PORT || 8080);
