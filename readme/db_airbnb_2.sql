/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `bookingRoom` (
  `id` int NOT NULL AUTO_INCREMENT,
  `room_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `date_on` date DEFAULT NULL,
  `date_out` date DEFAULT NULL,
  `number_guest` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `room_id` (`room_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `bookingRoom_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`),
  CONSTRAINT `bookingRoom_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `room_id` int NOT NULL,
  `user_id` int NOT NULL,
  `date_comment` date DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `rate` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `chats_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chat_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `chat_id` (`chat_id`),
  CONSTRAINT `chats_users_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `chats_users_ibfk_2` FOREIGN KEY (`chat_id`) REFERENCES `group_chat` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `group_chat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chat_name` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `location` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name_locate` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `nation` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `chat_id` int DEFAULT NULL,
  `content` text,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `chat_id` (`chat_id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`chat_id`) REFERENCES `group_chat` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `photoRoom` (
  `id` int NOT NULL AUTO_INCREMENT,
  `room_id` int NOT NULL,
  `photo_1` varchar(255) DEFAULT NULL,
  `photo_2` varchar(255) DEFAULT NULL,
  `photo_3` varchar(255) DEFAULT NULL,
  `photo_4` varchar(255) DEFAULT NULL,
  `photo_5` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `photoRoom_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `room` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name_room` varchar(255) NOT NULL,
  `guest` int NOT NULL,
  `bedroom` int NOT NULL,
  `bathroom` int NOT NULL,
  `descr` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `wash_machine` tinyint(1) DEFAULT NULL,
  `iron_cloth` tinyint(1) DEFAULT NULL,
  `television` tinyint(1) DEFAULT NULL,
  `air_conditioner` tinyint(1) DEFAULT NULL,
  `wifi` tinyint(1) DEFAULT NULL,
  `kitchen` tinyint(1) DEFAULT NULL,
  `park` tinyint(1) DEFAULT NULL,
  `pool` tinyint(1) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `locate_id` int DEFAULT NULL,
  `metaData` mediumtext,
  `type_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `type_id` (`type_id`),
  KEY `locate_id` (`locate_id`),
  CONSTRAINT `room_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `roomType` (`id`),
  CONSTRAINT `room_ibfk_3` FOREIGN KEY (`locate_id`) REFERENCES `location` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `roomType` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) DEFAULT NULL,
  `icons` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pass_word` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `birth_day` date DEFAULT NULL,
  `gender` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `face_app_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `bookingRoom` (`id`, `room_id`, `user_id`, `date_on`, `date_out`, `number_guest`) VALUES
(1, 1, 4, '2023-11-06', '2023-12-10', 2);
INSERT INTO `bookingRoom` (`id`, `room_id`, `user_id`, `date_on`, `date_out`, `number_guest`) VALUES
(2, 2, 2, '2023-11-06', '2023-12-10', 2);
INSERT INTO `bookingRoom` (`id`, `room_id`, `user_id`, `date_on`, `date_out`, `number_guest`) VALUES
(3, 3, 3, '2023-11-06', '2023-12-10', 2);
INSERT INTO `bookingRoom` (`id`, `room_id`, `user_id`, `date_on`, `date_out`, `number_guest`) VALUES
(4, 4, 2, '2023-11-06', '2023-12-10', 2),
(5, 5, 6, '2023-11-06', '2023-12-10', 2),
(6, 6, 6, '2023-11-06', '2023-12-10', 2),
(7, 7, 6, '2023-11-06', '2023-12-10', 2);

INSERT INTO `comments` (`id`, `room_id`, `user_id`, `date_comment`, `content`, `rate`) VALUES
(1, 1, 1, '2023-10-10', 'bình luận phòng 1 nha', 5);
INSERT INTO `comments` (`id`, `room_id`, `user_id`, `date_comment`, `content`, `rate`) VALUES
(2, 2, 2, '2023-10-10', 'bình luận phòng 2 nha', 5);
INSERT INTO `comments` (`id`, `room_id`, `user_id`, `date_comment`, `content`, `rate`) VALUES
(3, 3, 1, '2023-10-11', 'bình luận phòng 3 nha', 5);
INSERT INTO `comments` (`id`, `room_id`, `user_id`, `date_comment`, `content`, `rate`) VALUES
(4, 4, 1, '2023-10-11', 'bình luận phòng 3 nha', 5),
(5, 5, 1, '2023-10-11', 'bình luận phòng 3 nha', 5),
(6, 6, 1, '2023-10-11', 'bình luận phòng 3 nha', 5),
(7, 7, 1, '2023-10-11', 'bình luận phòng 3 nha', 5),
(8, 8, 1, '2023-10-11', 'bình luận phòng 3 nha', 5),
(9, 9, 1, '2023-10-11', 'bình luận phòng 3 nha', 5),
(10, 10, 1, '2023-10-11', 'bình luận phòng 3 nha', 5),
(11, 11, 1, '2023-10-11', 'bình luận phòng 3 nha', 5),
(12, 12, 1, '2023-10-11', 'bình luận phòng 3 nha', 5),
(13, 13, 1, '2023-10-11', 'bình luận phòng 3 nha', 5),
(14, 14, 1, '2023-10-11', 'bình luận phòng 3 nha', 5),
(15, 15, 1, '2023-10-11', 'bình luận phòng 3 nha', 5),
(16, 16, 1, '2023-10-11', 'bình luận phòng 3 nha', 5),
(17, 17, 1, '2023-10-11', 'bình luận phòng 3 nha', 5),
(18, 18, 1, '2023-10-11', 'bình luận phòng 3 nha', 5),
(19, 1, 1, '2023-10-11', 'bình luận phòng 3 nha', 5),
(20, 2, 1, '2023-10-11', 'bình luận phòng 3 nha', 5),
(21, 3, 1, '2023-10-11', 'bình luận phòng 3 nha', 5),
(22, 4, 1, '2023-10-11', 'bình luận phòng 3 nha', 5),
(23, 2, 6, '2023-11-12', 'ssss', 0),
(24, 2, 6, '2023-11-12', 'sss', 0),
(25, 1, 6, '2023-11-12', 'sss', 0),
(26, 9, 6, '2023-11-12', 'q', 0),
(27, 13, 6, '2023-11-12', '1', 0),
(28, 17, 6, '2023-11-17', 'aa', 0),
(29, 17, 6, '2023-11-17', 'bình luận nè nha', 0),
(30, 17, 6, '2023-11-17', 'cũng tạm tàm', 0),
(31, 17, 6, '2023-11-17', 'thấy cũng oke', 0),
(32, 17, 6, '2023-11-17', 'nhưng mà od chủ định nha', 0);

INSERT INTO `chats_users` (`id`, `chat_id`, `user_id`) VALUES
(1, 1, 1);
INSERT INTO `chats_users` (`id`, `chat_id`, `user_id`) VALUES
(2, 2, 1);
INSERT INTO `chats_users` (`id`, `chat_id`, `user_id`) VALUES
(3, 3, 1);
INSERT INTO `chats_users` (`id`, `chat_id`, `user_id`) VALUES
(4, 1, 2),
(5, 2, 2),
(6, 3, 2),
(7, 1, 6),
(8, 2, 6),
(9, 3, 6),
(10, 4, 6),
(11, 5, 6),
(12, 4, 4),
(13, 5, 3),
(14, 6, 6),
(15, 7, 6),
(16, 8, 6),
(17, 9, 6),
(18, 10, 6),
(19, 11, 6),
(20, 12, 6),
(21, 13, 6),
(22, 14, 6),
(23, 15, 6),
(24, 16, 6),
(25, 11, 7),
(26, 12, 7),
(27, 13, 7),
(28, 14, 7);

INSERT INTO `group_chat` (`id`, `chat_name`, `createdAt`, `updatedAt`) VALUES
(1, 'room-1', '2023-11-13 00:00:00', '2023-11-15 06:44:53');
INSERT INTO `group_chat` (`id`, `chat_name`, `createdAt`, `updatedAt`) VALUES
(2, 'room-2', '2023-11-13 00:00:00', '2023-11-15 08:49:50');
INSERT INTO `group_chat` (`id`, `chat_name`, `createdAt`, `updatedAt`) VALUES
(3, 'room-3', '2023-11-13 00:00:00', '2023-11-15 08:49:50');
INSERT INTO `group_chat` (`id`, `chat_name`, `createdAt`, `updatedAt`) VALUES
(4, 'room-4', '2023-11-13 00:00:00', '2023-11-15 08:49:50'),
(5, 'room-5', '2023-11-13 00:00:00', '2023-11-15 08:49:50'),
(6, 'room-6', '2023-11-13 00:00:00', '2023-11-17 03:49:19'),
(7, 'room-7', '2023-11-13 00:00:00', '2023-11-17 03:49:19'),
(8, 'room-8', '2023-11-13 00:00:00', '2023-11-17 03:49:19'),
(9, 'room-9', '2023-11-13 00:00:00', '2023-11-17 03:49:19'),
(10, 'room-10', '2023-11-13 00:00:00', '2023-11-17 03:49:19'),
(11, 'room-11', '2023-11-13 00:00:00', '2023-11-17 03:49:19'),
(12, 'room-12', '2023-11-13 00:00:00', '2023-11-17 03:49:19'),
(13, 'room-13', '2023-11-13 00:00:00', '2023-11-17 03:49:19'),
(14, 'room-14', '2023-11-13 00:00:00', '2023-11-17 03:49:19'),
(15, 'room-15', '2023-11-13 00:00:00', '2023-11-17 03:49:19'),
(16, 'room-16', '2023-11-13 00:00:00', '2023-11-17 03:49:19');

INSERT INTO `location` (`id`, `name_locate`, `province`, `nation`, `photo`) VALUES
(1, 'Bùi hữu nghĩa', 'Thành Phố Hồ Chí Minh', 'Việt Nam', 'bhn.img');
INSERT INTO `location` (`id`, `name_locate`, `province`, `nation`, `photo`) VALUES
(2, 'Quang Trung', 'Thành Phố Hồ Chí Minh', 'Việt Nam', 'bhn.img');


INSERT INTO `messages` (`id`, `user_id`, `chat_id`, `content`, `createdAt`, `updatedAt`) VALUES
(1, 6, 1, 'nt phòng 1', '2023-11-13 00:00:00', '2023-11-13 06:49:28');
INSERT INTO `messages` (`id`, `user_id`, `chat_id`, `content`, `createdAt`, `updatedAt`) VALUES
(2, 6, 1, 'a', '2023-11-15 08:28:53', '2023-11-15 08:28:54');
INSERT INTO `messages` (`id`, `user_id`, `chat_id`, `content`, `createdAt`, `updatedAt`) VALUES
(3, 6, 1, 'aaaaaaa', '2023-11-15 08:33:03', '2023-11-15 08:33:07');
INSERT INTO `messages` (`id`, `user_id`, `chat_id`, `content`, `createdAt`, `updatedAt`) VALUES
(8, 6, 2, 'tanas phu nt ne', '2023-11-15 08:49:54', '2023-11-15 08:49:54'),
(9, 6, 2, 'tôi bình luân cái này 1 á', '2023-11-15 08:51:33', '2023-11-15 08:51:33'),
(10, 1, 2, 'ssssssssss', '2023-11-15 08:52:38', '2023-11-15 08:52:38'),
(11, 6, 2, '33333333', '2023-11-15 08:52:54', '2023-11-15 08:52:54'),
(12, 6, 2, '444444444', '2023-11-15 08:53:00', '2023-11-15 08:53:00'),
(13, 6, 2, '11111111', '2023-11-15 08:53:42', '2023-11-15 08:53:42'),
(14, 6, 2, 'ss', '2023-11-15 08:54:28', '2023-11-15 08:54:28'),
(15, 6, 2, 'aaaaaaa', '2023-11-15 08:55:01', '2023-11-15 08:55:01'),
(16, 1, 2, 'aaaaaa', '2023-11-15 08:55:17', '2023-11-15 08:55:17'),
(17, 6, 2, 'bb', '2023-11-15 08:55:24', '2023-11-15 08:55:24'),
(18, 1, 2, 'cccccc', '2023-11-15 08:55:29', '2023-11-15 08:55:29'),
(19, 6, 2, 'dddd', '2023-11-15 08:55:45', '2023-11-15 08:55:45'),
(20, 6, 2, '1', '2023-11-15 08:56:22', '2023-11-15 08:56:22'),
(21, 1, 2, '2', '2023-11-15 08:56:30', '2023-11-15 08:56:30'),
(22, 6, 2, '3', '2023-11-15 08:56:38', '2023-11-15 08:56:38'),
(23, 1, 2, '4', '2023-11-15 08:56:43', '2023-11-15 08:56:43'),
(24, 6, 2, '5', '2023-11-15 08:56:49', '2023-11-15 08:56:49'),
(25, 1, 2, '6', '2023-11-15 08:56:54', '2023-11-15 08:56:54'),
(26, 6, 1, 'aaaaa', '2023-11-15 09:37:04', '2023-11-15 11:55:33'),
(27, 6, 1, 'vvvvvv', '2023-11-15 09:41:04', '2023-11-15 11:55:33'),
(28, 1, 1, '1', '2023-11-15 11:54:21', '2023-11-15 11:55:23'),
(29, 1, 2, '2', '2023-11-15 11:54:21', '2023-11-15 11:55:23'),
(30, 1, 3, '3', '2023-11-15 11:54:21', '2023-11-15 11:55:23'),
(31, 2, 1, '5', '2023-11-15 11:54:21', '2023-11-15 11:55:23'),
(32, 2, 2, '123', '2023-11-15 11:54:21', '2023-11-15 11:55:28'),
(46, 6, 3, 'tấn phú nhắn tin nè mọi người ơi', '2023-11-16 08:25:48', '2023-11-16 08:25:48'),
(47, 6, 2, 'aaaaaaaa', '2023-11-16 13:51:55', '2023-11-16 13:51:55'),
(48, 6, 2, 'tôi nhắn ngày 16 11 2023', '2023-11-16 13:52:19', '2023-11-16 13:52:19'),
(49, 6, 2, 'TP01', '2023-11-16 13:55:58', '2023-11-16 13:55:58'),
(50, 6, 2, 'aaaaa', '2023-11-16 13:58:09', '2023-11-16 13:58:09'),
(51, 6, 2, 'aaaaa', '2023-11-16 13:59:34', '2023-11-16 13:59:34'),
(52, 6, 2, '9h00 ngày 16 11 2023', '2023-11-16 14:01:01', '2023-11-16 14:01:01'),
(53, 6, 2, 'aaaaaaaa', '2023-11-16 14:06:10', '2023-11-16 14:06:10'),
(54, 6, 2, 'bbbbbbb', '2023-11-16 14:06:36', '2023-11-16 14:06:36'),
(55, 6, 2, 'cccccc', '2023-11-16 14:07:32', '2023-11-16 14:07:32'),
(56, 6, 2, 'aaaa', '2023-11-16 14:08:45', '2023-11-16 14:08:45'),
(57, 6, 2, 'aaaaaa', '2023-11-16 14:11:39', '2023-11-16 14:11:39'),
(58, 6, 2, 'TP010', '2023-11-16 14:12:26', '2023-11-16 14:12:26'),
(59, 6, 2, '1', '2023-11-16 14:13:35', '2023-11-16 14:13:35'),
(60, 6, 2, '2', '2023-11-16 14:15:57', '2023-11-16 14:15:57'),
(61, 6, 2, '3', '2023-11-16 14:17:26', '2023-11-16 14:17:26'),
(62, 6, 2, '4', '2023-11-16 14:19:00', '2023-11-16 14:19:00'),
(63, 6, 2, 'AAAAAAA', '2023-11-16 14:28:40', '2023-11-16 14:28:40'),
(64, 6, 2, 'a', '2023-11-16 14:57:28', '2023-11-16 14:57:28'),
(65, 6, 2, 'a', '2023-11-16 14:59:33', '2023-11-16 14:59:33'),
(66, 6, 2, 'aa', '2023-11-16 15:04:01', '2023-11-16 15:04:01'),
(67, 6, 2, '2222', '2023-11-16 15:04:27', '2023-11-16 15:04:27'),
(68, 6, 2, '111', '2023-11-16 15:07:03', '2023-11-16 15:07:03'),
(69, 6, 2, '22222', '2023-11-16 15:07:11', '2023-11-16 15:07:11'),
(70, 6, 2, '3333333', '2023-11-16 15:07:17', '2023-11-16 15:07:17'),
(71, 6, 2, '1', '2023-11-16 15:11:07', '2023-11-16 15:11:07'),
(72, 7, 2, '2', '2023-11-16 15:11:12', '2023-11-16 15:11:12'),
(73, 7, 2, '22', '2023-11-16 15:12:48', '2023-11-16 15:12:48'),
(74, 6, 2, '44', '2023-11-16 15:12:59', '2023-11-16 15:12:59'),
(75, 7, 2, '1', '2023-11-16 15:17:35', '2023-11-16 15:17:35'),
(76, 7, 2, '222', '2023-11-16 15:17:45', '2023-11-16 15:17:45'),
(77, 7, 2, '33333', '2023-11-16 15:18:30', '2023-11-16 15:18:30'),
(78, 6, 5, 'kkjlaksjlksa', '2023-11-16 15:29:01', '2023-11-16 15:29:01'),
(79, 6, 1, 'tôi là số 1', '2023-11-16 15:35:39', '2023-11-16 15:35:39'),
(80, 6, 1, 'aaa', '2023-11-16 15:36:05', '2023-11-16 15:36:05'),
(81, 6, 1, 'a', '2023-11-16 15:36:21', '2023-11-16 15:36:21'),
(82, 6, 1, 'a', '2023-11-16 15:36:42', '2023-11-16 15:36:42'),
(83, 6, 1, 'tôi là phan tấn phú', '2023-11-16 15:37:49', '2023-11-16 15:37:49'),
(84, 6, 1, 'i don\'t know', '2023-11-17 00:41:29', '2023-11-17 00:41:29'),
(85, 6, 1, 'tôi không biết', '2023-11-17 00:41:36', '2023-11-17 00:41:36'),
(86, 6, 1, 'số 3 nè', '2023-11-17 00:41:42', '2023-11-17 00:41:42'),
(87, 6, 1, 'số 4 nè', '2023-11-17 00:41:49', '2023-11-17 00:41:49'),
(88, 6, 1, 'số 5', '2023-11-17 00:42:05', '2023-11-17 00:42:05'),
(89, 6, 10, 'a', '2023-11-17 04:35:56', '2023-11-17 04:35:56'),
(90, 6, 10, 'b', '2023-11-17 04:36:05', '2023-11-17 04:36:05'),
(91, 6, 10, 'c', '2023-11-17 04:36:10', '2023-11-17 04:36:10'),
(92, 6, 6, 'nhắn tin phòng 6', '2023-11-17 07:21:48', '2023-11-17 07:21:48'),
(93, 6, 2, '1', '2023-11-17 07:46:51', '2023-11-17 07:46:51'),
(94, 6, 2, 'a', '2023-11-17 07:49:01', '2023-11-17 07:49:01'),
(95, 6, 2, '1', '2023-11-17 07:49:06', '2023-11-17 07:49:06'),
(96, 6, 2, '1', '2023-11-17 07:50:43', '2023-11-17 07:50:43'),
(97, 6, 2, '3', '2023-11-17 07:50:48', '2023-11-17 07:50:48'),
(98, 6, 2, '4', '2023-11-17 07:50:53', '2023-11-17 07:50:53'),
(99, 6, 15, '1', '2023-11-17 07:56:26', '2023-11-17 07:56:26');
INSERT INTO `messages` (`id`, `user_id`, `chat_id`, `content`, `createdAt`, `updatedAt`) VALUES
(100, 6, 14, 'như ý nhắn lần 1', '2023-11-17 08:01:32', '2023-11-17 08:01:32'),
(101, 7, 14, 'tấn phú nhắn lần 1', '2023-11-17 08:01:40', '2023-11-17 08:01:40'),
(102, 6, 14, 'như ý nhắn lần 2', '2023-11-17 08:03:19', '2023-11-17 08:03:19'),
(103, 6, 14, 'a', '2023-11-17 08:09:58', '2023-11-17 08:09:58'),
(104, 6, 14, 'như ý nhắn lần 3', '2023-11-17 08:10:58', '2023-11-17 08:10:58'),
(105, 6, 14, '1', '2023-11-17 08:16:00', '2023-11-17 08:16:00'),
(106, 7, 14, '2', '2023-11-17 08:16:17', '2023-11-17 08:16:17'),
(107, 7, 14, '2', '2023-11-17 08:17:06', '2023-11-17 08:17:06'),
(108, 6, 14, '3', '2023-11-17 08:17:12', '2023-11-17 08:17:12'),
(109, 6, 14, 'như ý 1', '2023-11-17 08:17:56', '2023-11-17 08:17:56'),
(110, 7, 14, 'tấn phú 1', '2023-11-17 08:18:04', '2023-11-17 08:18:04'),
(111, 6, 14, '2', '2023-11-17 08:19:24', '2023-11-17 08:19:24'),
(112, 7, 14, '3', '2023-11-17 08:19:42', '2023-11-17 08:19:42'),
(113, 6, 14, '4', '2023-11-17 08:19:49', '2023-11-17 08:19:49'),
(114, 7, 14, '6', '2023-11-17 08:19:54', '2023-11-17 08:19:54'),
(115, 6, 14, 'muốn gì', '2023-11-17 08:20:02', '2023-11-17 08:20:02'),
(116, 7, 14, 'không sao', '2023-11-17 08:20:12', '2023-11-17 08:20:12'),
(117, 6, 14, '1', '2023-11-17 08:30:50', '2023-11-17 08:30:50'),
(118, 7, 14, '2', '2023-11-17 08:30:52', '2023-11-17 08:30:52'),
(119, 6, 14, '3', '2023-11-17 08:30:55', '2023-11-17 08:30:55'),
(120, 7, 14, '5', '2023-11-17 08:31:03', '2023-11-17 08:31:03'),
(121, 6, 14, '6', '2023-11-17 08:31:14', '2023-11-17 08:31:14'),
(122, 7, 14, '7', '2023-11-17 08:32:39', '2023-11-17 08:32:39'),
(123, 6, 1, 'tôi là như ý võ', '2023-11-17 08:56:12', '2023-11-17 08:56:12'),
(124, 6, 1, 'lần 1', '2023-11-17 08:56:18', '2023-11-17 08:56:18'),
(125, 6, 1, 'lần 2', '2023-11-17 08:56:21', '2023-11-17 08:56:21'),
(126, 6, 1, 'lần 3', '2023-11-17 08:56:23', '2023-11-17 08:56:23'),
(127, 6, 1, 'lần4', '2023-11-17 08:56:36', '2023-11-17 08:56:36');

INSERT INTO `photoRoom` (`id`, `room_id`, `photo_1`, `photo_2`, `photo_3`, `photo_4`, `photo_5`) VALUES
(1, 1, 'img1.pgn', 'img2.pgn', 'img3.pgn', 'img4.pgn', 'img5.pgn');


INSERT INTO `room` (`id`, `name_room`, `guest`, `bedroom`, `bathroom`, `descr`, `price`, `wash_machine`, `iron_cloth`, `television`, `air_conditioner`, `wifi`, `kitchen`, `park`, `pool`, `photo`, `locate_id`, `metaData`, `type_id`) VALUES
(1, 'Apartment in 1 district ', 3, 1, 1, 'phòng tiện nghi 1', 20, 1, 1, 1, 1, 1, 1, 1, 1, '1699756563922_119878.jpg', 1, 'img1.img', 1);
INSERT INTO `room` (`id`, `name_room`, `guest`, `bedroom`, `bathroom`, `descr`, `price`, `wash_machine`, `iron_cloth`, `television`, `air_conditioner`, `wifi`, `kitchen`, `park`, `pool`, `photo`, `locate_id`, `metaData`, `type_id`) VALUES
(2, 'villa VungTau', 3, 1, 1, 'phòng tiện nghi 1', 20, 1, 1, 1, 1, 1, 1, 1, 1, '1699756573901_564826.jpg', 2, 'img2.img', 2);
INSERT INTO `room` (`id`, `name_room`, `guest`, `bedroom`, `bathroom`, `descr`, `price`, `wash_machine`, `iron_cloth`, `television`, `air_conditioner`, `wifi`, `kitchen`, `park`, `pool`, `photo`, `locate_id`, `metaData`, `type_id`) VALUES
(3, 'Nature lodge in Hoi An', 3, 1, 1, 'phòng tiện nghi 1', 20, 1, 1, 1, 1, 1, 1, 1, 1, '1699756586297_bali-4882642_1280.jpg', 1, 'img3.img', 3);
INSERT INTO `room` (`id`, `name_room`, `guest`, `bedroom`, `bathroom`, `descr`, `price`, `wash_machine`, `iron_cloth`, `television`, `air_conditioner`, `wifi`, `kitchen`, `park`, `pool`, `photo`, `locate_id`, `metaData`, `type_id`) VALUES
(4, 'Bungalow in Lao Cai', 3, 1, 1, 'phòng tiện nghi 1', 20, 1, 1, 1, 1, 1, 1, 1, 1, '1699756592148_Doc-chin-khoanh-Ha-Giang.jpg', 1, 'img3.img', 4),
(5, 'Bungalow Beach Phu Quoc', 3, 1, 1, 'phòng tiện nghi 1', 20, 1, 1, 1, 1, 1, 1, 1, 1, '1699756597054_hinh_nen.jpg', 1, 'img3.img', 5),
(6, 'Overwater Chalet\r\n', 3, 1, 1, 'phòng tiện nghi 1', 20, 1, 1, 1, 1, 1, 1, 1, 1, '1699756609792_hinh4k_.jpg', 1, 'img3.img', 6),
(7, 'Entire vacation home in Thành phố Hội An, Vietnam\r\n', 3, 1, 1, 'phòng tiện nghi 1', 20, 1, 1, 1, 1, 1, 1, 1, 1, '1699756616614_hinhnen_1.jpg', 1, 'img3.img', 9),
(8, 'Entire rental unit in Ba Đình', 3, 1, 1, 'phòng tiện nghi 1', 20, 1, 1, 1, 1, 1, 1, 1, 1, '1699756624791_hinhnen_2.jpg', 1, 'img3.img', 1),
(9, 'Aparment in Nha Trang', 3, 1, 1, 'phòng tiện nghi 1', 20, 1, 1, 1, 1, 1, 1, 1, 1, '1699756635283_hinhnen_3.jpg', 1, 'img3.img', 1),
(10, 'Villa Quy Nhon', 3, 1, 1, 'phòng tiện nghi 1', 20, 1, 1, 1, 1, 1, 1, 1, 1, '1699756642412_hinhnen_4.jpg', 1, 'img3.img', 2),
(11, 'Resort Da Nang', 3, 1, 1, 'phòng tiện nghi 1', 20, 1, 1, 1, 1, 1, 1, 1, 1, '1699756650666_hinhnen_5.jpg', 1, 'img3.img', 3),
(12, 'HomeStay Dalat', 3, 1, 1, 'phòng tiện nghi 1', 20, 1, 1, 1, 1, 1, 1, 1, 1, '1699756660096_pexels-pixabay-63324.jpg', 1, 'img3.img', 4),
(13, 'Hotel Quang Ninh', 3, 1, 1, 'phòng tiện nghi 1', 20, 1, 1, 1, 1, 1, 1, 1, 1, '1699756666188_pexels-pok-rie-2049422.jpg', 1, 'img3.img', 5),
(14, 'Nature Villa Ha Giang', 3, 1, 1, 'phòng tiện nghi 1', 20, 1, 1, 1, 1, 1, 1, 1, 1, '1699756674170_pexels-sergio-souza-5047154.jpg', 1, 'img3.img', 6),
(15, 'villa in Hoi An', 3, 1, 1, 'phòng tiện nghi 1', 20, 1, 1, 1, 1, 1, 1, 1, 1, '1699756680191_pexels-thanhhoa-tran-1488259.jpg', 1, 'img3.img', 6),
(16, 'HomeStay LySon island ', 3, 1, 1, 'phòng tiện nghi 1', 20, 1, 1, 1, 1, 1, 1, 1, 1, '1699756683360_pexels-thanhhoa-tran-1488259.jpg', 1, 'img3.img', 7),
(17, 'Villa Nova Phan Thiet Beach', 3, 1, 1, 'phòng tiện nghi 1', 20, 1, 1, 1, 1, 1, 1, 1, 1, '1699756692158_silk-3705336_1280.jpg', 1, 'img3.img', 8),
(18, 'Villa Nova Ho Tram Beach', 3, 1, 1, 'phòng tiện nghi 1', 20, 1, 1, 1, 1, 1, 1, 1, 1, '1699756704004_119878.jpg', 1, 'img3.img', 2);

INSERT INTO `roomType` (`id`, `type_name`, `icons`) VALUES
(1, 'Thung Lũng Đại Dương', 'https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg');
INSERT INTO `roomType` (`id`, `type_name`, `icons`) VALUES
(2, 'Công viên quốc gia', 'https://a0.muscache.com/pictures/c0a24c04-ce1f-490c-833f-987613930eca.jpg');
INSERT INTO `roomType` (`id`, `type_name`, `icons`) VALUES
(3, 'Hồ bơi', 'https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg');
INSERT INTO `roomType` (`id`, `type_name`, `icons`) VALUES
(4, 'Bãi Biển', 'https://a0.muscache.com/pictures/8e507f16-4943-4be9-b707-59bd38d56309.jpg'),
(5, 'Đảo', 'https://a0.muscache.com/pictures/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg'),
(6, 'Nhà nhỏ', 'https://a0.muscache.com/pictures/35919456-df89-4024-ad50-5fcb7a472df9.jpg'),
(7, 'Đồi núi', 'https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg'),
(8, 'Ven hồ', 'https://a0.muscache.com/pictures/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg'),
(9, 'Hang Động', 'https://a0.muscache.com/pictures/4221e293-4770-4ea8-a4fa-9972158d4004.jpg');

INSERT INTO `users` (`id`, `full_name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `avatar`, `face_app_id`) VALUES
(1, 'Lê A', 'LeA@gmail.com', '1234', '123456769', '1998-08-10', 'male', 'ADMIN', '1699756597054_hinh_nen.jpg', '123');
INSERT INTO `users` (`id`, `full_name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `avatar`, `face_app_id`) VALUES
(2, 'Lê B', 'LeB@gmail.com', '1234', '123456799', '1998-07-08', 'male', 'USER', '1699756563922_119878.jpg', '');
INSERT INTO `users` (`id`, `full_name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `avatar`, `face_app_id`) VALUES
(3, 'Lê C', 'LeC@gmail.com', '1234', '123456789', '1998-06-09', 'male', 'USER', '1699756573901_564826.jpg', '');
INSERT INTO `users` (`id`, `full_name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `avatar`, `face_app_id`) VALUES
(4, 'Lê D', 'LeD@gmail.com', '1234', '123456789', '1998-06-09', 'male', 'USER', '1699756586297_bali-4882642_1280.jpg', ''),
(5, 'string', 'string', '$2b$10$EwUwSVzHD4do17Ll9d9xp.vNPTFycrmzefTYYuZoVObruRmGKZ4Du', 'string', '2023-11-12', 'string', 'USER', '1700039683067_avt_beautiful.jpg', 'string'),
(6, 'Như Ý', 'phantanphu@gmail.com', '$2b$10$go6byZjjpisPYiczy2kKs.OSIFx1iwgv7AQv0f7xVFUXgKeOiBFcq', '0909090909', '1998-11-12', 'true', 'ADMIN', '1699756453426_avt_beautiful.jpg', 'string'),
(7, 'IVONA', 'phantanphu10@gmail.com', '$2b$10$go6byZjjpisPYiczy2kKs.OSIFx1iwgv7AQv0f7xVFUXgKeOiBFcq', '0909090909', '1998-11-12', 'true', 'ADMIN', '1699756586297_bali-4882642_1280.jpg', 'string');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;