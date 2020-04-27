'use strict';

const express = require(`express`).Router;
const router = require(`./routes/index`);
const {HttpCode} = require(`../constants`);
const path = require(`path`);
const logger = require(`../service/logger`).getLogger();

const DEFAULT_PORT = 8080;
const app = express();

app.use(express.static(`markup`));
app.set(`views`, path.join(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(express.json());
app.use((req, res, next) => {
  logger.debug(`Router request: ${req.url}`);
  next();
});
app.use(router);
app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).send(`Not found page`);
  logger.error(`End request ${req.url} with error: ${res.statusCode}`);
});

app.listen(DEFAULT_PORT, () => {
  logger.info(`Run server on port ${DEFAULT_PORT}`);
}).on(`error`, (err) => {
  logger.error(`Server can't start. Error: ${err}`);
});
