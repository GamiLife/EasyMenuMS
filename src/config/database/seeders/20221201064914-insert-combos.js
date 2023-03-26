'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const rows = [
      {
        title: 'Seccion de guarniciones!',
        description: 'Combo basico de un plato.',
        companyId: 1,
        dishId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        title: 'Seccion de guarniciones!',
        description: 'Combo basico de un plato.',
        companyId: 1,
        maxItems: 10,
        dishId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        title: 'Seccion de guarniciones!',
        description: 'Combo basico de un plato.',
        companyId: 1,
        maxItems: 10,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
    ];
    await queryInterface.bulkInsert('combos', rows, {});
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
