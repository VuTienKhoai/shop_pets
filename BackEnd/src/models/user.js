'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gioiTinh: DataTypes.STRING,
    namSinh: DataTypes.DATE,
    sdt: DataTypes.INTEGER,
    diaChi: DataTypes.STRING,
    avatar: DataTypes.TEXT,
    role_id: DataTypes.STRING,
    resetToken: DataTypes.STRING,
    resetTokenExpiry: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};