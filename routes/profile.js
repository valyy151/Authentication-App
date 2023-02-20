const router = require('express').Router();
const User = require('../models/User.model');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
	res.render('profile');
});

module.exports = router;
