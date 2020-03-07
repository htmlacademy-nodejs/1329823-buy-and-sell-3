'use strict';

const chalk = require(`chalk`);

module.exports = {
  name: `--help`,
  run() {
    const text = `
    Программа запускает http-сервер и формирует файл с данными для api.
    Гайд:
    server <command>
        Команды:
        --version:            выводит номер версии
        --help:               печатает этот текст
        --generate <count>    формирует файл mocks.json
        --server <port>       запускает сервер по заданному порту
        --router              запускает сервер с маршрутизацией по порту 8080`;

    console.log(chalk.gray(text));
  }
};
