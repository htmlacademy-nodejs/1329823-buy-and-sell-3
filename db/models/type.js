'use strict';

module.exports = (sequelize, DataTypes) => {
  class Type extends sequelize.Sequelize.Model { }
  Type.init({
    id: {
      type: DataTypes.INTEGER,
      primeryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    typeName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
  });

  return Type;
};
