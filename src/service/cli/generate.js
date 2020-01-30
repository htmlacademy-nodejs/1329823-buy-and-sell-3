;
'use strict';

    const fs = require (`fs`);
    const DEFAULT_CONST = 1;
    const FILE_NAME = `mocks.json`;

    const TITLES = [
        `Продам книги Стивена Кинга.`,
        `Продам новую приставку Sony Playstation 5.`,
        `Продам отличную подборку фильмов на VHS.`,
        `Куплю антиквариат.`,
        `Куплю породистого кота.`,
        `Продам коллекцию журналов «Огонёк».`,
        `Отдам в хорошие руки подшивку «Мурзилка».`,
        `Продам советскую посуду. Почти не разбита.`,
        `Куплю детские санки.`,
    ];
        const SENTENCES = [
            `Товар в отличном состоянии.`,
            `Пользовались бережно и только по большим праздникам.,`,
            `Продаю с болью в сердце...`,
            `Бонусом отдам все аксессуары.`,
            `Даю недельную гарантию.`,
            `Если товар не понравится — верну всё до последней копейки.`,
            `Это настоящая находка для коллекционера!`,
            `Если найдёте дешевле — сброшу цену.`,
            `Таких предложений больше нет!`,
            `Две страницы заляпаны свежим кофе.`,
            `При покупке с меня бесплатная доставка в черте города.`,
            `Кажется, что это хрупкая вещь.`,
            `Мой дед не мог её сломать.`,
            `Кому нужен этот новый телефон, если тут такое...`,
            `Не пытайтесь торговаться. Цену вещам я знаю.`,
        ];
        const CATEGORIES = [
            `Книги`,
            `Разное`,
            `Посуда`,
            `Игры`,
            `Животные`,
            `Журналы`,
        ];
        const OfferType = {
            offer: `offer`,
            sale: `sale`,
        };
        const SumRestrict = {
            min: 1000,
            max: 100000,
        };
        const PictureRestrict = {min:0, max: 16,}
        const getPictureFileName = (number)=>number>10?`item${namber}`:`item0${namber}`;
        const {getRandomInt, shuffle,} = require(`../utils.js`);
        const generateOffers = (count) => {
            Array(count).fill({}).map(() =>({
                type: Object.keys(OfferType)[Math.floor(Math.random()*Object.keys(OfferType).length)],
                title: TITLES[getRandomInt(0,TITLES.length -1)],
                description: shuffle(SENTENCES).slice(1,5).json(` `),
                sum: getRandomInt(SumRestrict.min,SumRestrict.max),
                picture: getPictureFileName(getRandomInt(PictureRestrict.min,PictureRestrict.max)),
                category: [CATEGORIES[getRandomInt(0,CATEGORIES.length-1)]],               
                
            } ) )
        };     
module.exports = {
    name: `--generate`,
    run(count) {
        const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
        const content = JSON.stringify(generateOffers(countOffer));
        fs.writeFile(FILE_NAME, content, (err) => {
        if (err) {
            return console.error(`Can't write data to file...`);
        }
        return console.log(`Operation success. File created.`);
        });
    }
};