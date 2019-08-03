const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const mg = require('./mongo.js');
const session = require('express-session')
const val = require("./accept.js");
const reg = require('./register.js');
const query = require('./query');
const jwt = require('jsonwebtoken');
const withAuth = require('./middleware');
const profile = require('./profile');
app.set('trust proxy', 1) 
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true, maxAge: 60000 }
}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' })) 
app.use(bodyParser.text({ type: 'text/html' }))
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*,Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use('/register', reg);
app.use('/validate', val);
app.use('/login', query);
app.use('/profile', profile);
app.get('/connected', withAuth, function (req, res) {
	res.sendStatus(202);
})
app.listen(process.env.PORT || 8080);
