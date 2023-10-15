CREATE DATABASE ptreddit CHARSET=utf8;

USE ptreddit;

CREATE TABLE users
(
    id BIGINT UNSIGNED AUTO_INCREMENT,
    login VARCHAR(100) NOT NULL,
    password CHAR(128) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE sites
(
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    icon BLOB,
    link TEXT,
    title VARCHAR(100) NOT NULL,
    `description` TEXT,
    author_id BIGINT UNSIGNED,
    FOREIGN KEY (author_id) REFERENCES users (id)
);

CREATE TABLE ratings
(
    user_id BIGINT UNSIGNED,
    site_id BIGINT UNSIGNED,
    rate TINYINT UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (site_id) REFERENCES sites (id)
);

CREATE TABLE super_users
(
    user_id BIGINT UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES users (id)
);