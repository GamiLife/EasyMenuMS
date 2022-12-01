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
          imageUrl: 'imageurl',
          companyId: 1,
        },
        {
          id: 2,
          title: 'Quetchup',
          description: 'Quetchup for spicy dishes',
          price: 2.5,
          imageUrl: 'imageurl',
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
