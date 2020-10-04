'use strict';

const {check} = require(`express-validator`);

const newOfferFormFields = [
  check(`title`, `Name offers`).trim().notEmpty(),
  check(`description`)
    .trim()
    .notEmpty()
    .withMessage(`Enter ad description`)
    .bail()
    .isLength({min: 50})
    .withMessage(`Ad description must be at least 50 characters`),
  check(`category`, `Select at least one category for your ad`).exists().bail().isArray({min: 1}),
  check(`sum`)
    .trim()
    .notEmpty()
    .withMessage(`Added price`)
    .bail()
    .isNumeric()
    .withMessage(`The value in the price field must be a number`),
  check(`type`, `Select an ad type (buy/ sale)`).notEmpty()
];

const newCommentFormFields = [
  check(`text`, `Enter comment`)
    .trim()
    .notEmpty()
    .bail()
    .isLength({min: 30})
    .withMessage(`Ad comment must be at least 30 characters`)
];

module.exports = {newOfferFormFields, newCommentFormFields};
