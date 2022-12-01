'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'sauces',
      [
        {
          id: 1,
          title: 'Mostaza',
          description: 'Mostaza for nasty dishes',
          price: 1.5,
          imageUrl:
            'https://frdadmin21.fridaysperu.com/media/catalog/product/f/r/fridays-peru-porcion-de-guacamole.jpg',
          companyId: 1,
          createdAt: '2022-11-11 00:00:00',
          updatedAt: '2022-11-11 00:00:00',
        },
        {
          id: 2,
          title: 'Quetchup',
          description: 'Quetchup for spicy dishes',
          price: 2.5,
          imageUrl:
            'https://frdadmin21.fridaysperu.com/media/catalog/product/l/o/loaded-potato-fried_fridays-peru.jpg',
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
