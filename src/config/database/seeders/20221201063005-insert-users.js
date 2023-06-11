'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const rows = [
      {
        names: 'Pablo',
        lastnames: 'Ramirez Montana',
        email: 'pablo@gmail.com',
        phone: '987666432',
        userTypeId: 1,
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
        sub: "TQYt8k"
      },
      {
        names: 'Erick',
        lastnames: 'White Solar',
        email: 'erick@gmail.com',
        phone: '987666432',
        userTypeId: 2,
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
        sub: "WA3ebg"
      },
    ];
    await queryInterface.bulkInsert('users', rows, {});
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
