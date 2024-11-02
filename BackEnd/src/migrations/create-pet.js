'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      describe: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.TEXT,
        defaultValue:"https://wallpapercave.com/wp/wp9015508.jpg"
      },
      species: {
        type: Sequelize.STRING
      },
      avatar_detail: {
        type: Sequelize.TEXT
      },
      id_category:{
        type:Sequelize.INTEGER
      },
      quantity:{
        type:Sequelize.INTEGER
      },
      top_quantity:{
        type:Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pets');
  }
};