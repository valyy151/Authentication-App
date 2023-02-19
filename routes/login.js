const router = require('express').Router();
const User = require('../models/User.model');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
	res.render('login');
});

router.post('/', async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await User.login(username, password);
		console.log(`Hello ${user.username}`);
		const token = jwt.sign({ id: user._id }, process.env.SECRET, {
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
