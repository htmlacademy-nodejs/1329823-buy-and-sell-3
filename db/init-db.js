'use strict';

const {sequelize, initDB} = require(`../src/service/db-connect`);
(async () => {
  await initDB();
  await sequelize.close();
})();
