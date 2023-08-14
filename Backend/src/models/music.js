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
      Music.belongsTo(models.Topic, {foreignKey: 'topicId', targetKey: 'id', as: 'topicInfo'})
      Music.belongsTo(models.Category, {foreignKey: 'categoryId', targetKey: 'id', as: 'categoryInfo'})
      Music.belongsTo(models.Nation, {foreignKey: 'nationId', targetKey: 'id', as: 'nationInfo'})
    }
  }
  Music.init({
    categoryId: DataTypes.INTEGER,
    topicId: DataTypes.INTEGER,
    nationId: DataTypes.INTEGER,
    singerId: DataTypes.INTEGER,
    musicName: DataTypes.STRING,
    musicLink: DataTypes.STRING,
    views: DataTypes.INTEGER,
    image: DataTypes.STRING,
    vip: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Music',
  });
  return Music;
};