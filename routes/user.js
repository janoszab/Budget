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
    /* GET Home Page */
    router.get('/dashboard', isAuthenticated, function(req, res){
        res.render('dashboard', {
            user: req.user
        });
    });

    router.get('/transaction', isAuthenticated, function(req, res) {
        res.render('transaction', {});
    });

    router.get('/budget', isAuthenticated, function(req, res) {
        res.render('transaction', {});
    });

    router.get('/account', isAuthenticated, function(req, res) {
        res.render('transaction', {});
    });

    return router;
}
