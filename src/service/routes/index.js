'use strict';

const offersRouter = require(`./offers`);
const categoryRouter = require(`./categories`);
const searchRouter = require(`./search`);
const {Router} = require(`express`);
const initRoutes = new Router();

initRoutes.use(`/api/offers`, offersRouter);
initRoutes.use(`/api/categories`, categoryRouter);
initRoutes.use(`/api/search`, searchRouter);

module.exports = initRoutes;
