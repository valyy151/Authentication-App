const router = require('express').Router();

router.get('/', (req, res) => {
	res.render('photos');
});

module.exports = router;
