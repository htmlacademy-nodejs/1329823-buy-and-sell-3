'use strict';

const offersRoutes = require(`./offers`);

const initRoutes = (app) => {
  app.use(`/offers`, offersRoutes);
};

module.exports = {initRoutes};
