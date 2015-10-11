'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('TransactionTags', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            transactionId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Transactions',
                    key: 'id'
                }
            },
            tagId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Tags',
                    key: 'id'
                }
            }
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('TransactionTags');
    }
};
