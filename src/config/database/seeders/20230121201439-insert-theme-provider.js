'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const rows = [
      {
        themeMode: 'light',
        brandId: 1,
        blockId: 'categories-container',
        background: 'red',
        color: 'red',
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        themeMode: 'light',
        brandId: 1,
        blockId: 'header-container',
        background: 'red',
        color: 'red',
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        themeMode: 'light',
        brandId: 1,
        blockId: 'category-item',
        background: 'red',
        color: 'red',
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        themeMode: 'light',
        brandId: 1,
        blockId: 'wrapper-page',
        background: 'red',
        color: 'red',
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        themeMode: 'light',
        brandId: 1,
        blockId: 'product-card',
        background: 'red',
        color: 'red',
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        themeMode: 'light',
        brandId: 1,
        blockId: 'wish-list-icon',
        background: 'red',
        color: 'red',
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        themeMode: 'light',
        brandId: 1,
        blockId: 'shipping-button',
        background: 'red',
        color: 'red',
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        themeMode: 'light',
        brandId: 1,
        blockId: 'footer-container',
        background: 'red',
        color: 'red',
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        themeMode: 'light',
        brandId: 1,
        blockId: 'scroll-button',
        background: 'red',
        color: 'red',
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
