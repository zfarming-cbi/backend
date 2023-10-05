'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Devices', [
      {
        code: 'D001',
        name: 'Controlador de Cultivo',
        farmId: 1,
        companyId: 1,
        plantId: 1,
        description:
          'El Controlador de Cultivo es un dispositivo electrónico que recopila datos de sensores de pH, conductividad eléctrica, temperatura del agua y oxígeno disuelto. Utiliza estos datos para controlar automáticamente la nutrición y el ambiente en un sistema hidropónico.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: 'D002',
        name: 'Controlador de Luz',
        farmId: 1,
        companyId: 1,
        plantId: 1,
        description:
          'El Controlador de Luz es un dispositivo que regula la iluminación en un invernadero hidropónico. Monitorea la intensidad de la luz y ajusta la duración y el espectro de las luces LED para optimizar el crecimiento de las plantas.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: 'D003',
        name: 'Sistema de Riego Automático',
        farmId: 1,
        companyId: 1,
        plantId: 1,
        description:
          'Este sistema de riego automático está diseñado para distribuir la solución nutritiva de manera precisa en un cultivo hidropónico. Utiliza sensores de humedad del suelo y conductividad eléctrica del sustrato para determinar cuándo y cuánto regar.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: 'D004',
        name: 'Controlador de CO2',
        farmId: 1,
        companyId: 1,
        plantId: 1,
        description:
          'El Controlador de CO2 mide la concentración de dióxido de carbono en el aire y regula la inyección de CO2 para mantener niveles óptimos para la fotosíntesis en el cultivo hidropónico.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: 'D005',
        name: 'Sistema de Monitoreo Remoto',
        farmId: 1,
        companyId: 1,
        plantId: 1,
        description:
          'Este sistema permite el monitoreo y control a distancia de todos los sensores y dispositivos en un invernadero hidropónico. Proporciona datos en tiempo real y permite realizar ajustes desde una aplicación móvil.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: 'D006',
        name: 'Controlador de Temperatura y Humedad',
        farmId: 1,
        companyId: 1,
        plantId: 1,
        description:
          'Este controlador supervisa la temperatura y la humedad en un invernadero hidropónico y controla sistemas de ventilación y humidificación para mantener condiciones ideales para el crecimiento de las plantas.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: 'D007',
        name: 'Controlador de Nutrientes',
        farmId: 1,
        companyId: 1,
        plantId: 1,
        description:
          'El Controlador de Nutrientes regula la concentración de la solución nutritiva en función de los datos de los sensores de conductividad eléctrica y pH. Asegura que las plantas reciban los nutrientes adecuados en todo momento.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: 'D008',
        name: 'Controlador de Bombas de Agua',
        farmId: 1,
        companyId: 1,
        plantId: 1,
        description:
          'Este dispositivo controla las bombas de agua que distribuyen la solución nutritiva en el sistema hidropónico. Ajusta el flujo de agua según los datos de los sensores de humedad del suelo y conductividad eléctrica.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: 'D009',
        name: 'Sistema de Alarma',
        farmId: 1,
        companyId: 1,
        plantId: 1,
        description:
          'El Sistema de Alarma monitorea todos los sensores y dispositivos del cultivo hidropónico y emite alertas en caso de condiciones fuera de lo normal, como fluctuaciones extremas de temperatura o niveles críticos de nutrientes.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: 'D010',
        name: 'Controlador de Bombillas LED',
        farmId: 1,
        companyId: 1,
        plantId: 1,
        description:
          'Este controlador ajusta la intensidad y el espectro de las bombillas LED en función de las necesidades de luz de las plantas en diferentes etapas de crecimiento en un sistema hidropónico.',
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
