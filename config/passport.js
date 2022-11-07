const passport = require('passport');
const { validPassword } = require('../lib/passwordUtils');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./database');

const User = connection.models.User;

const customFields = {
	usernameField: "username",
	passwordField: "password"
}

//define verify callback function
const verifyCallback = (username, password, done) => {

	User.findOne({username})
		.then((user) => {
			if(!user) {
				console.log("NO USER")
				return done(null, false)
			}
				
			// validation
			const isValid = validPassword(password, user.hash, user.salt)

			if(isValid){
				return done(null, user)
			} else {
				return done(null, false)
			}
		})
		.catch((error) => {
			done(error)
		})

}

// defining a strategy in this case passport local strategy
const strategy = new LocalStrategy(customFields, verifyCallback)

// implementing passport
passport.use(strategy)

// serializing a user
passport.serializeUser((user, done) => {
	done(null, user.id)
})

// deserializing user
passport.deserializeUser((userId, done) => {
	User.findById(userId)
		.then((user) => {
			done(null, user)
		})
		.catch(error => done(error))
})