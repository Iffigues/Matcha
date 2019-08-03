const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const tok = require('./tok');
const con = require('./dt.js');
const express = require('express');
const router = express.Router();
const middle = require('./middleware.js');
router.use(middle);
router.post("/", function (req, res) {
});
module.exports = router;
