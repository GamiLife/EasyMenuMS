'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'CREATE SEQUENCE companies_sequence start 1'
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE companies ALTER id SET DEFAULT nextval('companies_sequence')"
    );

    await queryInterface.sequelize.query(
      'CREATE SEQUENCE categories_sequence start 1'
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE categories ALTER id SET DEFAULT nextval('categories_sequence')"
    );

    await queryInterface.sequelize.query(
      'CREATE SEQUENCE user_types_sequence start 1'
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE user_types ALTER id SET DEFAULT nextval('user_types_sequence')"
    );

    await queryInterface.sequelize.query(
      'CREATE SEQUENCE users_sequence start 1'
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE users ALTER id SET DEFAULT nextval('users_sequence')"
    );

    await queryInterface.sequelize.query(
      'CREATE SEQUENCE news_sequence start 1'
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE news ALTER id SET DEFAULT nextval('news_sequence')"
    );

    await queryInterface.sequelize.query(
      'CREATE SEQUENCE sauces_sequence start 1'
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE sauces ALTER id SET DEFAULT nextval('sauces_sequence')"
    );

    await queryInterface.sequelize.query(
      'CREATE SEQUENCE dishes_sequence start 1'
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE dishes ALTER id SET DEFAULT nextval('dishes_sequence')"
    );

    await queryInterface.sequelize.query(
      'CREATE SEQUENCE dishes_sauces_sequence start 1'
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE dishes_sauces ALTER id SET DEFAULT nextval('dishes_sauces_sequence')"
    );

    await queryInterface.sequelize.query(
      'CREATE SEQUENCE dishes_dishes_sequence start 1'
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE dishes_dishes ALTER id SET DEFAULT nextval('dishes_dishes_sequence')"
    );

    await queryInterface.sequelize.query(
      'CREATE SEQUENCE locations_sequence start 1'
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE locations ALTER id SET DEFAULT nextval('locations_sequence')"
    );

    await queryInterface.sequelize.query(
      'CREATE SEQUENCE static_pages_sequence start 1'
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE static_pages ALTER id SET DEFAULT nextval('static_pages_sequence')"
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('DROP SEQUENCE companies_sequence');
    await queryInterface.sequelize.query('DROP SEQUENCE categories_sequence');
    await queryInterface.sequelize.query('DROP SEQUENCE user_types_sequence');
    await queryInterface.sequelize.query('DROP SEQUENCE users_sequence');
    await queryInterface.sequelize.query('DROP SEQUENCE news_sequence');
    await queryInterface.sequelize.query('DROP SEQUENCE sauces_sequence');
    await queryInterface.sequelize.query('DROP SEQUENCE dishes_sequence');
    await queryInterface.sequelize.query(
      'DROP SEQUENCE dishes_sauces_sequence'
    );
    await queryInterface.sequelize.query(
      'DROP SEQUENCE dishes_dishes_sequence'
    );
    await queryInterface.sequelize.query('DROP SEQUENCE locations_sequence');
  },
};
