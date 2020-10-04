'use strict';

const {Router} = require(`express`);
const {validationResult} = require(`express-validator`);
const {newOfferFormFields, newCommentFormFields} = require(`../form-validator`);
const {fileUploader} = require(`../file-upload`);
const moment = require(`moment`);

const MAX_PICTURE_SIZE = 15 * 1024 * 1024;
const SIZE_MEGABITE = 1048576;
const upload = fileUploader.single(`picture`);
const getTodayDate = () => moment.utc().format();

const getOffersRouter = (service) => {
  const offersRouter = new Router();

  offersRouter.get(`/category/:id`, async (req, res, next) => {
    try {
      const categoryId = req.params.id;
      const {offers, category} = await service.getOffersByCategoryId(categoryId);
      return res.render(`main/category`, {offers, category});
    } catch (err) {
      return next(err);
    }
  });

  offersRouter.get(`/add`, async (req, res, next) => {
    try {
      const categories = await service.getAllCategories();
      return res.render(`ticket/new-ticket`, {categories});
    } catch (err) {
      return next(err);
    }
  });

  offersRouter.post(`/add`, upload, ...newOfferFormFields, async (req, res, next) => {
    try {
      const errorFormat = ({msg}) => ({msg});
      const errors = validationResult(req).formatWith(errorFormat).array();
      const file = req.file;
      let formFieldsData = req.body;
      if (!file || file.size > SIZE_MEGABITE) {
        errors.push({
          msg: `File not selected, invalid format (only jpg/jpeg/png), large file size (max: ${MAX_PICTURE_SIZE / SIZE_MEGABITE} Mb)`
        });
      } else {
        formFieldsData = {
          ...formFieldsData,
          picture: file.filename,
          userId: 1,
          date: getTodayDate()
        };
      }
      if (Object.keys(errors).length) {
        const categories = await service.getAllCategories();
        return res.render(`ticket/new-ticket`, {errors, categories, formFieldsData});
      }
      await service.createNewOffer(formFieldsData);
      return res.redirect(`/my`);
    } catch (err) {
      return next(err);
    }
  });

  offersRouter.get(`/edit/:id`, async (req, res, next) => {
    try {
      const offerId = req.params.id;
      const offer = await service.getOfferById(offerId);
      const categories = await service.getAllCategories();
      return res.render(`ticket/ticket-edit`, {offer, categories});
    } catch (err) {
      return next(err);
    }
  });

  offersRouter.post(`/edit/:id`, upload, ...newOfferFormFields, async (req, res, next) => {
    try {
      const errorFormatter = ({msg}) => ({msg});
      const errors = validationResult(req).formatWith(errorFormatter).array();
      const file = req.file;
      const offerId = req.params.id;
      let offer = req.body;
      if (!file || file.size > MAX_PICTURE_SIZE) {
        errors.push({
          msg: `File not selected, invalid format (only jpg/jpeg/png), large file size (max: ${MAX_PICTURE_SIZE / SIZE_MEGABITE} Mb)`
        });
      } else {
        offer = {
          ...offer,
          picture: file.filename
        };
      }
      if (Object.keys(errors).length) {
        const categories = await service.getAllCategories();
        return res.render(`ticket/ticket-edit`, {
          errors,
          categories,
          offer: {
            ...offer,
            id: offerId,
            categories: offer.categories ?
              categories.filter((category) => offer.categories.includes(String(category.id)))
              :
              []
          }
        });
      }
      await service.updateOffer(offerId, offer);
      return res.redirect(`/my`);
    } catch (err) {
      return next(err);
    }
  });

  offersRouter.get(`/:id`, async (req, res, next) => {
    try {
      const offerId = req.params.id;
      const offer = await service.getOfferById(offerId);
      return res.render(`ticket/ticket`, {offer, moment});
    } catch (err) {
      return next(err);
    }
  });

  offersRouter.post(`/:offerId/comments`, ...newCommentFormFields, async (req, res, next) => {
    try {
      let commentData = {...req.body};
      const {offerId} = req.params;
      const errorFormat = ({msg}) => ({msg});
      const errors = validationResult(req).formatWith(errorFormat).array();
      if (Object.keys(errors).length) {
        const offer = await service.getOfferById(offerId);
        return res.render(`ticket/ticket`, {
          errors,
          offer,
          moment
        });
      }
      commentData = {
        ...commentData,
        offerId: Number(offerId),
        userId: 2,
        date: getTodayDate()
      };
      await service.createComment(commentData);
      return res.redirect(`/offers/${offerId}`);
    } catch (err) {
      return next(err);
    }
  });

  return offersRouter;
};

module.exports = {getOffersRouter};
