'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bill.belongsTo(models.User,{
        foreignKey:'id_user'
      })
      Bill.belongsTo(models.Pet,{
        foreignKey:'id_ThuCung',
      });
    }
  }
  Bill.init({
    id_user:DataTypes.INTEGER,
    id_ThuCung:DataTypes.INTEGER,
    soLuong: DataTypes.INTEGER,
    tongTien:DataTypes.FLOAT,
    status:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Bill',
  });
  return Bill;
};