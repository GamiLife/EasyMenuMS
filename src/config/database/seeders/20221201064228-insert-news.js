'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'news',
      [
        {
          id: 1,
          title: 'This is our last offers for you!',
          description: 'Valid until last day of month.',
          imageUrl: 'imageurl',
          backgroundColor: 'red',
          startDate: '2020-01-01T00:00:00',
          endDate: '2020-01-01T20:00:00',
          companyId: 1,
        },
        {
          id: 2,
          title: 'This is our another last offers for you!',
          description: 'Valid until last day of month.',
          imageUrl: 'imageurl',
          backgroundColor: 'red',
          startDate: '2020-01-01T00:00:00',
          endDate: '2020-01-01T20:00:00',
          companyId: 1,
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
