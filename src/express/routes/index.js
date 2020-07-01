'use strict';

const {getOffersRouter} = require(`./offers`);
const {getMyRouter} = require(`./my`);
const {getMainRouter} = require(`./main`);

module.exports = {
  getOffersRouter,
  getMyRouter,
  getMainRouter
};
