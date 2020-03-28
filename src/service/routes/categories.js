'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const FILE_CATEGORIES_PATH = `data/categories.txt`;
const {Router} = require(`express`);
const categoryRouter = new Router();

const readMocks = async () => {
  try {
    const file = await fs.readFile(FILE_CATEGORIES_PATH, `utf8`);
    const mocks = file.split(`\n`);
    return mocks;
  } catch (err) {
    return [];
  }
};

categoryRouter.get(`/`, async (req, res) => {
  const categories = await readMocks();
  return res.send(categories);
});

module.exports = categoryRouter;
