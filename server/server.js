const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session')
const val = require("./accept.js");
const reg = require('./register.js');
const query = require('./query');
const jwt = require('jsonwebtoken');
const tag = require("./tag.js");
const withAuth = require('./middleware');
const profile = require('./profile');
const img = require("./img.js");
const furry = require("./furry.js");
const suj = require("./suj.js");
const map = require("./map.js");
const chat = require("./chat.js");
const http = require('http');
var cors = require('cors')
var con =  require("./dt.js");

app.use(cors());
app.options('*', cors());
app.get('*', cors());
app.post('*', cors());
app.delete('*', cors());
app.options('*', cors());

var MemoryStore =session.MemoryStore;
app.set('trust proxy', 1) 
app.use(session({
	name: 'app.id',
	secret: 'keyboard cat',
	resave: true,
	store: new MemoryStore(),
	saveUninitialized: true,
	cookie: { secure: false, maxAge: 60000 }
}))
app.use(function (req, res, next) {;
	next();
})

app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' })) 
app.use(bodyParser.text({ type: 'text/html' }))
app.use(function(req, res, next) {
	cors();
	next();
});

app.use('/register', reg);
app.use('/validate', val);
app.use('/login', query);
app.use('/profile', profile);
app.use('/tag',cors(), tag);
app.use('/img', img);
app.use("/furry", furry);
app.use("/suj", suj);
app.use("/map", map);
app.use("chat", chat);
app.get('/connected',withAuth, function (req, res) {
	res.status(200).send(JSON.stringify({code:0, msg:"connecter"}));
})

app.listen(process.env.PORT || 8080, function () {

});
