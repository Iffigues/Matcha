const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
const middles = require("./middleware.js");
var jwtDecode = require('jwt-decode');

const googleMapsClient = require('@google/maps').createClient({
	  key: 'AIzaSyBS2V8xJYNTWhfEFaW7SW0mvOJfoZ1mmI8'
});

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

module.exports =  router;
