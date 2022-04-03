CREATE DATABASE IF NOT EXISTS `tutorapp`;
USE `tutorapp`;

CREATE TABLE IF NOT EXISTS `student` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `level` int(11) NOT NULL DEFAULT 0,
  `subject` varchar(255) NOT NULL,
  `grades` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;


INSERT INTO `student` (`id`, `firstname`, `lastname`, `email`, `level`, `subject`, `grades`) VALUES
	(1, 'Anmo', 'Vishvas', 'a.vishvas@gmail.com', 2, 'Math', 20),
	(2, 'Poovanen', 'Coonjamalay', 'poo.c@gmail.com', 2, 'Maths', 100),
	(3, 'Davessen', 'Marday', 'dav.m@gmail.com', 1, 'Computer Science', 200),
	(4, 'Anmol', 'Anmol', 'anmol@gmail.cm', 1, 'Maths', 2),
	(14, 'Cindy', 'Sunassee', 'cindy@gmail.com', 6, 'Tamil', 100),
	(18, 'Neevash', 'Ramdony', 'neevash.ramdony@gmail.com', 5, 'Law', 100);

CREATE TABLE IF NOT EXISTS `tutor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `picture` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;


INSERT INTO `tutor` (`id`, `firstname`, `lastname`, `email`, `password`, `picture`) VALUES
	(1, 'Howard', 'May', 'howard.m@gmail.com', 'Howard01', 'Howard May.jpg'),
	(7, 'Cameron', 'Jacobs', 'cameron.j@gmail.com', 'Cameron01', 'Cameron Jacobs.jpg'),
	(13, 'Jack', 'Harris', 'jack.h@gmail.com', 'Jack01', 'Jack Harris.jpg');

