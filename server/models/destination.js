'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class destination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  destination.init({
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    rating: DataTypes.FLOAT,
    description: DataTypes.TEXT,
    address: DataTypes.STRING,
    open_day: DataTypes.STRING,
    open_time: DataTypes.STRING,
    map_link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'destination',
  });
  return destination;
};