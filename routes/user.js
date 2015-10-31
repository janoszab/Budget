var express = require('express');
var router = express.Router();
var models = require('../models');
var extend = require('node.extend');

var isAuthenticated = function(req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
}

module.exports = function(passport) {
    var types = [{
        id: 1,
        name: 'Income'
    }, {
        id: 2,
        name: 'Expense'
    }];

    /* Dashboard */
    router.get('/dashboard/:page?', isAuthenticated, function(req, res) {
        var page = parseInt(req.params.page) ? Math.abs(parseInt(req.params.page)) : 1;
        var limit = 15;

        models.Transaction.findAndCountAll({
            offset: (page - 1) * limit,
            limit: limit,
            order: [
                ['createdAt', 'DESC']
            ],
            include: [{
                all: true,
                nested: true
            }],
        }).then(function(transactions) {
            var max = Math.ceil(transactions.count / limit);

            if (page > max) {
                page = 1;
            }

            var prevPage = page >= 2 ? page - 1 : 1;
            var nextPage = page + 1 > max ? max : page + 1;

            res.render('dashboard', {
                user: req.user,
                transactions: transactions,
                hasPrev: page >= 2,
                hasNext: page < max,
                prevLink: '/user/dashboard/' + prevPage,
                nextLink: '/user/dashboard/' + nextPage
            });
        });
    });

    /* Transaction */
    router.get('/transaction', isAuthenticated, function(req, res) {
        res.render('transaction', {
            model: req.session.transaction,
            types: types
        });
    });

    router.post('/transaction', isAuthenticated, function(req, res) {
        if (req.body.type == 2) {
            req.body.amount = -Math.abs(req.body.amount);
        }

        console.log(req.body);

        models.Transaction.create(
            extend(req.body, {
                userId: req.user.get('id')
            })
        ).then(function(transaction) {
            req.flash('success', 'Transaction has been successfully saved!');
            req.session.transaction = null;

            res.redirect('/user/dashboard');
        }).catch(function(error) {
            req.flash('error', error.errors);
            req.session.transaction = this;

            res.redirect('/user/transaction');
        });
    });

    router.get('/transaction/:id', isAuthenticated, function(req, res, next) {
        models.Transaction.findById(req.params.id).then(function(transaction) {
            if (transaction) {
                types.forEach(function(type) {
                    if (type.id === transaction.get('type')) {
                        type.selected = true;
                    }
                });

                console.log(types);

                res.render('transaction', {
                    model: transaction,
                    types: types
                });
            } else {
                var err = new Error('Not Found');
                err.status = 404;

                next(err);
            }
        });
    });

    /* Budget */
    router.get('/budget', isAuthenticated, function(req, res) {
        res.render('budget', {});
    });

    /* Account */
    router.get('/account', isAuthenticated, function(req, res) {
        res.render('account', {});
    });

    return router;
}
