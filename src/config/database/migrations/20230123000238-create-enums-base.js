'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      DROP TYPE IF EXISTS theme_types
    `);
    await queryInterface.sequelize.query(`
      CREATE TYPE theme_types AS ENUM(
        'primary',
        'secondary',
        'third'
      )
    `);

    await queryInterface.sequelize.query(`
      DROP TYPE IF EXISTS logo_types
    `);
    await queryInterface.sequelize.query(`
      CREATE TYPE logo_types AS ENUM(
        'primary',
        'secondary',
        'third',
        'header',
        'footer',
        'icon-page'
      )
    `);

    await queryInterface.sequelize.query(`
      DROP TYPE IF EXISTS theme_modes
    `);
    await queryInterface.sequelize.query(`
      CREATE TYPE theme_modes AS ENUM(
        'light',
        'dark'
      )
    `);

    await queryInterface.sequelize.query(`
      DROP TYPE IF EXISTS page_types
    `);
    await queryInterface.sequelize.query(`
      CREATE TYPE page_types AS ENUM(
        'informative',
        'editable'
      )
    `);
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
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
