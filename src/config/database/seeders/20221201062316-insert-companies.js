'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'companies',
      [
        {
          id: 1,
          name: 'SeaFastFood',
          description: 'Restaurant to sell sea fast food',
        },
        {
          id: 2,
          name: 'Pizza Hut',
          description: 'Company dedicated to sell pizzas',
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
