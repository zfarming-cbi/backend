'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Farms', [
      {
        name: 'Granja 1',
        description: 'Granja de Zanahorias',
        start_crop_dt: '2023-06-01',
        end_crop_dt: '2023-08-10',
        companyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Granja 2',
        description: 'Granja de Pepinos',
        start_crop_dt: '2023-07-15',
        end_crop_dt: '2023-09-30',
        companyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Granja 3',
        description: 'Granja de Cebollas',
        start_crop_dt: '2023-08-20',
        end_crop_dt: '2023-11-30',
        companyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Granja 4',
        description: 'Granja de Perejil',
        start_crop_dt: '2023-09-10',
        end_crop_dt: '2023-12-05',
        companyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Granja 5',
        description: 'Granja de Tomates',
        start_crop_dt: '2023-07-25',
        end_crop_dt: '2023-10-20',
        companyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Granja 6',
        description: 'Granja de Lechugas',
        start_crop_dt: '2023-08-05',
        end_crop_dt: '2023-11-15',
        companyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Granja 7',
        description: 'Granja de Pimientos',
        start_crop_dt: '2023-09-01',
        end_crop_dt: '2023-12-20',
        companyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Granja 8',
        description: 'Granja de Albahaca',
        start_crop_dt: '2023-07-10',
        end_crop_dt: '2023-09-25',
        companyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Granja 9',
        description: 'Granja de Espinacas',
        start_crop_dt: '2023-08-15',
        end_crop_dt: '2023-10-30',
        companyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Granja 10',
        description: 'Granja de Fresas',
        companyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        start_crop_dt: '2023-09-05',
        end_crop_dt: '2023-12-10',
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
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