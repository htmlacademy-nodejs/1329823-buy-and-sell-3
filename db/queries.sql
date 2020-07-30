--Получить список всех категорий (идентификатор, наименование категории);
Select id, title
From categories

--Получить список категорий для которых создано минимум одно объявление 
--(идентификатор, наименование категории);
Select categories.id, categories.title
From categories INNER JOIN offers_categories ON categories.id=offers_categories.category_id
Group by categories.id, categories.title

--Получить список категорий с количеством объявлений 
--(идентификатор, наименование категории, количество объявлений в категории);
Select categories.id, categories.title, count(offers_categories.offer_id) as "Кол-во объявлений"
From categories INNER JOIN offers_categories ON categories.id=offers_categories.category_id
Group by categories.id, categories.title

-- Получить список объявлений 
--(идентификатор объявления, заголовок объявления, стоимость, тип объявления, текст объявления, дата публикации, 
--имя и фамилия автора, контактный email, количество комментариев, наименование категорий). 
--Сначала свежие объявления;
Select offers.id, offers.title, offers.sum, types.type_name, offers.description, offers.date,
	concat(users.lastname,' ',users.firstname) as "ФИ автора", users.email, count(distinct comments.offer_id) as "Кол-во комментариев", 
	string_agg(distinct	categories.title, ',') as "Наименование категорий"
From offers INNER JOIN users ON offers.user_id=users.id 
	INNER JOIN offers_categories ON offers_categories.offer_id=offers.id
	INNER JOIN types ON types.id=offers.type_id
	LEFT JOIN categories ON categories.id=offers_categories.category_id
	INNER JOIN comments ON comments.offer_id=offers.id
Group by offers.id, offers.title, offers.sum, types.type_name, offers.description, offers.date,
	concat(users.lastname,' ',users.firstname), users.email
Order by offers.date DESC;

--Получить полную информацию определённого объявления 
--(идентификатор объявления, заголовок объявления, стоимость, тип объявления, 
--текст объявления, дата публикации, имя и фамилия автора, контактный email, 
--количество комментариев, наименование категорий);
Select offers.id, offers.title, offers.sum, types.type_name, offers.description, offers.date,
	concat(users.lastname,' ',users.firstname) as "ФИ автора", users.email, count(distinct comments.offer_id) as "Кол-во комментариев", 
	string_agg(distinct	categories.title, ',') as "Наименование категорий"
From offers INNER JOIN users ON offers.user_id=users.id 
	INNER JOIN offers_categories ON offers_categories.offer_id=offers.id
	INNER JOIN types ON types.id=offers.type_id
	INER JOIN categories ON categories.id=offers_categories.category_id
	INNER JOIN comments ON comments.offer_id=offers.id
Where offers.id=4
Group by offers.id, offers.title, offers.sum, types.type_name, offers.description, offers.date,
	concat(users.lastname,' ',users.firstname), users.email
Order by offers.date DESC;

--Получить список из 5 свежих комментариев 
--(идентификатор комментария, идентификатор объявления, имя и фамилия автора, текст комментария);
Select comments.id, comments.offer_id, concat(users.lastname,' ',users.firstname) as "ФИ автора", comments.text
From comments INNER JOIN users ON comments.user_id=users.id 
Order by comments.date DESC
Limit 5
	
--Получить список комментариев для определённого объявления 
--(идентификатор комментария, идентификатор объявления, имя и фамилия автора, текст комментария). 
--Сначала новые комментарии;
Select comments.id, comments.offer_id, concat(users.lastname,' ',users.firstname) as "ФИ автора", comments.text
From comments INNER JOIN users ON comments.user_id=users.id 
Where comments.offer_id=1
Order by comments.date DESC

-- Выбрать 2 объявления, соответствующих типу «куплю»;
Select offers.*
From offers INNER JOIN types ON offers.type_id=types.id
Where types.type_name='offer'
Limit 2

--Обновить заголовок определённого объявления на «Уникальное предложение!»;
Update offers set title = 'Уникальное предложение!'
Where offers.id=2
