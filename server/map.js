const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
const middles = require("./middleware.js");
var jwtDecode = require('jwt-decode');
const googleMapsClient = require('@google/maps').createClient({
	key: 'AIzaSyBS2V8xJYNTWhfEFaW7SW0mvOJfoZ1mmI8'
});
var NodeGeocoder = require('node-geocoder');

var options = {
	provider: 'google',

	// Optional depending on the providers
	httpAdapter: 'https', // Default
	apiKey: 'AIzaSyBS2V8xJYNTWhfEFaW7SW0mvOJfoZ1mmI8', // for Mapquest, OpenCage, Google Premier
	formatter: null         // 'gpx', 'string', ...
};
var geocoder = NodeGeocoder(options);

router.use(middles);

router.post("/", function (req, res){
	var decoded = jwtDecode(req.token);
	let h = req.body.customCity;
	let lat= req.body.lat;
	let lng = req.body.lng; 
	if (h == 1) {
		googleMapsClient.geocode({address: req.body.city}, function(err, response) {
			console.log(err);
			console.log("pas cool");
			let r = response.json.results[0].geometry.location;
			console.log("dsdssddsdsdsds");
			if (r) {
				con.connect(function (err){
					con.query(`UPDATE user SET lat = ? , lng = ?, city = ? WHERE id = ?`,[r.lat, r.lng, req.body.city,decoded.rr.id], function (err, rsu) {
						res.status(200).send(JSON.stringify({code:0,r}));
					});
				});
			}
		});
	} else {
		con.connect(function (err) {
			con.query(`UPDATE user SET lat = ?, lng = ?, city = ? WHERE id= ?`,[lat, lng, req.body.city, decoded.rr.id], function (err, resiii){
				console.log(err);
				if (!err) {
					res.status(200).send(JSON.stringify({code: 0, msg:"ville changer"}))
				}
			});
		});
	}
})

router.post("/reverse", function (req, res) {
	let lng = req.body.lng;
	let lat = req.body.lat;
	var decoded = jwtDecode(req.token);
	con.connect(function (err) {
		geocoder.reverse({lat:lat, lon:lng}, function(err, resi) { 
			let resultat = resi[0];
			console.log(resultat.city);
			let f = "UPDATE user SET lat = ? , lng = ? , city = ? WHERE id = ?";
			con.query(f,[lat,lng,resultat.city, decoded.rr.id], function (err, resuls) {
				console.log(err);
				res.status(200).send(JSON.stringify({code:0, city: resultat.city}));
			});
		});
	})
});

module.exports =  router;
