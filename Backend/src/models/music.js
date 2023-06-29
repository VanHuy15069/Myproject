'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Music extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Music.belongsTo(models.Singer, {foreignKey: 'singerId', targetKey: 'id', as: 'singerInfo'})
      Music.hasMany(models.Favorite, {foreignKey: 'musicId', as: 'musicFavorite'})
      Music.belongsTo(models.Category, {foreignKey: 'categoryId', targetKey: 'id', as: 'categoryInfo'})
    }
  }
  Music.init({
    categoryId: DataTypes.INTEGER,
    singerId: DataTypes.INTEGER,
    musicName: DataTypes.STRING,
    musicLink: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    views: DataTypes.INTEGER,
    downLoad: DataTypes.INTEGER,
    vip: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Music',
  });
  return Music;
};