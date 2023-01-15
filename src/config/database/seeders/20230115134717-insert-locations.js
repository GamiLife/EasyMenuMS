'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const rows = [
      {
        name: 'Location1',
        address: 'Av. Santa Cruz 824, Miraflores',
        phone: '+5116449099',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        name: 'Location2',
        address: 'Av. Santa Cruz 824, Miraflores',
        phone: '01 644 9099',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        name: 'Location3',
        address: 'Av. Santa Cruz 824, Miraflores',
        phone: '01 644 9099',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        name: 'Location4',
        address: 'Av. La Marina 2355 - C.C. La Marina Open Plaza - San Miguel',
        phone: '+5116449099',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        name: 'Location5',
        address: 'Av. Santa Cruz 824, Miraflores',
        phone: '+5116449099',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        name: 'Location6',
        address: 'Av. La Marina 2355 - C.C. La Marina Open Plaza - San Miguel',
        phone: '+5116449099',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        name: 'Location7',
        address: 'Av. Santa Cruz 824, Miraflores',
        phone: '01 644 9099',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        name: 'Location8',
        address: 'Av. La Marina 2355 - C.C. La Marina Open Plaza - San Miguel',
        phone: '01 644 9099',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        name: 'Location9',
        address: 'Av. Santa Cruz 824, Miraflores',
        phone: '01 644 9099',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        name: 'Location10',
        address: 'Av. Santa Cruz 824, Miraflores',
        phone: '+5116449099',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        name: 'Location11',
        address: 'Av. Santa Cruz 824, Miraflores',
        phone: '+5116449099',
        companyId: 1,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
      {
        name: 'Location1',
        address: 'Av. Santa Cruz 824, Miraflores',
        phone: '+5116449099',
        companyId: 2,
        createdAt: '2022-11-11 00:00:00',
        updatedAt: '2022-11-11 00:00:00',
      },
    ];
    await queryInterface.bulkInsert('locations', rows, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
