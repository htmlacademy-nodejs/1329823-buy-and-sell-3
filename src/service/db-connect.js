'use strict';

const Sequelize = require(`sequelize`);
const {getLogger} = require(`./logger`);
const logger = getLogger();
const {ExitCode} = require(`../constants`);

require(`dotenv`).config();

const sequelize = new Sequelize(
    `${process.env.DB_NAME}`,
    `${process.env.DB_USER}`,
    `${process.env.DB_PASSWORD}`,
    {
      host: `${process.env.DB_HOST}`,
      dialect: `${process.env.DB_DIALECT}`,
    }
);
const OfferModel = require(`../../db/models/offer`);
const CategoryModel = require(`../../db/models/category`);
const CommentModel = require(`../../db/models/comment`);
const UserModel = require(`../../db/models/user`);

const models = {
  Offer: OfferModel.init(sequelize, Sequelize),
  Category: CategoryModel.init(sequelize, Sequelize),
  Comment: CommentModel.init(sequelize, Sequelize),
  User: UserModel.init(sequelize, Sequelize)
};

Object.values(models)
  .forEach((model) => model.associate(models));

const initDB = async () => {
  await sequelize.sync({force: true});
  console.log(`Структура БД успешно создана`);
};

const connectDB = async () => {
  try {
    logger.debug(`Connecting to DB...`);
    await sequelize.authenticate();
    logger.info(`Connection success`);
  } catch (err) {
    console.error(`Connection failed with error: ${err}`);
    logger.error(`Connection failed with error: ${err}`);
    process.exit(ExitCode.error);
  }
};

module.exports = {connectDB, initDB, sequelize};
