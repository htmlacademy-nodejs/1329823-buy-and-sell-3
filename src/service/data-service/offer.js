'use strict';

const {sequelize} = require(`../db-connect`);
const {Offer, Comment, Category, offersToCategories, User} = sequelize.models;
const NEW_OFFER_LIMIT = 8;
const POPULAR_OFFER_LIMIT = 8;

class OfferService {

  async createOffer(offerData) {
    const newOffer = await Offer.create(offerData, {returning: true});
    await newOffer.addCategories(offerData.categories);
    return newOffer;
  }

  async deleteOffer(offerId) {
    return await Offer.destroy({where: {id: offerId}});
  }

  async findAll() {
    const offers = await Offer.findAll({
      include: [`categories`],
      order: [[`date`, `DESC`]],
      limit: NEW_OFFER_LIMIT
    });
    return offers;
  }

  async findOne(offerId) {
    const offers = await Offer.findByPk(offerId, {
      include: [
        `categories`,
        `users`,
        {
          model: Comment,
          as: `comments`,
          include: [{
            model: User,
            as: `users`,
            nested: true,
            attributes: [`firstname`, `lastname`, `avatar`]
          }]
        }
      ]
    });
    return offers;
  }

  async findOffersByCategoryId(categoryId) {
    const category = await Category.findByPk(categoryId);
    const offers = await category.getOffers({include: [`categories`]});
    return {category, offers};
  }

  async findByUserId(userId) {
    const offers = await Offer.findAll({
      include: [`categories`],
      where: {userId},
      order: [[`data`, `DESC`]]
    });
    return offers;
  }

  async fildLastOfferComment(userId) {
    const offers = await Offer.findAll({
      include: [
        {
          model: Comment,
          as: `comments`,
          include: [`users`],
          required: true,
        },
        `categories`
      ],
      where: {userId},
      order: sequelize.literal(`"comments"."date" DESC`)
    });
    return offers;
  }

  async updateOffer(offerId, offerData) {
    const [updateResult, [updatedOffer]] = await Offer.update(offerData, {
      where: {id: offerId},
      returning: true
    });
    if (!updateResult) {
      throw Error(`Offer is not updated ${offerId}`);
    }
    await offersToCategories.destroy({where: {offerId}});
    await updatedOffer.addCategories(offerData.categories);
    return updatedOffer;
  }

  async findMostDiscussedOffers() {
    const offers = await Offer.findAll({
      attributes: {
        include: [[sequelize.fn(`count`, sequelize.col(`comments.offerId`)), `commentsCount`]]
      },
      include: [
        {
          model: Comment,
          as: `comments`,
          attributes: [],
          required: true,
          duplicating: false
        },
        {
          model: Category,
          as: `categories`,
          duplicating: false
        }
      ],
      group: [`Offer.id`, `categories.id`, `categories->offerstoCategories.offerId`, `categories->offerstoCategories.categoryId`],
      order: sequelize.literal(`"commentsCount" DESC`),
      limit: POPULAR_OFFER_LIMIT
    });
    return offers;
  }
}

module.exports = OfferService;
