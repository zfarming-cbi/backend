'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert('MeassuringHistoricals', [
      {
        id: 1,
        value: '2.3',
        sensorId: 1,
        deviceId: 2,
        farmId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        value: '3.7',
        sensorId: 1,
        deviceId: 2,
        farmId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        value: '4.3',
        sensorId: 3,
        deviceId: 1,
        farmId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        value: '7.7',
        sensorId: 3,
        deviceId: 1,
        farmId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        value: '9.2',
        sensorId: 2,
        deviceId: 1,
        farmId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        value: '5.2',
        sensorId: 2,
        deviceId: 2,
        farmId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        value: '4.8',
        sensorId: 2,
        deviceId: 3,
        farmId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        value: '1.9',
        sensorId: 3,
        deviceId: 3,
        farmId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
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
