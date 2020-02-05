'use strict';

const fs = require(`fs`);
const { TITLES,
        CATEGORIES,
        SENTENCES, 
        OfferType, 
        SumRestrict, 
        PictureRestrict} = require(`./data`);

const getReandomInt = (min,max) => {
    min = Math.ceil(min);
    max = Math.ceil(max);
    return Math.floor(Math.random()*(max-min+1))+min;
};

const shuffle = (array) => {
    for (let index = array.length -1;index>0;index--){
        const randomPos = Math.floor(Math.random()*index);
        [array[index],array[randomPos]] = [array[randomPos], array[index]];
    }
    return array;
};
const getPicFileName = (number) => `item${number<10?`0${number}`:number}.jpg}`;
const generateOffers = (count) => (
    Array(count).fill({}).map( () => (
        {
            title: TITLES[getReandomInt(0,TITLES.length-1)],
            picture: getPicFileName(getReandomInt(PictureRestrict.min,PictureRestrict.max)),
            description: shuffle(SENTENCES).slice(1,5).join(` `),
            type: Object.keys(OfferType)[Math.floor(Math.random()*Object.keys(OfferType).length)],
            sum: getReandomInt(SumRestrict.min,SumRestrict.max),
            category: [CATEGORIES[getReandomInt(0,CATEGORIES.length-1)]],
        }))
);

const makeMock = (data) => { 
    const FILE_NAME = `mocks.json`;
    fs.writeFileSync(FILE_NAME,data,(err) =>{
        if (err){ 
            console.error(`Не удалось записать данные в файл`); 
        }
        console.log(`Файл записан!`); 
    });
};

module.exports = {getReandomInt, shuffle, getPicFileName, generateOffers,makeMock};
