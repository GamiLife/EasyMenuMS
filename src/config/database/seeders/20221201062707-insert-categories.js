'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const rows = [
      {
        title: 'Sea Foods',
        description: 'Everything related with sea food',
        iconId: 'burger',
        imageCategory: '',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        title: 'Pastas',
        description: 'Everything related with pastas',
        iconId: 'burger',
        imageCategory: '',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        title: 'Papas',
        description: 'Everything related with pastas',
        iconId: 'burger',
        imageCategory: '',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        title: 'Guarniciones',
        description: 'Everything related with pastas',
        iconId: 'burger',
        imageCategory: '',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        title: 'Bebidas',
        description: 'Everything related with pastas',
        iconId: 'burger',
        imageCategory: '',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        title: 'Chicken',
        description: 'Everything related with pastas',
        iconId: 'burger',
        imageCategory: '',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        title: 'Burgers',
        description: 'Everything related with pastas',
        iconId: 'burger',
        imageCategory: '',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
    ];
    await queryInterface.bulkInsert('categories', rows, {});
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
