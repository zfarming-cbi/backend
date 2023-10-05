'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Sensors', [
      {
        code: '001',
        name: 'Sensor de pH',
        description: 'Mide el nivel de pH del agua en el sistema hidropónico.',
        graphical_unit: 'pH',
        min_range: 0,
        max_range: 14,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: '002',
        name: 'Sensor de Conductividad Eléctrica',
        description:
          'Mide la conductividad eléctrica del agua para controlar la concentración de nutrientes.',
        graphical_unit: 'mS/cm',
        min_range: 0,
        max_range: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: '003',
        name: 'Sensor de Humedad del Suelo',
        description:
          'Mide la humedad del sustrato para garantizar condiciones óptimas para las raíces.',
        graphical_unit: '%',
        min_range: 0,
        max_range: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: '004',
        name: 'Sensor de Temperatura del Agua',
        description:
          'Mide la temperatura del agua en el sistema hidropónico para controlar las condiciones de crecimiento.',
        graphical_unit: '°C',
        min_range: 0,
        max_range: 40,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: '005',
        name: 'Sensor de Luz',
        description:
          'Mide la intensidad de la luz para asegurar la iluminación adecuada en el cultivo hidropónico.',
        graphical_unit: 'lux',
        min_range: 0,
        max_range: 100000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: '006',
        name: 'Sensor de Oxígeno Disuelto',
        description:
          'Mide el nivel de oxígeno disuelto en el agua, es esencial para las raíces de las plantas.',
        graphical_unit: 'mg/L',
        min_range: 0,
        max_range: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: '007',
        name: 'Sensor de EC de Sustrato',
        description:
          'Mide la conductividad eléctrica del sustrato para controlar la concentración de nutrientes en la zona de las raíces.',
        graphical_unit: 'mS/cm',
        min_range: 0,
        max_range: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: '008',
        name: 'Sensor de CO2',
        description:
          'Mide la concentración de dióxido de carbono en el aire para optimizar la fotosíntesis de las plantas.',
        graphical_unit: 'ppm',
        min_range: 0,
        max_range: 2000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: '009',
        name: 'Sensor de Humedad Relativa',
        description:
          'Mide la humedad relativa del aire para mantener condiciones óptimas de crecimiento.',
        graphical_unit: '%',
        min_range: 0,
        max_range: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: '010',
        name: 'Sensor de Nutrientes',
        description:
          'Mide la concentración de nutrientes esenciales en la solución nutritiva.',
        graphical_unit: 'ppm',
        min_range: 0,
        max_range: 3000,
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
