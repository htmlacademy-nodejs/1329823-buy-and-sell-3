'use strict';

const express = require(`express`);
const app = express();

const offersRouter = require(`./offers`);
const categoryRouter = require(`./categories`);
const searchRouter = require(`./search`);
const {HttpCode} = require(`../../constants`);

const logger = require(`../logs/logger`);

app.use(express.json());

app.use((req, res, next) => {
  logger.debug(`Router request ${req.url}`);
  next();
});

app.use(`/api/offers`, offersRouter);
app.use(`/api/categories`, categoryRouter);
app.use(`/api/search`, searchRouter);
app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).send(`Not found page`);
  logger.error(`End request ${req.url} with error: ${res.statusCode}`);
});

module.exports = app;
