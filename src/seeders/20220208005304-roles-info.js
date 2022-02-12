'use strict';

module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Role', 
    [
      {
        role : 'User',
        created_at : new Date(),
        updated_at : new Date(),
      }, 
      {
        role : 'Admin',
        created_at : new Date(),
        updated_at : new Date(),
      }
    ], {});
  },

  down : function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Role')
  }
};