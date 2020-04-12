'use strict';

const fs = require(`fs`).promises;
const FILE_CATEGORIES_PATH = `data/categories.txt`;
const {Router} = require(`express`);
const categoryRouter = new Router();

const readMocks = async (path) => (await fs.readFile(path)).toString().trim().split(`\n`);

categoryRouter.get(`/`, async (req, res) => {
  res.json(await readMocks(FILE_CATEGORIES_PATH));
});

module.exports = categoryRouter;
