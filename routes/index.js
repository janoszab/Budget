var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
}

module.exports = function(passport){

    /* GET landing page. */
    router.get('/', function(req, res) {
        res.render('index', {});
    });

    /* GET Home Page */
    router.get('/dashboard', isAuthenticated, function(req, res){
        res.render('dashboard', {
            user: req.user
        });
    });

    router.get('/add/transaction', function(req, res) {

    });

    router.get('/add/budget', function(req, res) {

    });

    router.get('/add/account', function(req, res) {

    });

    /* GET login page. */
    router.get('/signin', function(req, res) {
        res.render('signin', {});
    });

    /* Handle Logout */
    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // route for facebook authentication and login
    // different scopes while logging in
    router.get('/login/facebook',
        passport.authenticate('facebook', { scope : 'email' }
    ));

    // handle the callback after facebook has authenticated the user
    router.get('/login/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/dashboard',
            failureRedirect : '/'
        })
    );

    return router;
}
