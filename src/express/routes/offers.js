'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();
const logger = require(`../../service/logger`).getLogger();
const {getUrlRequest} = require(`../../service/cli/utils`);
const path = require(`path`);
const axios = require(`axios`);

const multer = require(`multer`);
const multerStrorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, `../../tmp`));
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

offersRouter.get(`/add`, async (req, res) => {
  let categories = [];
  try {
    categories = (await axios.get(getUrlRequest(req, `../../service/routes/categories`))).data;
  } catch (err) {
    logger.error(`Error getting categories`);
    return;
  }
  res.render(`ticket/new-ticket`, {categories, offer: {}});
  logger.info(`Status code ${res.statusCode}`);
  return;
});

offersRouter.post(`/add`, multer({storage: multerStrorage}).single(`avatar`), async (req, res) => {
  const {body} = req;
  try {
    const offer = {
      title: body [`ticket-name`],
      destination: body.comment,
      category: body.category,
      sum: body.price,
      type: body.action,
    };
    await axios.post(getUrlRequest(req, `../../service/routes/offers`), JSON.stringify(offer), {
      headers: {
        'Content-Type': `application/json`
      }
    });
    res.redirect(`/my`);
    logger.info(`Status code ${res.statusCode}`);
    return;
  } catch (err) {
    logger.error(`Error creating new offer`);
  }
  res.render(`ticket/new-ticket`, {
    offer: {
      title: body[`ticket-name`] || ``,
      description: body.comment || ``,
      category: body.category || ``,
      sum: body.price || ``,
      type: body.action || ``,
    },
  });
  logger.info(`Status code ${res.statusCode}`);
  return;
});

offersRouter.get(`/:id`, (req, res) => {
  res.render(`ticket/ticket`);
  logger.info(`Status code ${res.statusCode}`);
  return;
});

offersRouter.get(`/edit/:id`, async (req, res) => {
  let offer = {};
  let categories = [];
  try {
    offer = (await axios.get(getUrlRequest(req, `../../service/routes/offers/${req.params.id}`))).data;
  } catch (err) {
    logger.error(`Error getting offers`);
  }
  try {
    categories = (await axios.get(getUrlRequest(req, `../../service/routes/categories`))).data;
  } catch (err) {
    logger.error(`Error getting list categories`);
  }
  res.render(`ticket/ticket-edit`, {offer, categories});
  logger.info(`Status code ${res.statusCode}`);
  return;
});

module.exports = offersRouter;
