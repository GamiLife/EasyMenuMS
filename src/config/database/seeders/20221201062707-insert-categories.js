'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const rows = [
      {
        title: 'Sea Foods',
        description: 'Everything related with sea food',
        iconId: 'burger',
        imageCategory:
          'https://frdadmin21.fridaysperu.com/media/catalog/category/descarga_3_.png',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        title: 'Pastas',
        description: 'Everything related with pastas',
        iconId: 'appetizer',
        imageCategory: '',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        title: 'Papas',
        description: 'Everything related with pastas',
        iconId: 'ribb',
        imageCategory: '',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        title: 'Guarniciones',
        description: 'Everything related with pastas',
        iconId: 'chicken',
        imageCategory: '',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        title: 'Bebidas',
        description: 'Everything related with pastas',
        iconId: 'salad',
        imageCategory: '',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        title: 'Chicken',
        description: 'Everything related with pastas',
        iconId: 'noodle',
        imageCategory: '',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        title: 'Burgers',
        description: 'Everything related with pastas',
        iconId: '',
        imageCategory:
          'https://frdadmin21.fridaysperu.com/media/catalog/category/descarga_3_.png',
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
