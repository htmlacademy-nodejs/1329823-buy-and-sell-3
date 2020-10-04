'use strict';

const {Router} = require(`express`);

const getMainRouter = (service) => {
  const mainRouter = new Router();
  mainRouter.get(`/`, async (req, res, next) => {
    try {
      const {offers, mostDiscussedOffers} = await service.getAllOffers();
      const categories = await service.getAllCategoriesWithOffers();
      return res.render(`main/main`, {
        offers,
        categories,
        mostDiscussedOffers
      });
    } catch (err) {
      return next(err);
    }
  });

  mainRouter.get(`/register`, (req, res) => res.render(`main/sing-up`));
  mainRouter.get(`/login`, (req, res) => res.render(`main/login`));

  mainRouter.get(`/search`, async (req, res, next) => {
    try {
      const {query} = req.query;
      const searchResult = await service.searchOffers(query);
      const {offers} = await service.getAllOffers();
      return res.render(`main/search-result`, {
        offers: searchResult,
        newOffers: offers
      });
    } catch (err) {
      return next(err);
    }
  });
  return mainRouter;
};

module.exports = {getMainRouter};
