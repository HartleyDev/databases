CREATE DATABASE chat;

USE chat;

-- CREATE TABLE messages (
--    Describe your table here.
-- );

/* Create other tables and define schemas for them here! */





-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Messages'
--
-- ---

DROP TABLE IF EXISTS `Messages`;

CREATE TABLE `Messages` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `user_id` INTEGER(11) NOT NULL,
  `room_id` INTEGER(11) NOT NULL,
  `text` MEDIUMTEXT NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `roomname` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Rooms'
--
-- ---

DROP TABLE IF EXISTS `Rooms`;

CREATE TABLE `Rooms` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `user_id` INTEGER(11) NOT NULL,
  `users_count` INTEGER(11) NOT NULL DEFAULT 0,
  `roomname` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Users'
--
-- ---

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `curr_room_id` INTEGER(11) NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---


-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Rooms` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Messages` (`id`,`user_id`,`room_id`,`text`,`username`,`roomname`,`created_at`,`updated_at`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `Rooms` (`id`,`user_id`,`users_count`,`roomname`,`created_at`,`updated_at`) VALUES
-- ('','','','','','');
-- INSERT INTO `Users` (`id`,`curr_room_id`,`username`,`created_at`,`updated_at`) VALUES
-- ('','','','','');




/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/




