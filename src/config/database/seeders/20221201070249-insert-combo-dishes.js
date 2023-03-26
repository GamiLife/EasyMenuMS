'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const rows = [
      {
        comboId: 2,
        secondarydishId: 2,
        maxItemsByRow: 5,
        priceByUnit: 14,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        comboId: 2,
        secondarydishId: 3,
        maxItemsByRow: 5,
        priceByUnit: 14,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        comboId: 2,
        secondarydishId: 4,
        maxItemsByRow: 5,
        priceByUnit: 20,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
    ];
    await queryInterface.bulkInsert('combo_dishes', rows, {});
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
