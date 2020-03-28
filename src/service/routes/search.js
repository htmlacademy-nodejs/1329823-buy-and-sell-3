'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {MOCK_FILE_NAME} = require(`../../constants`);
const {Router} = require(`express`);
const searchRouter = new Router();

searchRouter.get(`/`, async (req, res) =>{
  try {
    const fileContent = await fs.readFile(MOCK_FILE_NAME);
    const result = JSON.parse(fileContent)
      .filter((el) => el.title.includes(req.query.query)) || `No search results`;
    res.json(result);
  } catch (err) {
    res.json(`No search results`);
    console.error(chalk.red(`No content, ${err}`));
  }
});

module.exports = searchRouter;
