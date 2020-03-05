'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const router = require(`./routes/index`);

const DEFAULT_PORT = 8080;
const app = express();

module.exports = {
  name: `--router`,
  run() {
    app.use(router);
    app.listen(DEFAULT_PORT,
        () => console.log(chalk.green(`Server of start: ${DEFAULT_PORT}`)));
  },
};
