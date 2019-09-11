const con = require('./dt.js');
const express = require('express');
const  router = express.Router();
const middles = require("./middleware.js");
var jwtDecode = require('jwt-decode');
const notif = require("./notif.js");

router.use(middles);

function ages(birthday) {
	if (!birthday)
		return null;
	var ageDifMs = Date.now() - birthday.getTime();
	var ageDate = new Date(ageDifMs);
	return Math.abs(ageDate.getUTCFullYear() - 1970);
}


function isC (a, b) {
	if (!a || !b)
		return false
	var d = new Date(a);
	console.log(d.toString())
	var f = new Date(b);
	console.log(f.toString());
	var diff = Math.abs(d - f);
	console.log("diff="+diff)
	if (diff > 300000)
		return false;
	return true;
}

function usete(r) {
	let profile = {};
	profile.username = r.user[0].username;
	profile.firstname = r.user[0].firstname;
	profile.lastname = r.user[0].lastname;
	profile.age = ages(r.user[0].birthdate);
	profile.id = r.user[0].id;
	profile.bio = r.user[0].bio;
	profile.city = r.user[0].city;
	profile.popularity = ((r.user[0].popularity + 1)*r.max[0].max + 1) / (r.max[0].popularity + 1);
	profile.sexe = r.user[0].sexe;
	profile.lat = r.user[0].lat;
	profile.lng = r.user[0].lng;
	profile.profilephoto  = r.user[0].profilephoto;
	profile.photos = r.images;
	profile.lastVisite = r.user[0].visited;
	if (!profile.lastVisite)
		profile.lastVisite = null;
	profile.connected = isC(profile.lastVisite, r.user[0].clock);
	profile.tags = r.tags.map(x => x.name);
	profile.furries = r.furry.map(x => x.name);
	profile.beliked = r.resultat3 && r.resultat3.length > 0;
	profile.liked = r.you && r.you.length > 0;
	profile.blocked = (r.blocks && r.blocks.length > 0);
	return profile;
}


router.get("/:id", function (req, res) {
	let id = req.params.id;
	var decoded = jwtDecode(req.token);
	con.connect(function (err) {
		con.query(`SELECT *, CURRENT_TIMESTAMP() as clock  FROM user  WHERE id = ?`, id, function (err, user) {
			console.log(err);
			con.query(`SELECT name FROM furry WHERE userId = ?`, id, function (err, furry) {
				con.query(`SELECT tag as name FROM tag WHERE userId = ?`,id, function (err, tags) {
					con.query(`SELECT * FROM likes WHERE userOne = ? AND userTwo= ?`,[id, decoded.rr.id], function (err, resultat3){
						con.query(`SELECT * FROM img WHERE userId =?`,[id], function (err, images) {
							con.query(`SELECT * FROM likes WHERE userOne = ? AND userTwo = ?`,[decoded.rr.id, id], function (err, you) {
								con.query(`SELECT *  FROM bloque WHERE userId = ? AND bloqueId = ?`,[decoded.rr.id, id], function (err, blocks){
									notif(decoded.rr, id, 'visited',"un utilisateur a vu vorte profile");
									con.query(`SELECT MAX(popularity) AS max, popularity FROM user`,function(err, rst){
									let profile  = usete({user, furry, tags, resultat3, you,images, blocks,max});
									res.status(200).send(JSON.stringify({code:0, profile}));
									})
								});
							});
						});
					});
				});
			});
		});
	});
});

module.exports = router;
