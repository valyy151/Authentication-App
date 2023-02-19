const router = require('express').Router();
const User = require('../models/User.model');

router.get('/', (req, res) => {
	res.render('register');
});

router.post('/', async (req, res) => {
	const { username, password, email } = req.body;
	try {
		const newUser = await User.create(req.body);
		console.log(`Welcome, ${newUser.username}`);
		res.status(302).redirect('/');
	} catch (err) {
		console.log(err.message);
		res.status(400).json(err.message);
	}
});

module.exports = router;
