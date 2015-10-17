'use strict';
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        accessToken: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        getterMethods: {
            getProfilePictureSrc: function() {
                return 'http://graph.facebook.com/' + this.getDataValue('id') + '/picture?type=square'
            }
        },
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                User.hasMany(models.Transaction, {
                    foreignKey: 'userId'
                });
            }
        }
    });

    return User;
};
