'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favorite.belongsTo(models.User, {foreignKey: 'userId', targetKey: 'id', as: 'userInfo'})
      Favorite.belongsTo(models.Music, {foreignKey: 'musicId', targetKey: 'id', as: 'musicInfo'})
    }
  }
  Favorite.init({
    userId: DataTypes.INTEGER,
    musicId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};