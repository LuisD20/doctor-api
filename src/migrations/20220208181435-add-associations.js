'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'user', // name of Source model
      'id_role', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'role', // name of Target model
          key: 'id_role', // key in Target model that we're referencing
        },
      }
    );
    await queryInterface.addColumn(
      'token', // name of Source model
      'id_user', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'user', // name of Target model
          key: 'id_user', // key in Target model that we're referencing
        },
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'user', // name of Source model
      'id_role' // key we want to remove
    );
    await queryInterface.removeColumn(
      'token', // name of Source model
      'id_user' // key we want to remove
    );
  }
};