'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Plants', [
      {
        name: 'Tomate Cherry',
        growing_time: '2023-01-10',
        content:
          '### Cómo cultivar Tomates Cherry\n\nPara cultivar tomates cherry en un sistema hidropónico, sigue estos pasos:\n\n1. **Semillas**: Planta las semillas de tomate cherry en cubos de lana de roca o en un medio de cultivo adecuado.\n2. **Luz**: Proporciona luz adecuada, preferiblemente con luces LED de espectro completo.\n3. **Nutrientes**: Utiliza una solución de nutrientes balanceada para hidroponía y mantenla a pH neutro.\n4. **Temperatura y Humedad**: Mantén una temperatura entre 20-25°C y la humedad relativa alrededor del 70%.\n5. **Cosecha**: Los tomates cherry estarán listos para cosechar en aproximadamente 70-80 días.\n',
        companyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Lechuga',
        growing_time: '2023-02-05',
        companyId: 1,
        content:
          '### Cómo cultivar Lechuga\n\nLa lechuga es ideal para la hidroponía debido a su rápido crecimiento. Sigue estos pasos:\n\n1. **Semillas**: Planta las semillas de lechuga en un sistema de tuberías o canaletas.\n2. **Luz**: Proporciona luz constante durante 12-16 horas al día.\n3. **Nutrientes**: Utiliza una solución rica en nitrógeno y otros nutrientes esenciales.\n4. **Temperatura**: Mantén la temperatura alrededor de 18-22°C.\n5. **Cosecha**: La lechuga estará lista para cosechar en 30-45 días.\n',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Albahaca',
        growing_time: '2023-03-20',
        companyId: 1,
        content:
          '### Cómo cultivar Albahaca\n\nLa albahaca es una planta aromática que prospera en sistemas hidropónicos. Sigue estos pasos:\n\n1. **Semillas**: Planta las semillas de albahaca en cubos de lana de roca o en un medio de cultivo adecuado.\n2. **Luz**: Proporciona luz constante durante 12-14 horas al día.\n3. **Nutrientes**: Utiliza una solución de nutrientes equilibrada con niveles moderados de nitrógeno.\n4. **Temperatura**: Mantén la temperatura entre 18-25°C para un crecimiento óptimo.\n5. **Cosecha**: La albahaca estará lista para cosechar en 60-90 días.\n',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Fresa',
        growing_time: '2023-04-15',
        companyId: 1,
        content:
          '### Cómo cultivar Fresas\n\nLas fresas se pueden cultivar de manera exitosa en sistemas hidropónicos. Sigue estos pasos:\n\n1. **Plántulas**: Comienza con plántulas de fresa en lugar de semillas.\n2. **Luz**: Proporciona al menos 8-10 horas de luz diaria con un espectro adecuado.\n3. **Nutrientes**: Utiliza una solución de nutrientes específica para fresas y ajusta el pH a 5.8-6.2.\n4. **Temperatura**: Mantén la temperatura entre 18-24°C.\n5. **Cosecha**: Las fresas estarán listas para cosechar en aproximadamente 3-4 meses.\n',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Espinaca',
        growing_time: '2023-05-10',
        companyId: 1,
        content:
          '### Cómo cultivar Espinaca\n\nLa espinaca es una verdura de hoja verde que se cultiva bien en sistemas hidropónicos. Sigue estos pasos:\n\n1. **Semillas o plántulas**: Puedes comenzar con semillas o plántulas de espinaca.\n2. **Luz**: Proporciona al menos 12-14 horas de luz al día.\n3. **Nutrientes**: Utiliza una solución rica en nitrógeno y ajusta el pH a 6.0-6.5.\n4. **Temperatura**: Mantén la temperatura entre 15-20°C.\n5. **Cosecha**: La espinaca estará lista para cosechar en 40-50 días.\n',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Pimiento',
        growing_time: '2023-06-02',
        companyId: 1,
        content:
          '### Cómo cultivar Pimientos\n\nLos pimientos se desarrollan bien en sistemas hidropónicos. Sigue estos pasos:\n\n1. **Semillas o plántulas**: Puedes comenzar con semillas o plántulas de pimiento.\n2. **Luz**: Proporciona al menos 12-14 horas de luz al día con un espectro adecuado.\n3. **Nutrientes**: Utiliza una solución de nutrientes equilibrada y ajusta el pH a 6.0-6.5.\n4. **Temperatura**: Mantén la temperatura entre 20-25°C.\n5. **Cosecha**: Los pimientos estarán listos para cosechar en 70-90 días.\n',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Zanahoria',
        growing_time: '2023-07-15',
        companyId: 1,
        content:
          '### Cómo cultivar Zanahorias\n\nLas zanahorias se pueden cultivar en sistemas hidropónicos con algunos cuidados especiales. Sigue estos pasos:\n\n1. **Semillas**: Planta las semillas de zanahoria en un medio de cultivo con buen drenaje.\n2. **Luz**: Proporciona al menos 14-16 horas de luz al día.\n3. **Nutrientes**: Utiliza una solución de nutrientes equilibrada y ajusta el pH a 6.0-6.5.\n4. **Temperatura**: Mantén la temperatura entre 15-20°C.\n5. **Cosecha**: Las zanahorias estarán listas para cosechar en 60-80 días.\n',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Pepino',
        growing_time: '2023-08-10',
        companyId: 1,
        content:
          '### Cómo cultivar Pepinos\n\nLos pepinos se pueden cultivar con éxito en sistemas hidropónicos. Sigue estos pasos:\n\n1. **Semillas o plántulas**: Puedes comenzar con semillas o plántulas de pepino.\n2. **Luz**: Proporciona al menos 14-16 horas de luz al día con un espectro adecuado.\n3. **Nutrientes**: Utiliza una solución de nutrientes equilibrada y ajusta el pH a 6.0-6.5.\n4. **Temperatura**: Mantén la temperatura entre 20-25°C.\n5. **Cosecha**: Los pepinos estarán listos para cosechar en 50-70 días.\n',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cebolla',
        growing_time: '2023-09-20',
        companyId: 1,
        content:
          '### Cómo cultivar Cebollas\n\nLas cebollas se desarrollan bien en sistemas hidropónicos. Sigue estos pasos:\n\n1. **Semillas o plántulas**: Puedes comenzar con semillas o plántulas de cebolla.\n2. **Luz**: Proporciona al menos 12-14 horas de luz al día.\n3. **Nutrientes**: Utiliza una solución rica en nitrógeno y ajusta el pH a 6.0-6.5.\n4. **Temperatura**: Mantén la temperatura entre 18-24°C.\n5. **Cosecha**: Las cebollas estarán listas para cosechar en 90-120 días.\n',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Perejil',
        growing_time: '2023-10-05',
        companyId: 1,
        content:
          '### Cómo cultivar Perejil\n\nEl perejil es una hierba aromática que se adapta bien a sistemas hidropónicos. Sigue estos pasos:\n\n1. **Semillas o plántulas**: Puedes comenzar con semillas o plántulas de perejil.\n2. **Luz**: Proporciona al menos 12-14 horas de luz al día con un espectro adecuado.\n3. **Nutrientes**: Utiliza una solución de nutrientes equilibrada y ajusta el pH a 6.0-6.5.\n4. **Temperatura**: Mantén la temperatura entre 18-22°C.\n5. **Cosecha**: El perejil estará listo para cosechar en 60-90 días.\n',
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
