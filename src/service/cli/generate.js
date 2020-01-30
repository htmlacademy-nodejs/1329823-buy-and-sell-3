'use strict'; 

    const {ExitCode} = require(`../../constants`); 
    const {generateOffers, makeMock} = require(`../cli/utils`); 
    const DEFAULT_COUNT = 1; 
    const MAX_COUNT = 1000; 
    const FILE_NAME = `mocks.json`; 
    
    module.exports = { 
        name: `--generate`, 
        run(userIndex) { 
        const [count] = userIndex; 
            if (count > MAX_COUNT) { 
                console.error(`Не больше ${MAX_COUNT} объявлений`); 
                process.exit(ExitCode.fail); 
            } 
        const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT; 
        const content = JSON.stringify(generateOffers(countOffer)); 
        makeMock(FILE_NAME, content); 
        process.exit(ExitCode.success); 
        } 
    };