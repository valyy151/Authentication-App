const router = require('express').Router();
const User = require('../models/User.model');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
	res.render('register');
});

router.post('/', async (req, res) => {
	const { username, password, email } = req.body;
	try {
		const newUser = await User.create(req.body);
		console.log(`Welcome, ${newUser.username}`);

		const token = jwt.sign({ id: newUser._id }, process.env.SECRET, {
			expiresIn: 60 * 60 * 2,
		});

		res.cookie('Json Web Token', token, { httpOnly: true });
		res.status(302).redirect('/');
	} catch (err) {
		console.log(err.message);
		res.status(400).json(err.message);
	}
});

module.exports = router;
