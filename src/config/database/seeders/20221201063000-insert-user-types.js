'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'user-types',
      [
        {
          id: 1,
          name: 'SuperAdmin',
          description: 'All privileges',
        },
        {
          id: 2,
          name: 'Admin',
          description: 'Almost all privileges',
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
