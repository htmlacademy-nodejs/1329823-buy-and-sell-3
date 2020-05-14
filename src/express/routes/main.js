'use strict';

const {Router} = require(`express`);
const mainRouter = new Router();
const {logger} = require(`../../service/logger`);
const axios = require(`axios`);
const {getUrlRequest} = require(`../../utils`);
const {HttpCode} = require(`../../constants`);

mainRouter.get(`/`, async (req, res) => {
  let offers = [];
  try {
    offers = (await axios.get(getUrlRequest(req, `/api/offers`))).data;
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(`INTERNAL_SERVER_ERROR`);
    logger.error(`Error getting list offers, ${res.statusCode}`);
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
    offers = (await axios.get(getUrlRequest(req, `/api/search/?query=${encodeURIComponent(req.query.search)}`))).data;
  } catch (err) {
    res.render(`main/search-result-empty`, {offers});
    logger.error(`Error getting list offers ${err}`);
  }
  res.render(`main/search-result`, {offers});
  logger.info(`Status code ${res.statusCode}`);
  return;
});

module.exports = mainRouter;
