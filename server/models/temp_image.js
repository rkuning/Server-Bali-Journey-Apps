'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class temp_image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  temp_image.init({
    userId: DataTypes.INTEGER,
    destinationId: DataTypes.INTEGER,
    package_tripId: DataTypes.INTEGER,
    reviewId: DataTypes.INTEGER,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'temp_image',
  });
  return temp_image;
};