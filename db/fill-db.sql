-- Inserting user data
INSERT INTO users VALUES (default, 'Иванов', 'Иван', 'ii@mail.ru', 'qwe123', 'avatar1.jpg') RETURNING id;
INSERT INTO users VALUES (default, 'Тарасов', 'Тарас', 'tt@bk.ru', '123456', 'avatar2.jpg') RETURNING id;

--Inserting category data
INSERT INTO categories VALUES (default,'Книги') RETURNING id;
INSERT INTO categories VALUES (default,'Разное') RETURNING id;
INSERT INTO categories VALUES (default,'Посуда') RETURNING id;
INSERT INTO categories VALUES (default,'Игры') RETURNING id;
INSERT INTO categories VALUES (default,'Животные') RETURNING id;

--Inserting types data
INSERT INTO types VALUES (default, 'offer') RETURNING id;
INSERT INTO types VALUES (default, 'sale') RETURNING id;

--Inserting offers data
INSERT INTO offers VALUES (default, 1, 'Продам чёрную вазу', 'Продаю в связи с переездом. Отрываю от сердца', 123.4, 1, '2020-05-06', 'item01.jpg' ) RETURNING id;
INSERT INTO offers VALUES (default, 1, 'Продам старую приставку Sony Playstation 5', 'Даю недельную гарантию. Не пытайтесь торговаться. Цену вещам я знаю.', 12345, 1, '2019-12-31', 'item02.jpg' ) RETURNING id;
INSERT INTO offers VALUES (default, 1, 'Отдам утку и утят в добрые руки', 'У утки были пушистые утята. Продаю с болью в сердце', 13.5, 2,'2020-07-20', 'item03.jpg' ) RETURNING id;
INSERT INTO offers VALUES (default, 1, 'Продам ВАЗ-2107 синего цвета, игрушечный', 'Если товар не понравится — верну всё до последней копейки.', 16789.9, 2, '2020-03-23', 'item04.jpg' ) RETURNING id;
INSERT INTO offers VALUES (default, 2, 'Куплю воду в однолитровой бутылке', 'В Волгу впадают Ока и Кама.  Даю недельную гарантию. Если товар не понравится — верну всё до последней копейки.', 3, 2, '2020-07-20', 'item05.jpg' ) RETURNING id;
INSERT INTO offers VALUES (default, 2, 'Куплю детские санки', 'Дедушка Ваня идёт на рыбалку.  Кажется, что это хрупкая вещь. Таких предложений больше нет! Бонусом отдам все аксессуары.', 1000, 2, '2020-07-20', 'item06.jpg' ) RETURNING id;
INSERT INTO offers VALUES (default, 2, 'Куплю удочку', 'Таких предложений больше нет! Бонусом отдам все аксессуары.', 999, 2, '2020-06-30', 'item07.jpg' ) RETURNING id;
INSERT INTO offers VALUES (default, 2, 'Продам нож армейский', 'Даю недельную гарантию. Дедушка Ваня идёт на рыбалку.  Не пытайтесь торговаться. Цену вещам я знаю. Если найдёте дешевле — сброшу цену.', 9999, 1, '2020-06-23', 'item08.jpg' ) RETURNING id;

--Inserting comments data
INSERT INTO comments VALUES (default, 1, 2, 'Это окончательная цена?', '2020-07-02') RETURNING id;
INSERT INTO comments VALUES (default, 1, 1, 'Да, торга не будет', '2020-07-03') RETURNING id;
INSERT INTO comments VALUES (default, 1, 2, 'Спасибо', '2020-07-03') RETURNING id;
INSERT INTO comments VALUES (default, 2, 2, 'Очень понравился товар!', '2020-07-02') RETURNING id;
INSERT INTO comments VALUES (default, 3, 1, 'Заберите быстрее!!!', '2020-07-02') RETURNING id;
INSERT INTO comments VALUES (default, 4, 1, 'Предложение ещё в силе?', '2020-07-10') RETURNING id;
INSERT INTO comments VALUES (default, 5, 1, 'Купил на месяц вперёд. Спасибо продавцу', '2020-07-12') RETURNING id;
INSERT INTO comments VALUES (default, 6, 1, 'Санки пришлись по размеру, спасибо!', '2020-07-20') RETURNING id;
INSERT INTO comments VALUES (default, 7, 1, 'Звони по телефону 33-44-55 есть отличная удочка!', '2020-07-26') RETURNING id;
INSERT INTO comments VALUES (default, 8, 1, 'А сколько ножу лет? Какая сталь?', '2020-07-12') RETURNING id;
INSERT INTO comments VALUES (default, 8, 2, 'Нож 1960 года выпуска, сталь неизвестного производителя', '2020-07-14') RETURNING id;

--Inserting offers_categories data
INSERT INTO offers_categories VALUES (1,2);
INSERT INTO offers_categories VALUES (1,3);
INSERT INTO offers_categories VALUES (2,4);
INSERT INTO offers_categories VALUES (3,5);
INSERT INTO offers_categories VALUES (4,4);
INSERT INTO offers_categories VALUES (4,2);
INSERT INTO offers_categories VALUES (5,2);
INSERT INTO offers_categories VALUES (6,2);
INSERT INTO offers_categories VALUES (7,2);
INSERT INTO offers_categories VALUES (8,3);
INSERT INTO offers_categories VALUES (8,4);
