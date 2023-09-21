'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Sensors', [
      {
        code: '001',
        name: 'Sensor A',
        description: 'Description for Sensor A',
        graphical_unit: '1',
        min_range: 10,
        max_range: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: '002',
        name: 'Sensor B',
        description: 'Description for Sensor B',
        graphical_unit: '1',
        min_range: 20,
        max_range: 60,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: '003',
        name: 'Sensor C',
        description: 'Description for Sensor C',
        graphical_unit: '1',
        min_range: 15,
        max_range: 55,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: '004',
        name: 'Sensor D',
        description: 'Description for Sensor D',
        graphical_unit: '1',
        min_range: 25,
        max_range: 70,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: '005',
        name: 'Sensor E',
        description: 'Description for Sensor E',
        graphical_unit: '1',
        min_range: 30,
        max_range: 75,
        createdAt: new Date(),
        updatedAt: new Date(),
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
