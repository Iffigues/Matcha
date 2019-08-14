function firstname(req, res) {
	let f = "UPDATE user SET firstname = ? WHERE id = ?";
	con.connect(function (err) {
		con.query(f,[first, id], function(err, res) {
			
		});
	});
}
module.exports = firstname;
