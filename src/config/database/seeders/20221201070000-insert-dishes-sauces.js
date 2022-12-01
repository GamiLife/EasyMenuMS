'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'dishes_sauces',
      [
        {
          id: 1,
          price: 3,
          sauceId: 1,
          dishId: 1,
        },
        {
          id: 2,
          price: 2,
          sauceId: 2,
          dishId: 1,
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
