-- Database: buy-and-sell

-- DROP DATABASE "buy-and-sell";

CREATE DATABASE "buy-and-sell"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
	
CREATE TABLE users (
    id bigserial NOT NULL PRIMARY KEY,
    firstname character varying(100) NOT NULL,
    lastname character varying(100) NOT NULL,
    email character varying(100) NOT NULL UNIQUE,
    password character varying(100) NOT NULL,
    avatar character varying(1000) NOT NULL
);

CREATE TABLE categories (
    id bigserial NOT NULL PRIMARY KEY,
    title character varying(100) NOT NULL UNIQUE
);

CREATE TABLE types (
    id bigserial NOT NULL PRIMARY KEY,
    type_name character varying(100) NOT NULL UNIQUE
);

CREATE TABLE offers (
    id bigserial NOT NULL PRIMARY KEY,
    user_id bigint NOT NULL,
    title_id bigint NOT NULL, 
    description character varying(1000) NOT NULL,
	category_id bigint NOT NULL,
    sum numeric CONSTRAINT positive_sum CHECK(SUM>=0) NOT NULL,
    type_id  bigint NOT NULL,
    date date NOT NULL,
    picture character varying(1000) NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (title_id) REFERENCES categories(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (type_id) REFERENCES types(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (category_id) REFERENCES categories(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE comments (
    id bigserial NOT NULL PRIMARY KEY,
    offer_id bigint NOT NULL,
    user_id bigint NOT NULL,
    text character varying(1000) NOT NULL,
    date date NOT NULL,
	FOREIGN KEY (offer_id) REFERENCES offers(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE INDEX comments_users_idx ON comments(user_id);
CREATE INDEX comments_offer_idx ON comments (offer_id);
CREATE INDEX offers_users_idx ON offers(user_id);
CREATE INDEX offers_category_idx ON offers(category_id);