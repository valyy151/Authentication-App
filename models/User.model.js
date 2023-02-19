const { Schema, model } = require('mongoose');
const bycrpt = require('bcrypt');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: [true, 'Pleas enter a username'],
	},
	password: {
		type: String,
		required: [true, 'Please enter a password'],
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'Please enter an email'],
	},
});

userSchema.pre('save', async function (next) {
	const salt = await bycrpt.genSalt();
	this.password = await bycrpt.hash(this.password, salt);
	next();
});

userSchema.post('save', async function (doc, next) {
	console.log('New user was created and saved:', doc.username);
	next();
});

userSchema.statics.login = async function (username, password) {
	const user = await this.findOne({ username });
	if (user) {
		const isAuth = await bycrpt.compare(password, user.password);
		if (isAuth) {
			return user;
		}
		throw Error('Wrong Username or Password');
	}
	throw Error('Wrong Username or Password');
};

const User = model('Users', userSchema);

module.exports = User;
