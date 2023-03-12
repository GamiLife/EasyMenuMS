'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const rows = [
      {
        title: 'This is our last offers for you!',
        description: 'Valid until last day of month.',
        imageUrl:
          'https://menudigital011023.s3.amazonaws.com/Banner_Web_3_horas_del_sabor.jpg',
        backgroundColor: 'rgb(122,122,122)',
        startDate: '2023-01-01T00:00:00.000Z',
        endDate: '2023-01-15T00:00:00.000Z',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        title: 'This is our another last offers for you!',
        description: 'Valid until last day of month.',
        imageUrl:
          'https://menudigital011023.s3.amazonaws.com/Banner-Web-Refresh-Brownie.jpg',
        backgroundColor: 'rgb(122,122,122)',
        startDate: '2023-01-01T00:00:00.000Z',
        endDate: '2023-01-15T00:00:00.000Z',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        title: 'This is our another last offers for you!',
        description: 'Valid until last day of month.',
        imageUrl:
          'https://menudigital011023.s3.amazonaws.com/Banner_Web_3_horas_del_sabor.jpg',
        backgroundColor: 'rgb(122,122,122)',
        startDate: '2023-01-16T00:00:00.000Z',
        endDate: '2023-01-20T00:00:00.000Z',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
    ];
    await queryInterface.bulkInsert('news', rows, {});
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
