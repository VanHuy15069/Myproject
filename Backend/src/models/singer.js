'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Singer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Singer.hasMany(models.Music, {foreignKey: 'singerId',  as: 'musicInfo'})
      Singer.hasMany(models.Follow, {foreignKey: 'singerId', as: 'singerFollow'})
    }
  }
  Singer.init({
    singerName: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Singer',
  });
  return Singer;
};