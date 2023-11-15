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
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `room_id` int NOT NULL,
  `user_id` int NOT NULL,
  `date_comment` date DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `rate` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `room_id` (`room_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `location` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name_locate` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `nation` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  PRIMARY KEY (`id`),
  KEY `locate_id` (`locate_id`),
  CONSTRAINT `room_ibfk_1` FOREIGN KEY (`locate_id`) REFERENCES `location` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `bookingRoom` (`id`, `room_id`, `user_id`, `date_on`, `date_out`, `number_guest`) VALUES
(44, 1, 4, '2023-11-06', '2023-12-10', 2);
INSERT INTO `bookingRoom` (`id`, `room_id`, `user_id`, `date_on`, `date_out`, `number_guest`) VALUES
(45, 2, 2, '2023-11-06', '2023-12-10', 2);
INSERT INTO `bookingRoom` (`id`, `room_id`, `user_id`, `date_on`, `date_out`, `number_guest`) VALUES
(46, 2, 3, '2023-11-11', '2023-11-16', 3);

INSERT INTO `comments` (`id`, `room_id`, `user_id`, `date_comment`, `content`, `rate`) VALUES
(1, 1, 1, '2023-10-10', 'bình luận phòng 1 nha', 5);
INSERT INTO `comments` (`id`, `room_id`, `user_id`, `date_comment`, `content`, `rate`) VALUES
(2, 2, 2, '2023-10-10', 'bình luận phòng 2 nha', 5);
INSERT INTO `comments` (`id`, `room_id`, `user_id`, `date_comment`, `content`, `rate`) VALUES
(3, 3, 1, '2023-10-11', 'bình luận phòng 3 nha', 5);
INSERT INTO `comments` (`id`, `room_id`, `user_id`, `date_comment`, `content`, `rate`) VALUES
(20, 2, 6, '2023-11-06', 'bình thường quá đi đã chỉnh sửa ', 3),
(21, 1, 8, '2023-11-06', 'quá xuất sắc shop ơi ', 5);

INSERT INTO `location` (`id`, `name_locate`, `province`, `nation`, `photo`) VALUES
(1, 'Bùi hữu nghĩa, quận Bình Thạnh', 'Thành Phố Hồ Chí Minh', 'Việt Nam', '1699344710871_hinh_nen.jpg');
INSERT INTO `location` (`id`, `name_locate`, `province`, `nation`, `photo`) VALUES
(2, 'Quang Trung , quận Gò Vấp', 'Thành Phố Hồ Chí Minh', 'Việt Nam', 'bhn.img');
INSERT INTO `location` (`id`, `name_locate`, `province`, `nation`, `photo`) VALUES
(3, '100 lạc long quân, quận 3', 'Thành Phố Đà Nẵng', 'Việt Nam', 'acs.img');
INSERT INTO `location` (`id`, `name_locate`, `province`, `nation`, `photo`) VALUES
(5, '10 Phù Đổng Thiên Vương, dalat', 'Lâm Đồng', 'Việt Nam', 'dalat.png'),
(6, '10 hùng vương, Quận Hoàn Kiếm', 'Hà Nội', 'Việt Nam', 'hanoi.png'),
(7, 'Quốc lộ l, Hà Giang', 'Hà Giang', 'Việt Nam', 'hagiang.png'),
(8, '10 hùng vương, TP Hội An', 'Quảng Nam', 'Việt Nam', 'hoian.png'),
(9, '10 hùng vương, TP Vũng Tàu', 'Bà Rịa Vũng Tàu', 'Việt Nam', 'vungtau.png');

INSERT INTO `photoRoom` (`id`, `room_id`, `photo_1`, `photo_2`, `photo_3`, `photo_4`, `photo_5`) VALUES
(1, 1, 'img1.pgn', 'img2.pgn', 'img3.pgn', 'img4.pgn', 'img5.pgn');


INSERT INTO `room` (`id`, `name_room`, `guest`, `bedroom`, `bathroom`, `descr`, `price`, `wash_machine`, `iron_cloth`, `television`, `air_conditioner`, `wifi`, `kitchen`, `park`, `pool`, `photo`, `locate_id`) VALUES
(1, 'HomeStay view đẹp', 3, 1, 1, 'phòng tiện nghi 1', 20, 1, 1, 1, 1, 1, 1, 1, 1, '1699346149976_Doc-chin-khoanh-Ha-Giang.jpg', 1);
INSERT INTO `room` (`id`, `name_room`, `guest`, `bedroom`, `bathroom`, `descr`, `price`, `wash_machine`, `iron_cloth`, `television`, `air_conditioner`, `wifi`, `kitchen`, `park`, `pool`, `photo`, `locate_id`) VALUES
(2, 'HomeStay view đẹp', 3, 1, 1, 'phòng tiện nghi 1', 20, 1, 1, 1, 1, 1, 1, 1, 1, 'abc1.img', 2);
INSERT INTO `room` (`id`, `name_room`, `guest`, `bedroom`, `bathroom`, `descr`, `price`, `wash_machine`, `iron_cloth`, `television`, `air_conditioner`, `wifi`, `kitchen`, `park`, `pool`, `photo`, `locate_id`) VALUES
(3, 'HomeStay view đẹp', 3, 1, 1, 'phòng tiện nghi 1', 20, 1, 1, 1, 1, 1, 1, 1, 1, 'abc1.img', 1);
INSERT INTO `room` (`id`, `name_room`, `guest`, `bedroom`, `bathroom`, `descr`, `price`, `wash_machine`, `iron_cloth`, `television`, `air_conditioner`, `wifi`, `kitchen`, `park`, `pool`, `photo`, `locate_id`) VALUES
(17, 'HomeStay Biển', 2, 2, 2, 'phòng tiện nghi 3', 40, 1, 1, 1, 1, 1, 1, 1, 1, 'china.img', 1),
(18, 'homestay Dalat', 4, 2, 2, 'view đẹp chụp hình xuất sắc', 50, 1, 1, 1, 1, 1, 1, 1, 1, 'dala.img', 1),
(19, 'khách sạn Hồ Gươm', 2, 1, 1, 'tiện nghi', 20, 1, 1, 1, 1, 1, 0, 0, 0, 'hanoi.img', 7),
(20, 'khách sạn Hà Nội', 2, 1, 1, 'view hồ hoàn kiếm', 20, 1, 1, 1, 1, 1, 0, 0, 0, 'hanoi.img', 2);

INSERT INTO `users` (`id`, `full_name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `avatar`, `face_app_id`) VALUES
(1, 'Lê A', 'LeA@gmail.com', '1234', '123456769', '1998-08-10', 'male', 'ADMIN', 'ADMIN', '123');
INSERT INTO `users` (`id`, `full_name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `avatar`, `face_app_id`) VALUES
(2, 'Lê B', 'LeB@gmail.com', '1234', '123456799', '1998-07-08', 'male', 'ADMIN', 'USER', '');
INSERT INTO `users` (`id`, `full_name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `avatar`, `face_app_id`) VALUES
(3, 'Lê C', 'LeC@gmail.com', '1234', '123456789', '1998-06-09', 'male', 'ADMIN', 'USER', '');
INSERT INTO `users` (`id`, `full_name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `avatar`, `face_app_id`) VALUES
(4, 'Lê D', 'LeD@gmail.com', '1234', '123456789', '1998-06-09', 'male', 'USER', 'USER', ''),
(6, 'string', 'string', '$2b$10$diSLG0HEo1xAYb248ulCfObkRlAQ2KHfBjC6hOxKvme/sF6kUrHJi', 'string', '2023-11-06', 'string', 'ADMIN', '1699364671545_hinhnen_1.jpg', 'string'),
(7, 'string', 'Phant@gmail.com', '$2b$10$a7GexOkwQUm.Plm9bc3/S.S/s.iAweW4wBrIi1z8drjhGo2YXI8HS', 'string', '2023-11-06', 'string', 'USER', 'string', 'string'),
(8, 'phan tấn phú', 'tanphu@gmail.com', '$2b$10$DcMWVuPcY5zKbSAqffr5uei6I6IXJ8hLffmjIM4oCfdqBgVJJjbhm', '0909090909', '1998-11-06', 'male', 'USER', '1699338037837_tanphu2_.jpg', 'string'),
(9, 'string1', 'string1', '$2b$10$sLgNCZj0PLt50TF1OjkW2eNN3frIotQibWgpztO4fhbi1Y4Zh1f7q', 'string', '2023-11-07', 'string', 'USER', 'string', 'string'),
(10, 'string2', 'string2', '$2b$10$ZLczSu3eH6p12uWhMsEy6ujzz7GyfHunpe9yyK2Z1.BWsM/dKHDCm', 'string', '2023-11-07', 'string', 'USER', 'string', 'string'),
(11, 'string3', 'string4', '$2b$10$yN6OqwNg1GPfZhloFvv2iONDhzMXxhmmHFgvV1ObMIxaj.ju8sNGm', 'string', '2023-11-07', 'string', 'USER', 'string', 'string'),
(12, 'string5', 'string5', '$2b$10$EGSqYMYu6p.rFqgri8uB3.ylKL1BKBCkGBdVTXQp8lsavjjhsNYjO', 'string', '2023-11-07', 'string', 'USER', 'string', 'string'),
(13, 'string6', 'string6', '$2b$10$c5dLumfi.q2/3836Xy/Cjesr3igOKZ8YCf49oYE1e8hiv7lm7iqYy', 'string', '2023-11-07', 'string', 'USER', 'string', 'string'),
(14, 'string7', 'string7', '$2b$10$Mxom8SSw3lqLfJ0hRdHRgOHlPXq/X9R2aFKZ0gm2nQpvVrMVdfDk6', 'string', '2023-11-07', 'string', 'USER', 'string', 'string'),
(15, 'string8', 'string8', '$2b$10$W2keg943xf2he7iIv/T2l.VA.WqF71UMQAq57UilFChpU.JqlrI3q', 'string', '2023-11-07', 'string', 'USER', 'string', 'string'),
(16, 'string9', 'string9', '$2b$10$GeCkDrEx00urGhQTssWW8uB6xCGGugwvnCPg5kcrEwPNdkObq48r2', 'string', '2023-11-07', 'string', 'USER', 'string', 'string'),
(17, 'string10', 'string10', '$2b$10$6tRooTf3TmyaXnyEIOGIpOUt9zdAk3XioOuTP88.rsHcwrRZ8xwuW', 'string', '2023-11-07', 'string', 'USER', 'string', 'string'),
(18, 'string11', 'string11', '$2b$10$X47I9F2edBw73nOwTMFWsu03bW3cWnkcTqojnO9Q0YdKnH2NudhIm', 'string', '2023-11-07', 'string', 'USER', 'string', 'string'),
(19, 'string12', 'string12', '$2b$10$8HTew8tD2XGbSu8Mdhy3EeV/3n7GBOPbI.gvNWwvFBv1mwXjdtiZy', 'string', '2023-11-07', 'string', 'USER', 'string', 'string'),
(20, 'string13', 'string13', '$2b$10$tEuPo78cOgwRcP8ldRKZFOF.dPDAKKK/kOXak7Wqhio3q81.ecZ7y', 'string', '2023-11-07', 'string', 'ADMIN', 'string', 'string'),
(21, 'string14', 'string14', '$2b$10$lMscKplQdDdSEfk2PD4LVekTbIZHog/CB8jO5ow8hakin1O1Vs.jG', 'string', '2023-11-07', 'string', 'ADMIN', 'string', 'string'),
(22, 'string15', 'string15', '$2b$10$T4HcbU0kHpwT8JB3z86VZuJdz7qm7I75S0g4lMI84/hbgC0tEjiei', 'string', '2023-11-07', 'string', 'U', 'string', 'string');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;