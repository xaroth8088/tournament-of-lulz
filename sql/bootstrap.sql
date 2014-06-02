CREATE DATABASE IF NOT EXISTS tournament_of_lulz;
CREATE USER lulz IDENTIFIED BY "lulz";
GRANT ALL ON tournament_of_lulz.* to 'lulz'@'localhost';

USE tournament_of_lulz;

CREATE TABLE `images` (
  `image_id` int(11) NOT NULL AUTO_INCREMENT,
  `page_url` varchar(512) DEFAULT NULL,
  `image_url` varchar(512) DEFAULT NULL,
  `thumbnail_url` varchar(512) DEFAULT NULL,
  `title` varchar(512) DEFAULT NULL,
  `rating` double DEFAULT '1500',
  `rd` double DEFAULT '350',
  `volatility` double DEFAULT '0.06',
  PRIMARY KEY (`image_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
