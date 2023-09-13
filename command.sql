CREATE TABLE `users` (
    `id` int NOT NULL,
    `email` varchar(64) DEFAULT NULL,
    `password` varchar(100) DEFAULT NULL,
    `username` varchar(64) DEFAULT NULL,
    `pincode` varchar(8) DEFAULT NULL,
    `firstname` varchar(120) DEFAULT NULL,
    `lastname` varchar(120) DEFAULT NULL,
    `gender` varchar(8) DEFAULT NULL,
    `phone` varchar(16) DEFAULT NULL,
    `role` varchar(32) NOT NULL DEFAULT 'user',
    `picture` varchar(500) NOT NULL DEFAULT 'default-no-pict.jpg',
    `isVerified` boolean NOT NULL DEFAULT false,
    PRIMARY KEY (`id`)
);

INSERT INTO `users` (id, email, password, username, firstname, lastname, gender) VALUES (007, 'vigar.ext@gmail.com', 123456, 'vigarp', 'Vigar', 'Rivai Putra', 'male');