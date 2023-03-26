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
      'CREATE SEQUENCE combos_sequence start 1'
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE combos ALTER id SET DEFAULT nextval('combos_sequence')"
    );

    await queryInterface.sequelize.query(
      'CREATE SEQUENCE combo_sauces_sequence start 1'
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE combo_sauces ALTER id SET DEFAULT nextval('combo_sauces_sequence')"
    );

    await queryInterface.sequelize.query(
      'CREATE SEQUENCE combo_dishes_sequence start 1'
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE combo_dishes ALTER id SET DEFAULT nextval('combo_dishes_sequence')"
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

    await queryInterface.sequelize.query(
      'CREATE SEQUENCE brands_sequence start 1'
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE brands ALTER id SET DEFAULT nextval('brands_sequence')"
    );

    await queryInterface.sequelize.query(
      'CREATE SEQUENCE brand_social_networks_sequence start 1'
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE brand_social_networks ALTER id SET DEFAULT nextval('brand_social_networks_sequence')"
    );

    await queryInterface.sequelize.query(
      'CREATE SEQUENCE logos_provider_sequence start 1'
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE logos_provider ALTER id SET DEFAULT nextval('logos_provider_sequence')"
    );

    await queryInterface.sequelize.query(
      'CREATE SEQUENCE social_networks_sequence start 1'
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE social_networks ALTER id SET DEFAULT nextval('social_networks_sequence')"
    );

    await queryInterface.sequelize.query(
      'CREATE SEQUENCE theme_provider_sequence start 1'
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE theme_provider ALTER id SET DEFAULT nextval('theme_provider_sequence')"
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('DROP SEQUENCE companies_sequence');
    await queryInterface.sequelize.query('DROP SEQUENCE categories_sequence');
    await queryInterface.sequelize.query('DROP SEQUENCE user_types_sequence');
    await queryInterface.sequelize.query('DROP SEQUENCE users_sequence');
    await queryInterface.sequelize.query('DROP SEQUENCE news_sequence');
    await queryInterface.sequelize.query('DROP SEQUENCE combos_sequence');
    await queryInterface.sequelize.query('DROP SEQUENCE sauces_sequence');
    await queryInterface.sequelize.query('DROP SEQUENCE dishes_sequence');
    await queryInterface.sequelize.query('DROP SEQUENCE combo_sauces_sequence');
    await queryInterface.sequelize.query('DROP SEQUENCE combo_dishes_sequence');
    await queryInterface.sequelize.query('DROP SEQUENCE locations_sequence');
    await queryInterface.sequelize.query('DROP SEQUENCE brands_sequence');
    await queryInterface.sequelize.query(
      'DROP SEQUENCE brand_social_networks_sequence'
    );
    await queryInterface.sequelize.query(
      'DROP SEQUENCE logos_provider_sequence'
    );
    await queryInterface.sequelize.query(
      'DROP SEQUENCE social_networks_sequence'
    );
    await queryInterface.sequelize.query(
      'DROP SEQUENCE theme_provider_sequence'
    );
  },
};
