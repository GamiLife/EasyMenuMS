'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const rows = [
      {
        title: 'Mostaza',
        description: 'Mostaza for nasty dishes',
        priceByUnit: 1.5,
        maxItems: 10,
        imageUrl:
          'https://frdadmin21.fridaysperu.com/media/catalog/product/f/r/fridays-peru-porcion-de-guacamole.jpg',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        title: 'Quetchup',
        description: 'Quetchup for spicy dishes',
        priceByUnit: 2.5,
        maxItems: 10,
        imageUrl:
          'https://frdadmin21.fridaysperu.com/media/catalog/product/l/o/loaded-potato-fried_fridays-peru.jpg',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        title: 'Mayonesa',
        description: 'Mayonesa for spicy dishes',
        priceByUnit: 8.5,
        maxItems: 10,
        imageUrl:
          'https://frdadmin21.fridaysperu.com/media/catalog/product/l/o/loaded-potato-fried_fridays-peru.jpg',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        title: 'Ocopa',
        description: 'Ocopa for spicy dishes',
        priceByUnit: 9.5,
        maxItems: 10,
        imageUrl:
          'https://frdadmin21.fridaysperu.com/media/catalog/product/l/o/loaded-potato-fried_fridays-peru.jpg',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        title: 'Tamarindo',
        description: 'Tamarindo for spicy dishes',
        priceByUnit: 2.5,
        maxItems: 10,
        imageUrl:
          'https://frdadmin21.fridaysperu.com/media/catalog/product/l/o/loaded-potato-fried_fridays-peru.jpg',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        title: 'Leche de Tigre',
        description: 'Leche de Tigre for spicy dishes',
        priceByUnit: 2.5,
        maxItems: 10,
        imageUrl:
          'https://frdadmin21.fridaysperu.com/media/catalog/product/l/o/loaded-potato-fried_fridays-peru.jpg',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        title: 'Aji',
        description: 'Aji for spicy dishes',
        priceByUnit: 2.5,
        maxItems: 10,
        imageUrl:
          'https://frdadmin21.fridaysperu.com/media/catalog/product/l/o/loaded-potato-fried_fridays-peru.jpg',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        title: 'Rocoto',
        description: 'Rocoto for spicy dishes',
        priceByUnit: 12.5,
        maxItems: 10,
        imageUrl:
          'https://frdadmin21.fridaysperu.com/media/catalog/product/l/o/loaded-potato-fried_fridays-peru.jpg',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
    ];
    await queryInterface.bulkInsert('sauces', rows, {});
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
