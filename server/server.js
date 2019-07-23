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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' })) 
app.use(bodyParser.text({ type: 'text/html' }))
app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	  res.header("Access-Control-Allow-Headers", "*,Origin, X-Requested-With, Content-Type, Accept");
	  next();
});
app.post('/register', function (req, res) {
	let user = req.body.username;
	let pwd = req.body.password;
	let email = req.body.email;
	let firstname = req.body.firtstname;
	let lastname = req.body.lastname;
	let gender = req.body.gender;
	mg.query(reg.register, {login: user, pwd: pwd, email: email, firstname: firstname, lastname: lastname, gender: gender}, res);
});

app.post('/login', function (req, res) {
	let user = req.body.user;
	let pwd = req.body.pwd;
	mg.query(query.alola, {login: user, pwd: pwd}, res);
});

app.listen(process.env.PORT || 8080);
