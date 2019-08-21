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

router.get("/", function (req, res){
	googleMapsClient.geocode({
		  address: '1600 Amphitheatre Parkway, Mountain View, CA'
	}, function(err, response) {
		console.log(err);
		  if (!err) {
			  	let r = response.json.resutls[0];
			      console.log(response.json.results[0].geometry.location);
			    }
	});
})

router.get("/reverse", function (req, res) {
	let lng = req.body.lng;
	let lat = req.body.lat;
	geocoder.reverse({lat:lat, lon:lng}, function(err, res) {
		console.log(req);  
		console.log(res);
	});
});

module.exports =  router;
