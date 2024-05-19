'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClubMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ClubMember.init({
    memberId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER,
    departmentOfClubId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    isDeveloper: DataTypes.BOOLEAN,
    joinDate:DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ClubMember',
  });
  return ClubMember;
};