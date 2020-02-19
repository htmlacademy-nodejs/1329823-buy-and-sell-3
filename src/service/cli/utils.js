'use strict';

module.exports.getReandomInt = (min,max) => {
    min = Math.ceil(min);
    max = Math.ceil(max);
    return Math.floor(Math.random()*(max-min+1))+min;
};

module.exports.shuffle = (array) => {
    for (let index = array.length -1;index>0;index--){
        const randomPos = Math.floor(Math.random()*index);
        [array[index],array[randomPos]] = [array[randomPos], array[index]];
    }
    return array;
};
