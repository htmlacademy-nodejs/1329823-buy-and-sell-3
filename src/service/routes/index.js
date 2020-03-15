'use strict';

const offersRouter = require(`./offers`);
const {Router} = require(`express`);
const initRoutes = new Router();

initRoutes.use(`/offers`, offersRouter);

module.exports = initRoutes;
