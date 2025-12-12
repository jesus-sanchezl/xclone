-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: simpletwitter
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Dumping data for table `blocked_users`
--

LOCK TABLES `blocked_users` WRITE;
/*!40000 ALTER TABLE `blocked_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `blocked_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `comment_likes`
--

LOCK TABLES `comment_likes` WRITE;
/*!40000 ALTER TABLE `comment_likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,2,6,'Te está quedando genial Jesús',NULL,'2025-12-11 16:12:43'),(2,2,14,'Comida rica = motivación extra',NULL,'2025-12-11 16:17:04'),(3,3,6,'Buen ritmo tío',NULL,'2025-12-11 16:19:34'),(4,3,18,'Este vídeo vende',NULL,'2025-12-11 16:20:01'),(5,1,7,'Muy buen gusto',NULL,'2025-12-11 16:29:27');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `hashtags`
--

LOCK TABLES `hashtags` WRITE;
/*!40000 ALTER TABLE `hashtags` DISABLE KEYS */;
/*!40000 ALTER TABLE `hashtags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `notification_settings`
--

LOCK TABLES `notification_settings` WRITE;
/*!40000 ALTER TABLE `notification_settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,1,'like_tweet',2,6,NULL,NULL,'2025-12-11 15:10:32'),(2,3,'like_tweet',2,11,NULL,NULL,'2025-12-11 15:10:51'),(3,4,'like_tweet',2,14,NULL,NULL,'2025-12-11 15:11:11'),(4,1,'like_tweet',2,18,NULL,NULL,'2025-12-11 15:11:26'),(5,1,'like_tweet',2,1,NULL,NULL,'2025-12-11 15:11:42'),(6,1,'retweet',2,6,NULL,NULL,'2025-12-11 15:11:57'),(7,1,'reply',2,6,NULL,NULL,'2025-12-11 15:12:43'),(8,4,'retweet',2,14,NULL,NULL,'2025-12-11 15:13:14'),(9,4,'reply',2,14,NULL,NULL,'2025-12-11 15:17:04'),(10,4,'like_tweet',2,4,NULL,NULL,'2025-12-11 15:17:49'),(11,1,'like_tweet',3,6,NULL,NULL,'2025-12-11 15:18:34'),(12,2,'like_tweet',3,7,NULL,NULL,'2025-12-11 15:18:48'),(13,1,'like_tweet',3,18,NULL,NULL,'2025-12-11 15:19:10'),(14,1,'reply',3,6,NULL,NULL,'2025-12-11 15:19:34'),(15,1,'reply',3,18,NULL,NULL,'2025-12-11 15:20:01'),(16,1,'like_tweet',3,15,NULL,NULL,'2025-12-11 15:20:30'),(17,1,'like_tweet',4,6,NULL,NULL,'2025-12-11 15:23:19'),(18,3,'like_tweet',4,11,NULL,NULL,'2025-12-11 15:23:37'),(19,3,'retweet',4,11,NULL,NULL,'2025-12-11 15:23:54'),(20,2,'like_tweet',1,7,NULL,NULL,'2025-12-11 15:25:54'),(21,3,'like_tweet',1,11,NULL,NULL,'2025-12-11 15:26:01'),(22,4,'like_tweet',1,14,NULL,NULL,'2025-12-11 15:26:11'),(23,2,'like_tweet',1,2,NULL,NULL,'2025-12-11 15:26:27'),(24,2,'retweet',1,13,NULL,NULL,'2025-12-11 15:26:41'),(25,2,'reply',1,7,NULL,NULL,'2025-12-11 15:29:27'),(26,3,'like_tweet',1,16,NULL,NULL,'2025-12-11 15:30:14');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `privacy_settings`
--

LOCK TABLES `privacy_settings` WRITE;
/*!40000 ALTER TABLE `privacy_settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `privacy_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `retweets`
--

LOCK TABLES `retweets` WRITE;
/*!40000 ALTER TABLE `retweets` DISABLE KEYS */;
INSERT INTO `retweets` VALUES (1,2,6,'2025-12-11 15:11:57'),(3,4,11,'2025-12-11 15:23:54'),(4,1,13,'2025-12-11 15:26:41');
/*!40000 ALTER TABLE `retweets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tweet_hashtags`
--

LOCK TABLES `tweet_hashtags` WRITE;
/*!40000 ALTER TABLE `tweet_hashtags` DISABLE KEYS */;
/*!40000 ALTER TABLE `tweet_hashtags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tweet_likes`
--

LOCK TABLES `tweet_likes` WRITE;
/*!40000 ALTER TABLE `tweet_likes` DISABLE KEYS */;
INSERT INTO `tweet_likes` VALUES (1,2,6,'2025-12-11 16:10:32'),(2,2,11,'2025-12-11 16:10:51'),(3,2,14,'2025-12-11 16:11:11'),(4,2,18,'2025-12-11 16:11:26'),(5,2,1,'2025-12-11 16:11:42'),(6,2,4,'2025-12-11 16:17:49'),(7,3,6,'2025-12-11 16:18:34'),(8,3,7,'2025-12-11 16:18:48'),(9,3,18,'2025-12-11 16:19:10'),(10,3,15,'2025-12-11 16:20:30'),(11,4,6,'2025-12-11 16:23:19'),(12,4,11,'2025-12-11 16:23:37'),(13,1,7,'2025-12-11 16:25:54'),(14,1,11,'2025-12-11 16:26:01'),(15,1,14,'2025-12-11 16:26:11'),(16,1,2,'2025-12-11 16:26:27'),(17,1,16,'2025-12-11 16:30:14');
/*!40000 ALTER TABLE `tweet_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tweets`
--

LOCK TABLES `tweets` WRITE;
/*!40000 ALTER TABLE `tweets` DISABLE KEYS */;
INSERT INTO `tweets` VALUES (1,1,'Hay días de foco total y días de caos. Lo importante es seguir moviéndose.',NULL,'2025-12-11 11:08:21','2025-12-11 11:08:21'),(2,2,'Cuando algo que diseñaste empieza a cobrar vida, es una pasada ✨',NULL,'2025-12-11 11:12:25','2025-12-11 11:12:25'),(3,3,'Hay días que simplemente salen redondos.',NULL,'2025-12-11 11:15:13','2025-12-11 11:15:13'),(4,4,'Salir a correr ayuda a ordenar la cabeza',NULL,'2025-12-11 11:19:01','2025-12-11 11:19:01'),(6,1,'Un paso más. Todo suma','s6LIK61tNjbgTanlBXHK.webp','2025-12-11 11:37:59','2025-12-11 11:37:59'),(7,2,'Inspiración del día.','aEX7stsyG9FnPYu3Xp5W.webp','2025-12-11 12:06:39','2025-12-11 12:06:39'),(11,3,'Cuando algo funciona a la primera','l5gLqgnCr4D7vCA7D3LW.webp','2025-12-11 12:34:55','2025-12-11 12:34:55'),(12,1,'Refrescar la cabeza con un café y volver con otra energía',NULL,'2025-12-11 12:35:45','2025-12-11 12:35:45'),(13,2,'El 80% del frontend es ajustar un padding de 8 a 12px…',NULL,'2025-12-11 12:36:45','2025-12-11 12:36:45'),(14,4,'Hoy ha tocado cocinar algo rico',NULL,'2025-12-11 12:37:18','2025-12-11 12:37:18'),(15,1,'La constancia vale más que cualquier racha de inspiración',NULL,'2025-12-11 12:37:39','2025-12-11 12:37:39'),(16,3,'Consejo del día: los logs nunca mienten',NULL,'2025-12-11 12:38:14','2025-12-11 12:38:14'),(18,1,'Vista rápida del avance','03wygUn03ypxkkcnCJ9h.mp4','2025-12-11 15:41:35','2025-12-11 15:41:35');
/*!40000 ALTER TABLE `tweets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Jesús Sánchez','jesusdev','jesus@mail.com','$2b$10$bKFtkpATBLujRwP8Xb52iOtvH9EAJER9.SavkQC2pni6qgiQ4V5P.','BnixFSC4GKXiZgo0B3oS.webp','IALdBfpRfXWBdryNjRfS.webp','Fullstack Developer. Aprendiendo, construyendo y rompiendo cosas hasta que funcionan.','Madrid','1995-03-15',NULL,NULL,'2025-12-11 10:21:41','2025-12-11 11:07:38','light'),(2,'Laura Martín','frontendlaura','laura@mail.com','$2b$10$UR4GBhA83SKc049YWc0w8O7c2Qj.InmaknoKarNR3i7flmeC6nd6e','9DJZqR88UVbzlfo56dS9.webp','CDM13Y4P6R5RBTLQbbx3.webp','Frontend Developer & UI Lover. MUI enjoyer.','Madrid','1998-07-02',NULL,NULL,'2025-12-11 10:22:45','2025-12-11 11:11:05','light'),(3,'Max','backendmax','max@mail.com','$2b$10$kWxpW0/SXut0V7kDwLcg0er6gA9EH7tysjn1ilEOY7J5abTbA0Qn6','jogh9jRvdH7pJiYTCDJi.webp','mYv0zvtJml8OeD1lGSMc.webp','Backend first. Node.js, SQL, optimización y café.','Barcelona','1990-11-21',NULL,NULL,'2025-12-11 11:03:28','2025-12-11 11:14:50','light'),(4,'Víctor González','fit_vic','victor@mail.com','$2b$10$fabUZo83vasNwFIYFZI4DO6teGHLTD52nTlSKO26TFWUN9f2ETGWy','dO09wTdsgTaHfrTw2YQM.webp','RFRE6xUegsCIgnL0KcpH.webp','Runner, gym lover y amateur cook.','En algún lugar del mundo','1989-04-05',NULL,NULL,'2025-12-11 11:04:30','2025-12-11 11:28:54','light');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-11 16:58:08
