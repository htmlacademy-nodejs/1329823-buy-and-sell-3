'use strict';

const types = [
  {typeName: `Куплю`},
  {typeName: `Продам`},
];

const users = [
  {firstName: `Иванов`, lastName: `Иван`, email: `ii@mail.ru`, password: `qwe123`, avatar: `avatar1.jpg`},
  {firstName: `Петров`, lastName: `Петр`, email: `petrov@mail.ru`, password: `000000`, avatar: `avatar2.jpg`},
  {firstName: `Тарасов`, lastName: `Тарас`, email: `tt@bk.ru`, password: `123456`, avatar: `avatar3.jpg`},
];

const categories = [
  {title: `Книги`},
  {title: `Разное`},
  {title: `Посуда`},
  {title: `Игры`},
  {title: `Животные`},
];

const offers = [
  {
    title: `Продам коллекцию журналов «Огонёк».`,
    description: `Не пытайтесь торговаться. Цену вещам я знаю. Равным образом курс на социально-ориентированный национальный проект способствует подготовке и реализации существующих финансовых и административных. С другой стороны начало повседневной работы по формированию позиции позволяет выполнить важнейшие задания по разработке. Таких предложений больше нет!`,
    sum: 386,
    picture: `item01.jpg`,
    typeId: 1,
    userId: 1,
  },
  {
    title: `Куплю удочку`,
    description: `Не пытайтесь торговаться. Цену вещам я знаю. Равным образом курс на социально-ориентированный национальный проект способствует подготовке и реализации существующих финансовых и административных. С другой стороны начало повседневной работы по формированию позиции позволяет выполнить важнейшие задания по разработке. Таких предложений больше нет!`,
    sum: 1936,
    picture: `item02.jpg`,
    typeId: 1,
    userId: 2,
  },
  {
    title: `Куплю детские санки.`,
    description: `Товар в отличном состоянии. Две страницы заляпаны свежим кофе.`,
    sum: 818,
    picture: `item03.jpg`,
    typeId: 2,
    userId: 3,
  },
];

const offersToCategories = [
  {offerId: 1, categoryId: 2},
  {offerId: 2, categoryId: 1},
  {offerId: 3, categoryId: 4},
  {offerId: 2, categoryId: 3},
];

const comments = [
  {offerId: 1, userId: 1, comment: `some comment1`},
  {offerId: 1, userId: 2, comment: `some comment2`},
  {offerId: 2, userId: 1, comment: `some comment3`},
  {offerId: 3, userId: 3, comment: `some comment4`},
];

module.exports = {
  types,
  users,
  categories,
  offers,
  offersToCategories,
  comments,
};
