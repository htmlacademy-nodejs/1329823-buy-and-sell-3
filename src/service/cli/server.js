'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const initRoutes = require(`../routes/index`);

const DEFAULT_PORT = 3000;
const app = express();

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app.use(initRoutes);
    app.use((err, req, res, _) => {
      res
        .status(500)
        .send(`Ошибка при создании сервера`);
    });
    return app.listen(port,
        () => console.log(chalk.green(`Server srarted on port ${port}`)));
  },
};
