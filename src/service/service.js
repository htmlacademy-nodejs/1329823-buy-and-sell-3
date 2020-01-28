;
'use strict';

const {Cli} = require(`./cli`);
const {
    DEFAULT_COMMAND,
    USER_ARGV_INDEX,
    ExitCode
} = require(`../constants`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand,userItemCount] = userArguments;

if (userArguments.length ===0 || !Cli[userCommand]){
    Cli[DEFAULT_COMMAND].run();
    process.exit(ExitCode.success);
}
if (userItemCount>1000){
    console.info(`Не больше 1000 объявлений`);
    process.exit(ExitCode.error);
}
Cli[userCommand].run(userItemCount);