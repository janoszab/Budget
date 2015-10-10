var facebook = require('./facebook');
var models = require('../models');

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        done(null, user.get('id'));
    });

    passport.deserializeUser(function(id, done) {
        models.User.findById(id).then(function(user) {
            done(null, user);
        });
    });

    // Setting up Passport Strategies for Facebook
    facebook(passport);
}
