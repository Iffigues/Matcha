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
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' })) 
app.use(bodyParser.text({ type: 'text/html' }))
app.use(function(req, res, next) {
	/*res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Credentials', 'true');
	 res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");*/
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
app.get('/connected',withAuth, function (req, res) {
	res.status(200).send(JSON.stringify({code:0, msg:"connecter"}));
})
app.listen(process.env.PORT || 8080);
