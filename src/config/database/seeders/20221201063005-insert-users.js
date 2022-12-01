'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          names: 'Pablo',
          lastnames: 'Ramirez Montana',
          email: 'pablo@gmail.com',
          phone: '987666432',
          userTypeId: 1,
          companyId: 1,
        },
        {
          id: 2,
          names: 'Erick',
          lastnames: 'White Solar',
          email: 'erick@gmail.com',
          phone: '987666432',
          userTypeId: 2,
          companyId: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
