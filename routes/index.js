var express = require('express');
var router = express.Router();

module.exports = function(passport){

    /* GET landing page. */
    router.get('/', function(req, res) {
        res.render('index', {});
    });

    /* Handle Logout */
    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;
}
