'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const rows = [
      {
        themeMode: 'light',
        brandId: 1,
        blockId: 'header-container',
        background: '#ffffff',
        color: '#000000',
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        themeMode: 'light',
        brandId: 1,
        blockId: 'wrapper-page',
        background: '#f5f2ff',
        color: '#000000',
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        themeMode: 'light',
        brandId: 1,
        blockId: 'categories-container',
        background: '#ffffff',
        color: '#000000',
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        themeMode: 'light',
        brandId: 1,
        blockId: 'category-item',
        background: '#ffffff',
        color: '#000000',
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        themeMode: 'light',
        brandId: 1,
        blockId: 'product-card',
        background: '#ffffff',
        color: '#000000',
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        themeMode: 'light',
        brandId: 1,
        blockId: 'wish-list-icon',
        background: '#000000',
        color: 'red',
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        themeMode: 'light',
        brandId: 1,
        blockId: 'shipping-button',
        background: '#8082f7',
        color: '#ffffff',
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        themeMode: 'light',
        brandId: 1,
        blockId: 'footer-container',
        background: '#8082f7',
        color: '#ffffff',
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        themeMode: 'light',
        brandId: 1,
        blockId: 'scroll-button',
        background: '#8082f7',
        color: '#ffffff',
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
