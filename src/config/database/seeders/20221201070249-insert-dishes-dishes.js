'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'dishes_dishes',
      [
        {
          id: 1,
          price: 14,
          dishId: 1,
          dishSecondId: 2,
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
