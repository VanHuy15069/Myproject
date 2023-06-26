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
      Music.hasMany(models.MusicDetail, {foreignKey: 'musicId', as: 'musicInfo'})
      Music.hasMany(models.Comment, {foreignKey: 'musicId', as: 'musicInfo'})
      Music.hasMany(models.Favorite, {foreignKey: 'musicId', as: 'musicInfo'})
      Music.belongsTo(models.Category, {foreignKey: 'categoryId', targetKey: 'id', as: 'categoryInfo'})
    }
  }
  Music.init({
    categoryId: DataTypes.INTEGER,
    musicName: DataTypes.STRING,
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