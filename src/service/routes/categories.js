'use strict';

const {Router} = require(`express`);
const categoryRouter = new Router();
const {HttpCode} = require(`../../constants`);
const logger = require(`../logger`).getLogger();

const getCategoryRouter = (categoryService) => {
  categoryRouter.get(`/`, (req, res) => {
    const categories = categoryService.findAll();
    res.status(HttpCode.OK).json(categories);
    logger.info(`Status code ${res.statusCode}`);
    return;
  });
  return categoryRouter;
};

module.exports = {getCategoryRouter};
