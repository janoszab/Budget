'use strict';
module.exports = function(sequelize, DataTypes) {
    var Transaction = sequelize.define('Transaction', {
        type: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                Transaction.belongsTo(models.User, {
                    foreignKey: 'userId'
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
