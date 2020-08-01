--Получить список всех категорий (идентификатор, наименование категории);
SELECT id, title
FROM categories

--Получить список категорий для которых создано минимум одно объявление 
--(идентификатор, наименование категории);
SELECT categories.id, categories.title
FROM categories INNER JOIN offers_categories ON categories.id=offers_categories.category_id
GROUP BY categories.id, categories.title

--Получить список категорий с количеством объявлений 
--(идентификатор, наименование категории, количество объявлений в категории);
SELECT categories.id, categories.title, COUNT(offers_categories.offer_id) AS "Kol_vo_offers"
FROM categories INNER JOIN offers_categories ON categories.id=offers_categories.category_id
GROUP BY categories.id, categories.title

-- Получить список объявлений 
--(идентификатор объявления, заголовок объявления, стоимость, тип объявления, текст объявления, дата публикации, 
--имя и фамилия автора, контактный email, количество комментариев, наименование категорий). 
--Сначала свежие объявления;
SELECT offers.id, offers.title, offers.sum, types.type_name, offers.description, offers.date,
	CONCAT(users.lastname,' ',users.firstname) AS "FI_users", users.email, COUNT(DISTINCT comments.offer_id) AS "Kol_vo_comments", 
	string_agg(DISTINCT	categories.title, ',') AS "Name_category"
FROM offers INNER JOIN users ON offers.user_id=users.id 
	INNER JOIN offers_categories ON offers_categories.offer_id=offers.id
	INNER JOIN types ON types.id=offers.type_id
	LEFT JOIN categories ON categories.id=offers_categories.category_id
	INNER JOIN comments ON comments.offer_id=offers.id
GROUP BY offers.id, offers.title, offers.sum, types.type_name, offers.description, offers.date,
	CONCAT(users.lastname,' ',users.firstname), users.email
ORDER BY offers.date DESC;

--Получить полную информацию определённого объявления 
--(идентификатор объявления, заголовок объявления, стоимость, тип объявления, 
--текст объявления, дата публикации, имя и фамилия автора, контактный email, 
--количество комментариев, наименование категорий);
SELECT offers.id, offers.title, offers.sum, types.type_name, offers.description, offers.date,
	CONCAT(users.lastname,' ',users.firstname) AS "FI_users", users.email, COUNT(DISTINCT comments.offer_id) AS "Kol_vo_comments", 
	string_agg(DISTINCT	categories.title, ',') AS "Name_category"
FROM offers INNER JOIN users ON offers.user_id=users.id 
	INNER JOIN offers_categories ON offers_categories.offer_id=offers.id
	INNER JOIN types ON types.id=offers.type_id
	INER JOIN categories ON categories.id=offers_categories.category_id
	INNER JOIN comments ON comments.offer_id=offers.id
WHERE offers.id=4
GROUP BY offers.id, offers.title, offers.sum, types.type_name, offers.description, offers.date,
	CONCAT(users.lastname,' ',users.firstname), users.email
ORDER BY offers.date DESC;

--Получить список из 5 свежих комментариев 
--(идентификатор комментария, идентификатор объявления, имя и фамилия автора, текст комментария);
SELECT comments.id, comments.offer_id, CONCAT(users.lAStname,' ',users.firstname) AS "FI_users", comments.text
FROM comments INNER JOIN users ON comments.user_id=users.id 
ORDER BY comments.date DESC
LIMIT 5
	
--Получить список комментариев для определённого объявления 
--(идентификатор комментария, идентификатор объявления, имя и фамилия автора, текст комментария). 
--Сначала новые комментарии;
SELECT comments.id, comments.offer_id, CONCAT(users.lastname,' ',users.firstname) AS "FI_users", comments.text
FROM comments INNER JOIN users ON comments.user_id=users.id 
WHERE comments.offer_id=1
ORDER BY comments.date DESC

-- Выбрать 2 объявления, соответствующих типу «куплю»;
SELECT offers.*
FROM offers INNER JOIN types ON offers.type_id=types.id
WHERE types.type_name='offer'
LIMIT 2

--Обновить заголовок определённого объявления на «Уникальное предложение!»;
UPDATE offers SET title = 'Уникальное предложение!'
WHERE offers.id=2
