'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {HttpCode} = require(`../../constants`);
const {Router} = require(`express`);
const offersRouter = new Router();

const {MOCK_FILE_NAME} = require(`../../constants`);
const getOffers = async () => JSON.parse((await fs.readFile(MOCK_FILE_NAME)).toString());

offersRouter.get(`/`, async (req, res) => {
  try {
    res.json(await getOffers());
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

offersRouter.get(`/:offerId`, async (req, res) => {
  try {
    const offer = (await getOffers()).find((el) => el.id === res.params.offerId);
    res.json(offer);
  } catch {
    if (!offer) {
      res.status(HttpCode.BED_REQUEST).send(`BED_REQUEST`);
      console.log(chalk.red(`bed request`));
      return;
  }}
});

offersRouter.post(`/`, async(req, res) => {
  const newOffer = [
    `id`,
    `type`,
    `title`,
    `description`,
    `sum`,
    `picture`,
    `category`,
    `comments`,
  ];

  for (const key of newOffer) {
    if (!req.body[key]) {
      res.status(HttpCode.BED_REQUEST).send(`BED_REQUEST`);
    }
  }
  res.json({response: `Created new offer`, data: req.body});
});

offersRouter.delete(`/:offers/:offerId`, async(req, res) => {
  try {
    const offer = (await getOffers().find((el) => el.id === req.params.offerId));
    res.json({response: `Delete offer by id: ${offer.id}`});
  } catch {
    if (!offer) {
      res.status(HttpCode.NO_CONTENT).send(`NO_CONTENT`);
      console.log(chalk.red(`Creative not found or has been removed before`));
    }
  }
});

offersRouter.get(`/:offerId/comments`, async(req, res) => {
  try {
    const offer = (await getOffers()).find((el) => el.id === req.params.offerId);
    res.json(offer.comments);
  } catch {
      if (!offer) {
        res.status(HttpCode.BED_REQUEST).send(`BED_REQUEST`);
      }
  }
});

offersRouter.delete(`/:offerId/comments/:commentId`, async(req, res) => {
  try {
    const {offerId, commentId} = req.params;
    const offer = (await getOffers()).find((el) => el.id === req.params.offerId);
    const comment = offer.comments.find((el) => el.id === commentId);
    res.json({response: `Delete comment ${comment.id}!`});
  } catch {
      if ((!offer) || (!comment)) {
        res.status(HttpCode.BED_REQUEST).send(`BED_REQUEST`);
        console.log(chalk.red(`Bed request`));
      }
  }
});

offersRouter.put(`/:offerId/comment`, async(req, res) => {
    const {id, text} = req.body;
    if (!id || (!text && text.length<20)) {
      res.status(HttpCode.BED_REQUEST).send(`BED_REQUEST`);
      console.log(chalk.red(`Bed request`));
    }
    res.json({response: `Created comment`, data: req.body});
});

module.exports = offersRouter;
