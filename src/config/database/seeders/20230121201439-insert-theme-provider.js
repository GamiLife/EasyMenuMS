'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const rows = [
      {
        themeMode: 'light',
        brandId: 1,
        type: 'primary',
        value: 'red',
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        themeMode: 'light',
        brandId: 1,
        type: 'secondary',
        value: 'green',
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
    ];

    await queryInterface.bulkInsert('theme_provider', rows, {});
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
