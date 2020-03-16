'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {HttpCode} = require(`../../constants`);
const {Router} = require(`express`);
const offersRouter = new Router();

const {MOCK_FILE_NAME} = require(`../../constants`);

offersRouter.get(`/`, async (req, res) => {
  try {
    const content = await fs.readFile(MOCK_FILE_NAME);
    res.json(JSON.parse(content));
  } catch (err) {
    if (err.code === `ENOENT`) {
      res.status(HttpCode.NOT_FOUND).send([]);
      console.log(chalk.red(`Not found file`));
      return;
    }
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(`Server error`);
    console.error(chalk.red(err));
  }
});

module.exports = offersRouter;
