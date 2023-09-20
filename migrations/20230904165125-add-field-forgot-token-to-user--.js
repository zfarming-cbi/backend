'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const columnName = 'uuid_forgot';
    const tableName = 'Users';
    const table = await queryInterface.describeTable(tableName);
    if (!table[columnName]) {
      await queryInterface.addColumn('Users', 'uuid_forgot', {
        type: Sequelize.STRING,
        allowNull: true, // O el valor que corresponda según tus necesidades
      });
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
