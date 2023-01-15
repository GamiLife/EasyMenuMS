'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'categories',
      [
        {
          id: 1,
          title: 'Sea Foods',
          description: 'Everything related with sea food',
          iconId: 'burger',
          imageCategory: '',
          companyId: 1,
          createdAt: '2022-11-11 00:00:00',
          updatedAt: '2022-11-11 00:00:00',
        },
        {
          id: 2,
          title: 'Pastas',
          description: 'Everything related with pastas',
          iconId: 'burger',
          imageCategory: '',
          companyId: 1,
          createdAt: '2022-11-11 00:00:00',
          updatedAt: '2022-11-11 00:00:00',
        },
        {
          id: 3,
          title: 'Papas',
          description: 'Everything related with pastas',
          iconId: 'burger',
          imageCategory: '',
          companyId: 1,
          createdAt: '2022-11-11 00:00:00',
          updatedAt: '2022-11-11 00:00:00',
        },
        {
          id: 4,
          title: 'Guarniciones',
          description: 'Everything related with pastas',
          iconId: 'burger',
          imageCategory: '',
          companyId: 1,
          createdAt: '2022-11-11 00:00:00',
          updatedAt: '2022-11-11 00:00:00',
        },
        {
          id: 5,
          title: 'Bebidas',
          description: 'Everything related with pastas',
          iconId: 'burger',
          imageCategory: '',
          companyId: 1,
          createdAt: '2022-11-11 00:00:00',
          updatedAt: '2022-11-11 00:00:00',
        },
        {
          id: 6,
          title: 'Chicken',
          description: 'Everything related with pastas',
          iconId: 'burger',
          imageCategory: '',
          companyId: 1,
          createdAt: '2022-11-11 00:00:00',
          updatedAt: '2022-11-11 00:00:00',
        },
        {
          id: 7,
          title: 'Burgers',
          description: 'Everything related with pastas',
          iconId: 'burger',
          imageCategory: '',
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
