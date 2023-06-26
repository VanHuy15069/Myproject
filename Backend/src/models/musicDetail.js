'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MusicDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MusicDetail.belongsTo(models.Music, {foreignKey: 'musicId', targetKey: 'id', as: 'musicInfo'})
      MusicDetail.belongsTo(models.Singer, {foreignKey: 'singerId', targetKey: 'id', as: 'singerInfor'})
    }
  }
  MusicDetail.init({
    musicId: DataTypes.INTEGER,
    singerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MusicDetail',
  });
  return MusicDetail;
};