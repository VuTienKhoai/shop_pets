'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {

      Order.belongsTo(models.User,{
        foreignKey:'id_user'
      })
    }
  }
  Order.init({
    id_user:DataTypes.INTEGER,
    thuCung:DataTypes.JSON,
    tongTien:DataTypes.FLOAT,
    status:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};