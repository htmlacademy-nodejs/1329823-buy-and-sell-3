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
  const offer = (await getOffers()).find((it) => it.id === req.params.offerId);
  if (!offer) {
    res.status(HttpCode.BED_REQUEST).send(`BED_REQUEST`);
    console.log(chalk.red(`bed request`));
    return;
  }
  res.json(offer);
});

offersRouter.post(`/`, async (req, res) => {
  const offerKeys = [
    `id`,
    `type`,
    `title`,
    `description`,
    `sum`,
    `picture`,
    `category`,
    `comments`
  ];
  for (const key of offerKeys) {
    if (!req.body [key]) {
      res.status(HttpCode.BED_REQUEST).send(`BED_REQUEST`);
    }
  }
  res.json({response: `New offer!`, data: req.body});
});

offersRouter.delete(`/:offers/:offerId`, async (req, res) => {
  const offer = (await getOffers()).find((el) => el.id === req.params.offerId);
  if (!offer) {
    res.status(HttpCode.NO_CONTENT).send(`NO_CONTENT`);
    console.log(chalk.red(`Creative not found or has been removed before`));
  }
  res.json({response: `Delete offer by id: ${offer.id}`});
});

offersRouter.get(`/:offerId/comments`, async (req, res) => {
  const offer = (await getOffers()).find((el) => el.id === req.params.offerId);
  if (!offer) {
    res.status(HttpCode.BED_REQUEST).send(`BED_REQUEST`);
  }
  res.json(offer.comments);
});

offersRouter.delete(`/:offerId/comments/:commentId`, async (req, res) => {
  const {offerId, commentId} = req.params;
  const offer = (await getOffers()).find((el) => el.id === offerId);
  const comment = offer.comments.find((el) => el.id === commentId);
  if ((!offer) || (!comment)) {
    res.status(HttpCode.BED_REQUEST).send(`BED_REQUEST`);
    console.log(chalk.red(`Bed request`));
  }
  res.json({response: `Delete comment ${comment.id}!`});
});

offersRouter.put(`/:offerId/comments`, async (req, res) => {
  const {id, text} = req.body;
  if (!id || !text) {
    res.status(HttpCode.BED_REQUEST).send(`BED_REQUEST`);
    console.log(chalk.red(`Bed request`));
  }
  res.json({response: `Create comment!`, data: req.body});
});

module.exports = offersRouter;
