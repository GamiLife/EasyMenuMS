'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const rows = [
      {
        url: '/terminos-y-condiciones',
        htmlContent: 'Everything related with sea food',
        pageType: 'informative',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        url: '/politica-de-privacidad',
        htmlContent: 'Everything related with sea food',
        pageType: 'informative',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        url: '/nosotros',
        htmlContent: 'Everything related with sea food',
        pageType: 'informative',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
    ];
    await queryInterface.bulkInsert('static_pages', rows, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
