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
const like = require("./like.js");
const report = require("./report.js");
const notif = require("./getnotif.js");
const prof = require("./prof.js");
const bloke = require("./bloke.js");
const match = require("./match.js");
const adm = require("./admin/del.js");
const msg = require("./message.js");
const con = require("./dt.js");
var cors = require('cors')

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
app.use(function (req, res, next) {
	next();
})

app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }));
											  app.use(bodyParser.raw({ type: 'application/vnd.custom-type' })); 
											  app.use(bodyParser.text({ type: 'text/html' }));
											  app.use(function(req, res, next) {
											  cors();
											  next();
											  });

											  app.use((err, req, res, next) => {
											  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
											  return res.sendStatus(400);
											  }
											  next();
											  });

											  app.use('/register', reg);
											  app.use('/validate', val);
											  app.use('/login', query);
											  app.use('/profile', profile);
											  app.use('/tag',cors(), tag);
											  app.use('/img', img);
											  app.use("/furry", furry);
											  app.use("/search", suj);
											  app.use("/map", map);
											  app.use("/adm", adm);
											  app.use("/chat", chat);
											  app.use("/notif", notif);
											  app.use("/like", like);
											  app.use("/blocked", bloke);
											  app.use("/report",report);
											  app.use("/user", prof);
											  app.use("/match", match);
											  app.use("/messages",msg);
											  app.get('/connected', function (req, res) {
											  const token = req.params.token || req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;
											  if (!token) 
											  return res.status(200).send(JSON.stringify({code:1, msg:"Vous n'êtes pas connecté"}));
											  jwt.verify(token, "my-secret", function(err, decoded) {
											  if (err ||  !decoded) 
											  return res.status(200).send(JSON.stringify({code:1, msg:"Vous n'êtes pas connecté"}));
											  con.connect(function (err) {
											  con.query(`SELECT role FROM user WHERE id = ?`, decoded.rr.id, function (err, rst) {
												console.log(err);
											  	res.status(200).send(JSON.stringify({code:0, msg:"connecté", username: decoded.rr.username, role:rst[0].role , lng: decoded.rr.lng, lat: decoded.rr.lat}));
												});
											  });
											  });

											  })

											  app.listen(process.env.PORT || 8080, function () {

											  });
