var FacebookStrategy = require('passport-facebook').Strategy;
var models = require('../models');
var fbConfig = require('../config/facebook');

module.exports = function(passport) {

    passport.use('facebook', new FacebookStrategy({
            clientID: fbConfig.appID,
            clientSecret: fbConfig.appSecret,
            callbackURL: fbConfig.callbackUrl
        },

        // facebook will send back the tokens and profile
        function(access_token, refresh_token, profile, done) {
            // asynchronous
            process.nextTick(function() {
                models.User.findById(profile.id).then(function(user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        models.User.create({
                            id: profile.id,
                            accessToken: access_token,
                            username: profile.displayName
                        }).then(function(user) {
                            return done(null, user);
                        });
                    }
                });
            });

        }));

};
