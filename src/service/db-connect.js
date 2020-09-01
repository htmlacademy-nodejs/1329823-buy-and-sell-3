'use strict';

const Sequelize = require(`sequelize`);
const Operator = Sequelize.Op;
const {getLogger} = require(`./logger`);
const logger = getLogger();
const {ExitCode} = require(`../constants`);

require(`dotenv`).config();
const {types, users, categories, offers, comments, offersToCategories} = require(`../../db/fill-db`);

const sequelize = new Sequelize(
    `${process.env.DB_NAME}`,
    `${process.env.DB_USER}`,
    `${process.env.DB_PASSWORD}`,
    {
      host: `${process.env.DB_HOST}`,
      dialect: `${process.env.DB_DIALECT}`,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      logging: false
    }
);
const Offer = require(`../../db/models/offer`)(sequelize, Sequelize);
const OffersToCategory = require(`../../db/models/offer-to-category`)(sequelize, Sequelize);
const Category = require(`../../db/models/category`)(sequelize, Sequelize);
const Comment = require(`../../db/models/comment`)(sequelize, Sequelize);
const Type = require(`../../db/models/type`)(sequelize, Sequelize);
const User = require(`../../db/models/user`)(sequelize, Sequelize);

// Связь между таблицами types и offers
Offer.belongsTo(Type, {
  as: `types`,
  foreignKey: `typeId`,
});
// Связь между таблицами users и offers
User.hasMany(Offer, {
  as: `offers`,
  foreignKey: `userId`,
});
// Связь между таблицами users и comments
User.hasMany(Comment, {
  as: `comments`,
  foreignKey: `userId`,
});
// Связь между таблицами offers и comments
Offer.hasMany(Comment, {
  as: `comments`,
  foreignKey: `offerId`,
});
// Связь между таблицами offers и offersToCategories
Offer.hasMany(OffersToCategory, {
  as: `offersToCategories`,
  foreignKey: `offerId`,
});
// Связь между таблицами offers и offersToCategories
Category.hasMany(OffersToCategory, {
  as: `offersToCategories`,
  foreignKey: `categoryId`,
});

const initDB = async () => {
  await sequelize.sync({force: true});
  console.log(`Структура БД успешно создана`);
  await Type.bulkCreate(types);
  await User.bulkCreate(users);
  await Category.bulkCreate(categories);
  await Offer.bulkCreate(offers);
  await OffersToCategory.bulkCreate(offersToCategories);
  await Comment.bulkCreate(comments);
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

module.exports = {connectDB, initDB,
  db: {
    Offer,
    OffersToCategory,
    Category,
    Comment,
    Type,
    User,
  },
};
