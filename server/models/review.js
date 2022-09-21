"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // ? asosiasi key ke table lain
      review.hasMany(models.temp_image, {
        foreignKey: "reviewId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      // ? asosiasi primary key dari tabel lain
      review.belongsTo(models.user, {
        foreignKey: "userId",
      });
      review.belongsTo(models.package_trip, {
        foreignKey: "package_tripId",
      });
      review.belongsTo(models.destination, {
        foreignKey: "destinationId",
      });
    }
  }
  review.init(
    {
      comment: DataTypes.TEXT,
      rating: DataTypes.FLOAT,
      userId: DataTypes.INTEGER,
      destinationId: DataTypes.INTEGER,
      package_tripId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "review",
    }
  );
  return review;
};
