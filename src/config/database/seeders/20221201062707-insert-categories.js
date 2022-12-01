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
          iconId: 'seafood',
          companyId: 1,
        },
        {
          id: 2,
          title: 'Pastas',
          description: 'Everything related with pastas',
          iconId: 'pastfood',
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
