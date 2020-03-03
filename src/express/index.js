'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const mainRouter = require(`./routes/main`);
const myRouter = require(`./routes/my`);
const offersRouter = require(`./routes/offers`);

const DEFAULT_PORT = 8080;

module.exports = {
  name: `--router`,
  run() {
    const app = express();
    app.use(`/my`, myRouter);
    app.use(`/offers`, offersRouter);
    app.use(`/`, mainRouter);
    app.listen(DEFAULT_PORT,
        () => console.log(chalk.green(`Server of start: ${DEFAULT_PORT}`)));
  },
};
