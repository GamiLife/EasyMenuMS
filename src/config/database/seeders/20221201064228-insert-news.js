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
          imageUrl:
            'https://menudigital011023.s3.amazonaws.com/1673459873090-component_gaminote2.png',
          backgroundColor: 'rgb(122,122,122)',
          startDate: '2023-01-01T00:00:00.000Z',
          endDate: '2023-01-15T00:00:00.000Z',
          companyId: 1,
          createdAt: '2022-11-11 00:00:00',
          updatedAt: '2022-11-11 00:00:00',
        },
        {
          id: 2,
          title: 'This is our another last offers for you!',
          description: 'Valid until last day of month.',
          imageUrl:
            'https://menudigital011023.s3.amazonaws.com/1673465177914-1665576018479.jpg',
          backgroundColor: 'rgb(122,122,122)',
          startDate: '2023-01-01T00:00:00.000Z',
          endDate: '2023-01-15T00:00:00.000Z',
          companyId: 1,
          createdAt: '2022-11-11 00:00:00',
          updatedAt: '2022-11-11 00:00:00',
        },
        {
          id: 3,
          title: 'This is our another last offers for you!',
          description: 'Valid until last day of month.',
          imageUrl:
            'https://menudigital011023.s3.amazonaws.com/1673465177914-1665576018479.jpg',
          backgroundColor: 'rgb(122,122,122)',
          startDate: '2023-01-16T00:00:00.000Z',
          endDate: '2023-01-20T00:00:00.000Z',
          companyId: 1,
          createdAt: '2022-11-11 00:00:00',
          updatedAt: '2022-11-11 00:00:00',
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
