'use strict';

const {getCategoryRouter} = require(`./categories`);
const {getOffersRouter} = require(`./offers`);
const {getSearchRouter} = require(`./search`);

module.exports = {
  getCategoryRouter,
  getOffersRouter,
  getSearchRouter
};
