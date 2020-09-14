'use strict';

const express = require(`express`);
const {getLogger} = require(`../logger`);
const expressPinoLogger = require(`express-pino-logger`);
const {HttpCode, API_PREFIX} = require(`../../constants`);
const {connectDB} = require(`../db-connect`);

const {getCategoryRouter, getOffersRouter, getSearchRouter} = require(`../routes`);
const {CategoryService, CommentService, SearchService, OfferService} = require(`../data-service`);

const getServer = async () => {
  const server = express();
  const logger = getLogger();
  await connectDB();

  server.disable(`x-powered-by`);
  server.use(expressPinoLogger({logger}));
  server.use(express.json());

  server.use((req, res, next) => {
    logger.debug(`Request for url ${req.url}`);
    next();
  });

  server.use(`${API_PREFIX}/categories`,
      getCategoryRouter(new CategoryService())
  );

  server.use(`${API_PREFIX}/search`,
      getSearchRouter(new SearchService())
  );

  server.use(`${API_PREFIX}/offers`,
      getOffersRouter(
          new OfferService(),
          new CommentService(),
          new CategoryService()
      )
  );

  server.use((req, res) => {
    const notFoundMessageText = `Not found`;
    logger.error(`End of request for ${req.url} with error: ${HttpCode.NOT_FOUND}.`);
    return res.status(HttpCode.NOT_FOUND)
    .json({
      error: true,
      status: HttpCode.NOT_FOUND,
      message: notFoundMessageText
    });
  });
  return server;
};

module.exports = {getServer};
