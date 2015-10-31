'use strict';

var moment = require('moment');
var numeral = require('numeral');

module.exports = function(sequelize, DataTypes) {
    var Transaction = sequelize.define('Transaction', {
        type: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: { msg: "Must be a numeric" }
            }
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: "Must be an integer" }
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        getterMethods: {
            formatedAmount: function() {
                return numeral(this.getDataValue('amount')).format('+ 0,0.0');
            },
            date: function () {
                return moment(this.getDataValue('createdAt')).format('YYYY/MM/DD HH:mm:ss');
            },
            fromNow: function() {
                return moment(this.getDataValue('createdAt')).fromNow();
            }
        },
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                Transaction.belongsTo(models.User, {
                    foreignKey: 'userId',
                    as: 'creator'
                });
                Transaction.belongsToMany(models.Transaction, {
                    as: 'tags',
                    through: 'TransactionTags'
                });
            }
        }
    });

    return Transaction;
};
