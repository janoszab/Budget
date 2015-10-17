var express = require('express');
var router = express.Router();

module.exports = function(passport){

    /* GET login page. */
    router.get('/', function(req, res) {
        res.render('signin', {});
    });

    // route for facebook authentication and login
    // different scopes while logging in
    router.get('/facebook',
        passport.authenticate('facebook', { scope : 'email' }
    ));

    // handle the callback after facebook has authenticated the user
    router.get('/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/user/dashboard',
            failureRedirect : '/signin'
        })
    );

    return router;
}
