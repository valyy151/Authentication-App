const router = require('express').Router();
const User = require('../models/User.model');

router.get('/', (req, res) => {
	res.render('login');
});

router.post('/', async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await User.login(username, password);
		console.log(`Hello ${user.username}`);
		res.status(302).redirect('/');
	} catch (err) {
		console.log(err.message);
		res.status(400).json(err.message);
	}
});

module.exports = router;
