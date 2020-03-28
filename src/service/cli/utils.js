'use strict';

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

const deleteItem = (array, id) =>{
  const idItem = array.map((el) => el.id).indexOf(id);
  if (idItem === -1) {
    return idItem;
  }
  const beforIdIndex = array.slice(0, idItem);
  const afterIdIndex = array.slice(idItem + 1);
  return [...beforIdIndex, ...afterIdIndex];
};

module.exports = {
  getReandomInt,
  shuffle,
  deleteItem,
};
