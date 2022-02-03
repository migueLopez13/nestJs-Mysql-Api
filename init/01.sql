--
-- Database: `contact-book`
--
-- --------------------------------------------------------
--
-- Table structure for table `contact`
--
DROP TABLE IF EXISTS `contact`;
CREATE TABLE IF NOT EXISTS `contact` (
  `id` varchar(200) not null,
  `dni` varchar(10) not null,
  `name` varchar(50) UNIQUE,
  `surname` varchar(50) not null,
  `phone` varchar(20) not null,
  `gender` varchar(10) not null,
  `address` varchar(200) not null,
  PRIMARY KEY (`id`)
)DEFAULT CHARSET=utf8;
--
-- Table structure for table `credential`
--
DROP TABLE IF EXISTS `credential`;
CREATE TABLE IF NOT EXISTS `credential` (
  `id` varchar(200) not null,
  `contactId` varchar(200) not null,
  `password` varchar(150) not null,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`contactId`) REFERENCES `contact`(`id`)
)DEFAULT CHARSET=utf8;
--
-- Dumping data for table `contact`
--
INSERT INTO `contact` VALUES
('d0ceffe7-bd43-4536-9e4f-5a20311aaa84', '77190213P', 'david', 'Rodriguez', '123456789','Male', 'calle1'),
('d0ceffe7-bd43-4536-9e4f-5a20311aaa83', '77190212P', 'pepa', 'Rodriguez', '123456789','Female', 'calle2'),
('d0ceffe7-bd43-4536-9e4f-5a20311aaa82', '77190211P', 'antonio', 'Perez', '123456789','Male', 'calle3'),
('d0ceffe7-bd43-4536-9e4f-5a20311aaa81', '77190214P', 'Laura', 'Antunez', '123456789','Female', 'calle4');
--
-- Dumping data for table `Credential`
--
INSERT INTO `credential` VALUES
('1b138141-2948-4929-8ade-a218b1980e46', 'd0ceffe7-bd43-4536-9e4f-5a20311aaa84', '$2b$10$ux8CDQEkFUdH4YFumLkLtuWOav6KYI4mYQpm7Pxdz7TOI.oOmNM6C'),
('1b138141-2948-4929-8ade-a218b1980e45', 'd0ceffe7-bd43-4536-9e4f-5a20311aaa83', '$2b$10$ux8CDQEkFUdH4YFumLkLtuWOav6KYI4mYQpm7Pxdz7TOI.oOmNM6C'),
('1b138141-2948-4929-8ade-a218b1980e44', 'd0ceffe7-bd43-4536-9e4f-5a20311aaa82', '$2b$10$ux8CDQEkFUdH4YFumLkLtuWOav6KYI4mYQpm7Pxdz7TOI.oOmNM6C'),
('1b138141-2948-4929-8ade-a218b1980e43', 'd0ceffe7-bd43-4536-9e4f-5a20311aaa81', '$2b$10$ux8CDQEkFUdH4YFumLkLtuWOav6KYI4mYQpm7Pxdz7TOI.oOmNM6C');