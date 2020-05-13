'use strict';

const nanoId = require(`nanoid`);

const getReandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (array) => {
  for (let index = array.length - 1; index > 0; index--) {
    const randomPos = Math.floor(Math.random() * index);
    [array[index], array[randomPos]] = [array[randomPos], array[index]];
  }
  return array;
};

const getNewId = () => {
  return nanoId(6);
};

const getUrlRequest = (req, path) => {
  return new URL(path, `http://localhost:3000`).href;
};

module.exports = {
  getReandomInt,
  shuffle,
  getNewId,
  getUrlRequest,
};
