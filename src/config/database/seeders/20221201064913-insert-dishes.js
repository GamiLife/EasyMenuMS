"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "dishes",
      [
        {
          id: 1,
          title: "Ceviche",
          slug: "ceviche",
          description: "Food with sea food ingredients",
          price: 21.5,
          imageUrl:
            "https://frdadmin21.fridaysperu.com/media/catalog/product/w/i/wings-texas-spiced-bbq.jpg",
          categoryId: 1,
          companyId: 1,
          createdAt: "2022-11-11 00:00:00",
          updatedAt: "2022-11-11 00:00:00",
        },
        {
          id: 2,
          title: "Tiradito",
          slug: "tiradito",
          description: "Food with sea food and specil fish",
          price: 16.5,
          imageUrl:
            "https://frdadmin21.fridaysperu.com/media/catalog/product/w/i/wings-texas-spiced-bbq.jpg",
          categoryId: 1,
          companyId: 1,
          createdAt: "2022-11-11 00:00:00",
          updatedAt: "2022-11-11 00:00:00",
        },
        {
          id: 3,
          title: "Arroz Con Pollo",
          slug: "arroz-con-pollo",
          description: "Food with sea food and specil fish",
          price: 16.5,
          imageUrl:
            "https://frdadmin21.fridaysperu.com/media/catalog/product/w/i/wings-texas-spiced-bbq.jpg",
          categoryId: 1,
          companyId: 1,
          createdAt: "2022-11-11 00:00:00",
          updatedAt: "2022-11-11 00:00:00",
        },
        {
          id: 4,
          title: "Arroz con pato",
          slug: "arroz-con-pato",
          description: "Food with sea food and specil fish",
          price: 16.5,
          imageUrl:
            "https://frdadmin21.fridaysperu.com/media/catalog/product/w/i/wings-texas-spiced-bbq.jpg",
          categoryId: 1,
          companyId: 1,
          createdAt: "2022-11-11 00:00:00",
          updatedAt: "2022-11-11 00:00:00",
        },
        {
          id: 5,
          title: "Pure",
          slug: "pure",
          description: "Food with sea food and specil fish",
          price: 16.5,
          imageUrl:
            "https://frdadmin21.fridaysperu.com/media/catalog/product/w/i/wings-texas-spiced-bbq.jpg",
          categoryId: 1,
          companyId: 1,
          createdAt: "2022-11-11 00:00:00",
          updatedAt: "2022-11-11 00:00:00",
        },
        {
          id: 6,
          title: "Jalea Mixta",
          slug: "jalea-mixta",
          description: "Food with sea food and specil fish",
          price: 16.5,
          imageUrl:
            "https://frdadmin21.fridaysperu.com/media/catalog/product/w/i/wings-texas-spiced-bbq.jpg",
          categoryId: 1,
          companyId: 1,
          createdAt: "2022-11-11 00:00:00",
          updatedAt: "2022-11-11 00:00:00",
        },
        {
          id: 7,
          title: "Sopa de pollo",
          slug: "sopa-de-pollo",
          description: "Food with sea food and specil fish",
          price: 16.5,
          imageUrl:
            "https://frdadmin21.fridaysperu.com/media/catalog/product/w/i/wings-texas-spiced-bbq.jpg",
          categoryId: 1,
          companyId: 1,
          createdAt: "2022-11-11 00:00:00",
          updatedAt: "2022-11-11 00:00:00",
        },
        {
          id: 8,
          title: "coliflor saltado",
          slug: "coliflor-saltado",
          description: "Food with sea food and specil fish",
          price: 16.5,
          imageUrl:
            "https://frdadmin21.fridaysperu.com/media/catalog/product/w/i/wings-texas-spiced-bbq.jpg",
          categoryId: 1,
          companyId: 1,
          createdAt: "2022-11-11 00:00:00",
          updatedAt: "2022-11-11 00:00:00",
        },
        {
          id: 9,
          title: "lomo-saltado",
          slug: "lomo-saltado",
          description: "Food with sea food and specil fish",
          price: 16.5,
          imageUrl:
            "https://frdadmin21.fridaysperu.com/media/catalog/product/w/i/wings-texas-spiced-bbq.jpg",
          categoryId: 1,
          companyId: 1,
          createdAt: "2022-11-11 00:00:00",
          updatedAt: "2022-11-11 00:00:00",
        },
        {
          id: 10,
          title: "Escaveche",
          slug: "escaveche",
          description: "Food with sea food and specil fish",
          price: 16.5,
          imageUrl:
            "https://frdadmin21.fridaysperu.com/media/catalog/product/w/i/wings-texas-spiced-bbq.jpg",
          categoryId: 1,
          companyId: 1,
          createdAt: "2022-11-11 00:00:00",
          updatedAt: "2022-11-11 00:00:00",
        },
        {
          id: 11,
          title: "Menestron",
          slug: "menestron",
          description: "Food with sea food and specil fish",
          price: 16.5,
          imageUrl:
            "https://frdadmin21.fridaysperu.com/media/catalog/product/w/i/wings-texas-spiced-bbq.jpg",
          categoryId: 1,
          companyId: 1,
          createdAt: "2022-11-11 00:00:00",
          updatedAt: "2022-11-11 00:00:00",
        },
        {
          id: 12,
          title: "Aguadito",
          slug: "aguadito",
          description: "Food with sea food and specil fish",
          price: 16.5,
          imageUrl:
            "https://frdadmin21.fridaysperu.com/media/catalog/product/w/i/wings-texas-spiced-bbq.jpg",
          categoryId: 1,
          companyId: 1,
          createdAt: "2022-11-11 00:00:00",
          updatedAt: "2022-11-11 00:00:00",
        },
        {
          id: 13,
          title: "Mondonguito a la italiana",
          slug: "mondonguito-a-la-italiana",
          description: "Food with sea food and specil fish",
          price: 16.5,
          imageUrl:
            "https://frdadmin21.fridaysperu.com/media/catalog/product/w/i/wings-texas-spiced-bbq.jpg",
          categoryId: 1,
          companyId: 1,
          createdAt: "2022-11-11 00:00:00",
          updatedAt: "2022-11-11 00:00:00",
        },
        {
          id: 14,
          title: "Aeropuerto",
          slug: "aeropuerto",
          description: "Food with sea food and specil fish",
          price: 16.5,
          imageUrl:
            "https://frdadmin21.fridaysperu.com/media/catalog/product/w/i/wings-texas-spiced-bbq.jpg",
          categoryId: 1,
          companyId: 1,
          createdAt: "2022-11-11 00:00:00",
          updatedAt: "2022-11-11 00:00:00",
        },
        {
          id: 15,
          title: "Estofado",
          slug: "estofado",
          description: "Food with sea food and specil fish",
          price: 16.5,
          imageUrl:
            "https://frdadmin21.fridaysperu.com/media/catalog/product/w/i/wings-texas-spiced-bbq.jpg",
          categoryId: 1,
          companyId: 1,
          createdAt: "2022-11-11 00:00:00",
          updatedAt: "2022-11-11 00:00:00",
        },
        {
          id: 16,
          title: "Carne de res",
          slug: "carne-de-res",
          description: "Food with sea food and specil fish",
          price: 16.5,
          imageUrl:
            "https://frdadmin21.fridaysperu.com/media/catalog/product/w/i/wings-texas-spiced-bbq.jpg",
          categoryId: 1,
          companyId: 1,
          createdAt: "2022-11-11 00:00:00",
          updatedAt: "2022-11-11 00:00:00",
        },
        {
          id: 17,
          title: "Arroz de quinua",
          slug: "arroz-de-quinua",
          description: "Food with sea food and specil fish",
          price: 16.5,
          imageUrl:
            "https://frdadmin21.fridaysperu.com/media/catalog/product/w/i/wings-texas-spiced-bbq.jpg",
          categoryId: 2,
          companyId: 1,
          createdAt: "2022-11-11 00:00:00",
          updatedAt: "2022-11-11 00:00:00",
        },
        {
          id: 18,
          title: "Tallarines rojos",
          slug: "tallarines-rojos",
          description: "Food with sea food and specil fish",
          price: 16.5,
          imageUrl:
            "https://frdadmin21.fridaysperu.com/media/catalog/product/w/i/wings-texas-spiced-bbq.jpg",
          categoryId: 2,
          companyId: 1,
          createdAt: "2022-11-11 00:00:00",
          updatedAt: "2022-11-11 00:00:00",
        },
        {
          id: 19,
          title: "Tallarines verdes",
          slug: "tallarines-verdes",
          description: "Food with sea food and specil fish",
          price: 16.5,
          imageUrl:
            "https://frdadmin21.fridaysperu.com/media/catalog/product/w/i/wings-texas-spiced-bbq.jpg",
          categoryId: 2,
          companyId: 1,
          createdAt: "2022-11-11 00:00:00",
          updatedAt: "2022-11-11 00:00:00",
        },
        {
          id: 20,
          title: "Tallarines saltados",
          slug: "tallarines-saltados",
          description: "Food with sea food and specil fish",
          price: 16.5,
          imageUrl:
            "https://frdadmin21.fridaysperu.com/media/catalog/product/w/i/wings-texas-spiced-bbq.jpg",
          categoryId: 2,
          companyId: 1,
          createdAt: "2022-11-11 00:00:00",
          updatedAt: "2022-11-11 00:00:00",
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
