-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 31, 2023 at 02:06 AM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `festivalbuy`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL,
  `email` varchar(64) DEFAULT NULL,
  `full_name` varchar(30) NOT NULL,
  `address` varchar(128) DEFAULT NULL,
  `city` varchar(32) DEFAULT NULL,
  `country` varchar(64) DEFAULT NULL,
  `register_on` datetime NOT NULL,
  `password` varchar(16) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `zipcode` varchar(24) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customer_id`, `email`, `full_name`, `address`, `city`, `country`, `register_on`, `password`, `phone`, `zipcode`) VALUES
(1, 'food@gmail.com', '王曉明', '彰化縣花壇鄉中山路二段457號', '彰化縣', '台灣省', '2023-01-31 01:43:24', 'P@ssw0rd', '047867168', '503'),
(2, 'house@gmail.com', '李大仁', '嘉義市西區玉山路501號', '嘉義市', '台灣省', '2023-01-31 01:43:24', 'P@ssw0rd', '052830098', '600'),
(3, 'museum@gmail.com', '李大維', '高雄市三民區九如一路720號', '高雄市', '台灣省', '2023-01-31 01:43:24', 'P@ssw0rd', '073800087', '807');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
