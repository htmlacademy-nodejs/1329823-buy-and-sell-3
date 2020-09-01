'use strict';

module.exports = (sequelize, DataTypes) => {
  class OffersToCategory extends sequelize.Sequelize.Model { }
  OffersToCategory.init({
    offerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
  });

  return OffersToCategory;
};
