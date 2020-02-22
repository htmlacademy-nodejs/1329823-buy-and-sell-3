'use strict';

const { ExitCode } = require(`../../constants`);
const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const { getReandomInt, shuffle } = require(`../cli/utils`);
const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;
const FILE_SENTENCES_PATH = `../../data/sentences.txt`;
const FILE_TITLES_PATH = `../../data/titles.txt`;
const FILE_CATEGORIES_PATH = `../../data/categories.txt`;

const getOfferType = {
    Offer: `offer`,
    Sale: `sale`,
};

const getSumRestrict = {
    Min: 1000,
    Max: 100000,
};

const getPictureRestrict = {
    Min: 0,
    Max: 16,
};

const getPicFileName = (number) => `item${number < 10 ? `0${number}` : number}.jpg}`;

const generateOffers = (count, titles, categories, sentences) => (
    Array(count).fill({}).map(() => (
        {
            title: titles[getReandomInt(0, titles.length - 1)],
            picture: getPicFileName(getReandomInt(getPictureRestrict.Min, getPictureRestrict.Max)),
            description: shuffle(sentences).slice(1, 5).join(` `),
            type: Object.keys(getOfferType)[Math.floor(Math.random() * Object.keys(getOfferType).length)],
            sum: getReandomInt(getSumRestrict.Min, getSumRestrict.Max),
            category: [categories[getReandomInt(0, categories.length - 1)]],
        }))
);

const readContent = async (filePath) => {
    try {
        const content = await fs.readFile(filePath, `utf8`);
        return content.split(`\n`);
    }
    catch (err) {
        console.error(chalk.red(err));
        return [];
    }
};

module.exports = {
    name: `--generate`,
    async run(userIndex) {
        const sentences = await readContent(FILE_SENTENCES_PATH);
        const titles = await readContent(FILE_TITLES_PATH);
        const categories = await readContent(FILE_CATEGORIES_PATH);

        Promise.all([sentences, titles, categories]);

        const [count] = userIndex;

        if (count > MAX_COUNT) {
            console.error(chalk.red(`Не больше ${MAX_COUNT} объявлений`));
            process.exit(ExitCode.error);
        }

        const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
        const content = JSON.stringify(generateOffers(countOffer, titles, categories, sentences));

        try {
            await fs.writeFile(FILE_NAME, content);
            console.log(chalk.green(`File recorded!`));
            process.exit(ExitCode.success);
        }
        catch {
            console.error(chalk.red(`Error writing file`));
            process.exit(ExitCode.error);
        }
    }
};
