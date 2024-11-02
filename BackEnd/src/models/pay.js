'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pay extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pay.init({
    idNhanVien: DataTypes.STRING,
    idKhachHang: DataTypes.STRING,
    totalPrice: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Pay',
  });
  return Pay;
};