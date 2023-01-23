'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const rows = [
      {
        metaTitle: 'Sea foods title',
        metaDescription: 'Sea foods description',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
    ];

    await queryInterface.bulkInsert('brands', rows, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
