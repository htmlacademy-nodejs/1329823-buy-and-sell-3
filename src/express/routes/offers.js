'use strict';

const {Router} = require(`express`);
const {validationResult} = require(`express-validator`);
const {newOfferFormFields} = require(`../form-validator`);
const {fileUploader} = require(`../file-upload`);

const MAX_PICTURE_SIZE = 15 * 1024 * 1024;
const SIZE_MEGABITE = 1048576;
const upload = fileUploader.single(`picture`);

const getOffersRouter = (service) => {
  const offersRouter = new Router();

  offersRouter.get(`/category/:id`, (req, res) => res.render(`main/category`));

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
          msg: `File not selected, invalid format (only jpg/jpeg/png),
          large file size (max: ${MAX_PICTURE_SIZE / SIZE_MEGABITE} Mb)`
        });
      } else {
        formFieldsData = {
          ...formFieldsData,
          picture: {
            background: `01`,
            image: file.filename,
            image2x: file.filename
          }
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

  offersRouter.get(`/:id`, (req, res) => res.render(`ticket/ticket`));
  return offersRouter;

};

module.exports = {getOffersRouter};
