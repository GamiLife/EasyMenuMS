'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const rows = [
      {
        brandId: 1,
        socialNetworkId: 1,
        user: 'yei.linux',
        phone: '',
        countryCode: '',
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        brandId: 1,
        socialNetworkId: 2,
        user: 'yei.linux',
        phone: '',
        countryCode: '',
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        brandId: 1,
        socialNetworkId: 3,
        user: '',
        phone: '999888777',
        countryCode: '51',
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        brandId: 1,
        socialNetworkId: 4,
        user: 'yei.linux',
        phone: '',
        countryCode: '',
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
    ];

    await queryInterface.bulkInsert('brand_social_networks', rows, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
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
