'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const rows = [
      {
        src: 'https://fridaysperu.com/_nuxt/img/87dfa6e.svg',
        type: 'primary',
        alt: 'test logo primary',
        brandId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        src: 'https://fridaysperu.com/_nuxt/img/0df082e.svg',
        type: 'footer',
        alt: 'test logo footer',
        brandId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
    ];
    await queryInterface.bulkInsert('logos_provider', rows, {});
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
