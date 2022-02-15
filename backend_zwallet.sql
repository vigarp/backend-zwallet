-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: localhost    Database: backend_zwallet
-- ------------------------------------------------------
-- Server version	8.0.27-0ubuntu0.20.04.1

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
INSERT INTO `transactions` VALUES ('INV-141',927,NULL,'Topup',10000,'2022-02-15 15:56:17',NULL),('INV-165',271,NULL,'Topup',10000,'2022-02-15 15:56:08',NULL),('INV-288',674,NULL,'Topup',10000,'2022-02-15 15:56:24',NULL),('INV-310',324,NULL,'Topup',10000,'2022-02-15 15:56:01',NULL),('INV-481',951,NULL,'Topup',10000,'2022-02-15 16:03:42',NULL),('INV-489',674,NULL,'Topup',10000,'2022-02-15 16:00:40',NULL),('INV-85',417,NULL,'Topup',10000,'2022-02-15 15:55:53',NULL),('INV-914',446,NULL,'Topup',10000,'2022-02-15 15:55:45',NULL);
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
INSERT INTO `users` VALUES (271,'rembo','user','rembo@mail.id','$2b$10$Vek/EcferuzCxF5zzQvJD.UCzpfkLUGPqbR/JZJN71Q9haHi63X6K',NULL,'082178783333','image.jpg','no'),(324,'jarjit','user','jarjit@mail.id','$2b$10$rSXyPxFv1sCHY17m6pEpaelyK4lKv7cEdgFjquMyfT6ZgtqgspVW6',NULL,'081256124320','image.jpg','no'),(417,'fizi','user','fizi@mail.id','$2b$10$XopJsVgiAvwWB6oYmhMpjOwH9UOFevsGlBV4j69OYbOABL.VYRnG6',NULL,'081299430191','image.jpg','no'),(446,'ismail','admin','ismail@mail.id','$2b$10$ZMXz6kCrgOZzTq1mWRGRoeu1wxlppOSW8vE5Uf8bZa8g/rMwB.1oC',NULL,'087866550099','image.jpg','no'),(674,'ehsan','user','ehsan@mail.id','$2b$10$XygzGehbzAZnzy5qbbl75e26Q5VjczZhVMEjrq8JNo6DSzdV2GJFu',NULL,'081288881232','image.jpg','no'),(927,'tokdalang','user','tokdalang@mail.id','$2b$10$VidjHNdohnxlZ6YOPR9FrOS5l0aPFCMgRQ5PSV7WHjbFXP0hiDVVC',NULL,'081290991212','image.jpg','no'),(951,'apin','user','apin@mail.id','$2b$10$rb73cRg5di8iEh6I1.VozetnsGLrgx9XU/yeA5jOav2au0Ob8QQZG',NULL,'081288123909','image.jpg','no');
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
INSERT INTO `wallets` VALUES ('W-190',446,10000),('W-373',417,10000),('W-381',951,10000),('W-682',324,10000),('W-762',271,10000),('W-803',927,10000),('W-953',674,20000);
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

-- Dump completed on 2022-02-15 16:25:01
