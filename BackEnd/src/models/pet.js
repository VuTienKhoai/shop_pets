'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pet.belongsTo(models.Bill, {
        foreignKey: 'id',
      });
      Pet.belongsTo(models.Cart, {
        foreignKey: 'id',
      });
    }
  }
  Pet.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    describe: DataTypes.STRING,
    avatar: DataTypes.TEXT,
    species: DataTypes.STRING,
    avatar_detail: DataTypes.TEXT,
    id_category: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    top_quantity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Pet',
  });
  return Pet;
};