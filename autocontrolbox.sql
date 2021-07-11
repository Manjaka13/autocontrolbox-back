SET NAMES "utf8";
DROP DATABASE IF EXISTS `autocontrolbox`;
CREATE DATABASE IF NOT EXISTS `autocontrolbox` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `autocontrolbox`;

CREATE TABLE IF NOT EXISTS user(
	id TEXT NOT NULL PRIMARY KEY,
	name CHAR(128) NOT NULL,
	password TEXT NOT NULL
) ENGINE=INNODB CHARACTER SET utf8 COLLATE utf8_general_ci;


INSERT INTO user(id, name, password) VALUES
("9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d", "admin", "$2y$12$WThj6nY35iuB4/He0KozNuZ/roBHzN23xVlUWPJWwUUKNEw0beCLi");
