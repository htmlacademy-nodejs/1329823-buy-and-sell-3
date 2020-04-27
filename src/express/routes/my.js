'use strict';

const {Router} = require(`express`);
const myRouter = new Router();
const logger = require(`../../service/logger`);
const axios = require(`axios`);
const {getUrlRequest} = require(`../../service/cli/utils`);

myRouter.get(`/my`, async (req, res) => {
  let offers = [];
  try {
    offers = (await axios.get(getUrlRequest(req, `/api/offers`))).data;
  } catch (err) {
    logger.error(`Error getting list offers`);
  }
  res.render(`my-tickets`, {offers});
  logger.info(`Status code ${res.statusCode}`);
  return;
});

myRouter.get(`/my/comments`, async (req, res) => {
  let offers = [];
  try {
    offers = (await axios.get(getUrlRequest(req, `/api/offers`))).data.splice(0, 3);
  } catch (err) {
    logger.error(`Error getting list offers`);
  }
  res.render(`comments`, {offers});
  logger.info(`Status code ${res.statusCode}`);
  return;
});

module.exports = myRouter;
