// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');
const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// default value for title local
const projectName = 'Authentication and Authorization App';
const capitalized = (string) =>
	string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = projectName;

//Authentication middleware
const jwt = require('jsonwebtoken');
const User = require('./models/User.model');

const authorize = (req, res, next) => {
	const token = req.cookies['Json Web Token'];
	if (!token) {
		res.status(400).redirect('/login');
	} else {
		jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
			if (err) {
				res.status(400).json(err);
			}
		});
	}

	next();
};

const authenticate = async (req, res, next) => {
	const token = req.cookies['Json Web Token'];
	if (!token) {
		app.locals.username = null;
	} else {
		jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
			const user = await User.findById(decodedToken.id);
			app.locals.username = user.username;
		});
	}
	setTimeout(() => {
		next();
	}, 50);
};

// 👇 Start handling routes here

const index = require('./routes/index');
app.use('/', authenticate, index);

const photos = require('./routes/photos');
app.use('/photos', authorize, photos);

const login = require('./routes/login');
app.use('/login', login);

const logout = require('./routes/logout');
app.use('/logout', authenticate, logout);

const register = require('./routes/register');
app.use('/register', register);

const profile = require('./routes/profile');
app.use('/profile', profile);
// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
