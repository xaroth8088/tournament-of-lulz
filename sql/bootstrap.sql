CREATE DATABASE IF NOT EXISTS tournament_of_lulz;
CREATE USER lulz IDENTIFIED BY "lulz";
GRANT ALL ON tournament_of_lulz.* to 'lulz'@'localhost';

USE tournament_of_lulz;

CREATE TABLE `images` (
  `image_id` int(11) NOT NULL AUTO_INCREMENT,
  `image_url_hash` varchar(32) DEFAULT NULL,
  `image_url` varchar(512) DEFAULT NULL,
  `page_url` varchar(512) DEFAULT NULL,
  `thumbnail_url` varchar(512) DEFAULT NULL,
  `title` varchar(512) DEFAULT NULL,
  `rating` double DEFAULT '1500',
  `rd` double DEFAULT '350',
  `volatility` double DEFAULT '0.06',
  PRIMARY KEY (`image_id`),
  UNIQUE KEY `image_url_hash_UNIQUE` (`image_url_hash`)
) ENGINE=InnoDB AUTO_INCREMENT=1028 DEFAULT CHARSET=utf8;

CREATE TABLE `tournaments` (
  `tournament_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `start_time` datetime NOT NULL,
  PRIMARY KEY (`tournament_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
