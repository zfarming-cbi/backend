'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Plants', [
      {
        name: 'Tomate',
        growing_time: '2023/10/04',
        companyId: 1,
        content:
          'Los tomates son una planta popular en la huerta debido a su versatilidad en la cocina. Pueden ser cultivados en macetas o en el suelo y requieren un sustrato bien drenado. Asegúrate de proporcionar suficiente luz solar y riego constante para obtener una cosecha saludable. Los tomates suelen tardar alrededor de 70-90 días en madurar después de la siembra.',
        image: 'src/assets/tomates.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cilantro',
        image: 'src/assets/cilantro.jpg',
        growing_time: '2023/10/04',
        companyId: 1,
        content:
          'El cilantro es una hierba aromática ampliamente utilizada en diversas cocinas. Se puede cultivar en macetas o en el suelo, y prefiere la sombra parcial y un sustrato rico en nutrientes. Sus hojas son comestibles y se pueden cosechar cuando la planta alcanza una altura suficiente. El cilantro es conocido por su sabor único y fresco.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Repollo',
        image: 'src/assets/repollo.jpg',
        growing_time: '2023/10/04',
        companyId: 1,
        content:
          'El repollo es una verdura de hoja que crece en cabezas compactas. Es una planta resistente y puede tolerar condiciones de frío. Se debe plantar en sustrato bien drenado y enriquecido con materia orgánica. La madurez del repollo se alcanza generalmente en 70-100 días después de la siembra, dependiendo de la variedad.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Perejil',
        image: 'src/assets/perejil.jpg',
        growing_time: '2023/10/04',
        companyId: 1,
        content:
          'El perejil es una hierba aromática ampliamente utilizada en la cocina. Se puede cultivar en macetas o en el suelo y prefiere la luz solar parcial. Sus hojas son ricas en sabor y se pueden cosechar a medida que crece. El perejil es una planta anual que se renueva cada año.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Limoncillo',
        image: 'src/assets/limoncillo.jpg',
        growing_time: '2023/10/04',
        companyId: 1,
        content:
          'El limoncillo es una hierba aromática conocida por su sabor cítrico. Se puede cultivar en macetas o en el suelo y prefiere pleno sol. Sus tallos se utilizan en la cocina y para hacer té. El limoncillo es fácil de cultivar y puede crecer durante todo el año en climas cálidos.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Algodón',
        image: 'src/assets/algodon.jpg',
        growing_time: '2023/10/04',
        companyId: 1,
        content:
          'El algodón es una planta que produce fibras utilizadas en la fabricación de textiles. Requiere un clima cálido y suelos bien drenados. El proceso de cultivo del algodón es largo y requiere cuidado constante, desde la siembra hasta la cosecha. Las fibras de algodón se obtienen de las cápsulas de las semillas maduras.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Aguacate',
        image: 'src/assets/aguacate.jpg',
        growing_time: '2023/10/04',
        companyId: 1,
        content:
          'El aguacate es un árbol frutal que produce una fruta rica en grasas saludables. Se debe plantar en un lugar soleado y en suelos bien drenados. El aguacate es conocido por su largo tiempo de maduración, que puede llevar varios años. Las flores del aguacate son hermafroditas y requieren polinización para la producción de frutas.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Pan de árbol',
        image: 'src/assets/pan-de-arbol.jpg',
        growing_time: '2023/10/04',
        companyId: 1,
        content:
          'El pan de árbol es una planta tropical conocida por sus frutos de sabor dulce. Se debe plantar en climas cálidos y húmedos. Los frutos maduran en 8-10 meses después de la floración. El pan de árbol es una fuente importante de carbohidratos en muchas regiones tropicales.',

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
