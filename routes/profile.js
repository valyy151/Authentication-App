const router = require('express').Router();
const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const bycrypt = require('bcrypt');

router.get('/', (req, res) => {
	res.render('profile');
});

router.post('/', async (req, res) => {
	const { oldPass, newPass, confirmedNewPass } = req.body;

	const token = req.cookies['Json Web Token'];
	jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
		const user = await User.findById(decodedToken.id);
		const hashedPass = user.password;
		const isValidPass = bycrypt.compare(oldPass, hashedPass);
		if (isValidPass) {
			const salt = bycrypt.genSalt();
			const encryptedPass = bycrypt.hash(newPass, salt);
			console.log(encryptedPass);
		} else throw Error;
	});
});

module.exports = router;
