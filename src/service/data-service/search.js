'use strict';

const {sequelize} = require(`../db-connect`);
const {Offer} = sequelize.models;
const {Op} = require(`sequelize`);

class SearchService {

  async findAll(searchText) {
    const offers = Offer.findAll({
      include: [`categories`],
      where: {
        title:{
          [Op.iLike]: `%${searchText}%`
        }
      }
    });
    return offers;
  }
}

module.exports = SearchService;
