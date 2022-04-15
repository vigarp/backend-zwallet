-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: 44.202.197.206    Database: fazz3vigar_backend_zwallet
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `invoice` varchar(12) NOT NULL,
  `id_sender` int DEFAULT NULL,
  `id_receiver` int DEFAULT NULL,
  `type` varchar(12) DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `notes` text,
  PRIMARY KEY (`invoice`),
  KEY `fk_transactions_sender` (`id_sender`),
  KEY `fk_transactions_receiver` (`id_receiver`),
  CONSTRAINT `fk_transactions_receiver` FOREIGN KEY (`id_receiver`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_transactions_sender` FOREIGN KEY (`id_sender`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES ('INV-168',657,NULL,'Topup',20000,'2022-03-25 16:37:31','Topup with Rp. 20000'),('INV-209',657,869,'Transfer',10000,'2022-03-28 06:27:47',NULL),('INV-219',869,129,'Transfer',5000,'2022-03-29 04:45:16',NULL),('INV-371',657,NULL,'Topup',150000,'2022-03-25 16:45:18','Topup with Rp. 150000'),('INV-389',129,657,'Transfer',25000,'2022-03-28 03:58:06',NULL),('INV-470',869,657,'Transfer',5500,'2022-04-04 10:36:23',NULL),('INV-732',657,869,'Transfer',5000,'2022-03-25 16:38:36',NULL),('INV-773',129,NULL,'Topup',100000,'2022-03-25 16:34:40','Topup with Rp. 100000'),('INV-827',869,NULL,'Topup',121212,'2022-04-04 10:38:39','Topup with Rp. 121212'),('INV-916',869,NULL,'Topup',100000,'2022-03-25 16:19:26','Topup with Rp. 100000');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(64) DEFAULT NULL,
  `role` varchar(32) NOT NULL DEFAULT 'user',
  `email` varchar(64) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `pincode` varchar(8) DEFAULT NULL,
  `phone` varchar(16) DEFAULT NULL,
  `picture` varchar(500) NOT NULL DEFAULT 'image.jpg',
  `verified` varchar(16) NOT NULL DEFAULT 'no',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (129,'Atok Dalang','user','tokdalang@mail.id','$2a$10$47UFATwTe3pGTO1ZL7yDhujXPcNqfBDTMSTTE/1uUqlBOuruh0SBm',NULL,'081291201909','https://i.pinimg.com/originals/c7/a2/dc/c7a2dcf76cb9834db0027688bd458d8c.jpg','no'),(657,'Abang Sally','user','abangsally@mail.id','$2a$10$EWLDVIEpBy.D9NMlv0n4duQQS8lj4vAZ01m6nEuGoQioNh1tzgaka',NULL,'081277891221','https://docplayer.info/docs-images/61/46317721/images/72-2.png','no'),(869,'Ismail bin Mail','user','ismail@mail.id','$2a$10$CoU2tlZYc9JsvqUDxVuDf.UFql7ODLsASmraBlQlrIhrKt5iH3UM6',NULL,NULL,'https://i.pinimg.com/236x/4a/64/2e/4a642e820b40e7f5b615ec88d24ec08e.jpg','no');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wallets`
--

DROP TABLE IF EXISTS `wallets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wallets` (
  `id` varchar(12) NOT NULL,
  `id_user` int NOT NULL,
  `balance` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_wallets` (`id_user`),
  CONSTRAINT `fk_wallets` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallets`
--

LOCK TABLES `wallets` WRITE;
/*!40000 ALTER TABLE `wallets` DISABLE KEYS */;
INSERT INTO `wallets` VALUES ('W-103',869,225712),('W-447',657,185500),('W-80',129,80000);
/*!40000 ALTER TABLE `wallets` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-15  6:04:46
