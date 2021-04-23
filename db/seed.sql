CREATE TABLE user_info (
user_id SERIAL PRIMARY KEY,
username VARCHAR(250) NOT NULL,
password VARCHAR(250) NOT NULL,
first_name VARCHAR(250) NOT NULL,
last_name VARCHAR(250) NOT NULL,
birthday DATE NOT NULL,
email VARCHAR(250) NOT NULL,
profile_pic VARCHAR(3000),
phone_number INTEGER,
is_admin BOOLEAN
);

CREATE TABLE user_ticket (
ticket_id SERIAL PRIMARY KEY,
user_id SERIAL REFERENCES user_info(user_id),
date DATE NOT NULL,
title VARCHAR(255) NOT NULL,
category VARCHAR(255) NOT NULL,
description VARCHAR(5000) NOT NULL,
is_open BOOLEAN DEFAULT FALSE NOT NULL,
media VARCHAR(3000)
);

CREATE TABLE ticket_comment (
comment_id SERIAL PRIMARY KEY,
user_id SERIAL REFERENCES user_info(user_id),
ticket_id SERIAL REFERENCES user_ticket(ticket_id),
message VARCHAR(3000) NOT NULL
);