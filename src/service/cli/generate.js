'use strict'; 

const {ExitCode} = require(`../../constants`); 
const fs = require(`fs`);
const chalk = require(`chalk`);
const {generateOffers, makeMock} = require(`../cli/utils`); 
const DEFAULT_COUNT = 1; 
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;

module.exports = { 
    name: `--generate`, 
    run(userIndex) { 
        const [count] = userIndex; 
        if (count > MAX_COUNT) { 
            console.error(chalk.red(`Не больше ${MAX_COUNT} объявлений`)); 
            process.exit(ExitCode.error); 
        } 
        const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT; 
        const content = JSON.stringify(generateOffers(countOffer));
        fs.writeFileSync(FILE_NAME,content,(err) =>{
            if (err){ 
                console.error(chalk.red(`Не удалось записать данные в файл`)); 
                process.exit(ExitCode.error);
            }
            console.info(chalk.green(`Файл записан!`)); 
            process.exit(ExitCode.success);
        });
    } 
};
