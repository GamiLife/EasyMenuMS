'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const rows = [
      {
        name: 'Tiktok',
        description: 'Social network for tiktok',
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        name: 'Facebook',
        description: 'Social network for facebook',
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        name: 'Whatsapp',
        description: 'Social network for whatsapp',
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        name: 'Instagram',
        description: 'Social network for instagram',
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
    ];

    await queryInterface.bulkInsert('social_networks', rows, {});
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
