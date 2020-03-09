'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const router = require(`./routes/index`);
const path = require(`path`);

const DEFAULT_PORT = 8080;
const app = express();

app.use(express.static(`markup`));
app.set(`views`, path.join(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(router);
app.listen(DEFAULT_PORT,
    () => console.log(chalk.green(`Server of start: ${DEFAULT_PORT}`)));
