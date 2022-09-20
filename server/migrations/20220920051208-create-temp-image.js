"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("temp_images", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      destinationId: {
        type: Sequelize.INTEGER,
      },
      package_tripId: {
        type: Sequelize.INTEGER,
      },
      reviewId: {
        type: Sequelize.INTEGER,
      },
      img: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("temp_images");
  },
};
