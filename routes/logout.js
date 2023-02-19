const app = require('../app');

const router = require('express').Router();

router.get('/', (req, res) => {
	res.cookie('Json Web Token', '', { maxAge: 1 });

	res.redirect('/');
});
module.exports = router;
