SET NAMES "utf8";
DROP DATABASE IF EXISTS `autocontrolbox`;
CREATE DATABASE IF NOT EXISTS `autocontrolbox` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `autocontrolbox`;

CREATE TABLE IF NOT EXISTS users(
	id CHAR(128) NOT NULL PRIMARY KEY,
	name CHAR(128) NOT NULL,
	password CHAR(128) NOT NULL
) ENGINE=INNODB CHARACTER SET utf8 COLLATE utf8_general_ci;


INSERT INTO users(id, name, password) VALUES
("9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d", "admin", "dc76e9f0c0006e8f919e0c515c66dbba3982f785");
