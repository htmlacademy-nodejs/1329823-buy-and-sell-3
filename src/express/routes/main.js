'use strict';

const {Router} = require(`express`);
const mainRouter = new Router();
const logger = require(`../../service/logger`);
const axios = require(`axios`);
const {getUrlRequest} = require(`../../service/cli/utils`);

mainRouter.get(`/`, async (req, res) => {
  let offers = [];
  try {
    offers = (await axios.get(getUrlRequest(req, `/api/offers`))).data;
  } catch (err) {
    logger.error(`Error getting list offers`);
    return;
  }
  res.render(`index`, {offers});
  logger.info(`Status code ${res.statusCode}`);
  return;
});

mainRouter.get(`/register`, async (req, res) => {
  res.render(`sing-up`);
  logger.info(`Status code ${res.statusCode}`);
  return;
});

mainRouter.get(`/login`, (req, res) => {
  res.render(`login`);
  logger.info(`Status code ${res.statusCode}`);
  return;
});

mainRouter.get(`/search`, async (req, res) => {
  let offers = [];
  try {
    offers = (await axios.get(getUrlRequest(req, `/api/search/?query=${encodeURIComponent(req.query.search)}`))).data;
  } catch (err) {
    logger.error(`Error getting list offers`);
  }
  res.render(`search-result`, {offers});
  logger.info(`Status code ${res.statusCode}`);
  return;
});

module.exports = mainRouter;
