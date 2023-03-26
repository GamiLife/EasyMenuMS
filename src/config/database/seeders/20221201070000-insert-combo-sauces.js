'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const rows = [
      {
        comboId: 1,
        sauceId: 1,
        maxItemsByRow: 10,
        priceByUnit: 3,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        comboId: 1,
        sauceId: 2,
        maxItemsByRow: 10,
        priceByUnit: 5,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        comboId: 1,
        sauceId: 3,
        maxItemsByRow: 5,
        priceByUnit: 7,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
    ];
    await queryInterface.bulkInsert('combo_sauces', rows, {});
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
