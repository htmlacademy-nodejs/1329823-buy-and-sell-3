'use strict';

const {Router} = require(`express`);
const router = new Router();

const mainRouter = require(`./main`);
const myRouter = require(`./my`);
const offersRouter = require(`./offers`);

router.use(`/`, mainRouter);
router.use(`/my`, myRouter);
router.use(`/offers`, offersRouter);

module.exports = router;
