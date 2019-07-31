const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const tok = require('./tok');

function profile(db, tab, res, client) {
}

module.exports.profile = profile;
