'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const myRouter = require(`./routes/my`);
const offersRouter = require(`./routes/offers`);


const DEFAULT_PORT = 8080;
const app = express();

app.use(`/my`, myRouter);
app.use(`/offers`, offersRouter);
app.get(`/`, (req, res) => res.send(`/`));
app.get(`/register`, (req, res) => res.send(`/register`));
app.get(`/login`, (req, res) => res.send(`/login`));
app.get(`search`, (req, res) => res.send(`/search`));

app.listen(DEFAULT_PORT,
    () => console.log(chalk.green(`Server of start: ${DEFAULT_PORT}`)));
