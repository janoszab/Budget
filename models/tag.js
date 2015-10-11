'use strict';
module.exports = function(sequelize, DataTypes) {
    var Tag = sequelize.define('Tag', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                Tag.belongsToMany(models.Transaction, {
                    as: 'transactions',
                    through: 'TransactionTags'
                });
            }
        }
    });

    return Tag;
};
