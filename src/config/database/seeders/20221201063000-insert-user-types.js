'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'user_types',
      [
        {
          id: 1,
          name: 'SuperAdmin',
          description: 'All privileges',
          createdAt: '2022-11-11 00:00:00',
          updatedAt: '2022-11-11 00:00:00',
        },
        {
          id: 2,
          name: 'Admin',
          description: 'Almost all privileges',
          createdAt: '2022-11-11 00:00:00',
          updatedAt: '2022-11-11 00:00:00',
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
