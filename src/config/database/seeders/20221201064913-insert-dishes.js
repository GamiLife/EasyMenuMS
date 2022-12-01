'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'dishes',
      [
        {
          id: 1,
          title: 'Ceviche',
          description: 'Food with sea food ingredients',
          price: 21.5,
          imageUrl:
            'https://frdadmin21.fridaysperu.com/media/catalog/product/w/i/wings-texas-spiced-bbq.jpg',
          categoryId: 1,
          companyId: 1,
          createdAt: '2022-11-11 00:00:00',
          updatedAt: '2022-11-11 00:00:00',
        },
        {
          id: 2,
          title: 'Tiradito',
          description: 'Food with sea food and specil fish',
          price: 16.5,
          imageUrl:
            'https://frdadmin21.fridaysperu.com/media/catalog/product/w/i/wings-texas-spiced-bbq.jpg',
          categoryId: 1,
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
