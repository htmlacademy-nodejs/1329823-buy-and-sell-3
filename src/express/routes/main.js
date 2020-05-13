'use strict';

const {Router} = require(`express`);
const mainRouter = new Router();
const {logger} = require(`../../service/logger`);
const axios = require(`axios`);
const {getUrlRequest} = require(`../../service/cli/utils`);

mainRouter.get(`/`, async (req, res) => {
  let offers = [];
  try {
    offers = (await axios.get(getUrlRequest(req, `../../service/routes/offers`))).data;
  } catch (err) {
    logger.error(`Error getting list offers, ${err}`);
    return;
  }
  res.render(`main/main`, {offers});
  logger.info(`Status code ${res.statusCode}`);
  return;
});

mainRouter.get(`/register`, async (req, res) => {
  res.render(`main/sing-up`);
  logger.info(`Status code ${res.statusCode}`);
  return;
});

mainRouter.get(`/login`, (req, res) => {
  res.render(`main/login`);
  logger.info(`Status code ${res.statusCode}`);
  return;
});

mainRouter.get(`/search`, async (req, res) => {
  let offers = [];
  try {
    offers = (await axios.get(getUrlRequest(req, `../../service/routes/search/?query=${encodeURIComponent(req.query.search)}`))).data;
  } catch (err) {
    logger.error(`Error getting list offers`);
  }
  res.render(`main/search-result`, {offers});
  logger.info(`Status code ${res.statusCode}`);
  return;
});

module.exports = mainRouter;
