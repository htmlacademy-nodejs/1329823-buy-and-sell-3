'use strict';

module.exports = (sequelize, DataTypes) => {
  class OfferToCategory extends sequelize.Sequelize.Model { }
  OfferToCategory.init({
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

  return OfferToCategory;
};
