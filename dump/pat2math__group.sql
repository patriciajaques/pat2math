CREATE DATABASE  IF NOT EXISTS `pat2math` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `pat2math`;
-- MySQL dump 10.13  Distrib 5.5.47, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: pat2math
-- ------------------------------------------------------
-- Server version	5.5.47-0ubuntu0.12.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_group`
--

DROP TABLE IF EXISTS `_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_group` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` longtext NOT NULL,
  `maxOfStudents` varchar(255) DEFAULT NULL,
  `name` varchar(30) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `id_plan` bigint(20) DEFAULT NULL,
  `id_school` bigint(20) DEFAULT NULL,
  `id_teacher` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_l9m58xg5qhk87ana4t6y60pc0` (`id_plan`),
  KEY `FK_gqgjf6qn7ruwdkaqcs00xd94p` (`id_school`),
  KEY `FK_ss4gu337jj0ndp2uf0bpuvf4a` (`id_teacher`),
  CONSTRAINT `FK_gqgjf6qn7ruwdkaqcs00xd94p` FOREIGN KEY (`id_school`) REFERENCES `school` (`id`),
  CONSTRAINT `FK_l9m58xg5qhk87ana4t6y60pc0` FOREIGN KEY (`id_plan`) REFERENCES `plan` (`id`),
  CONSTRAINT `FK_ss4gu337jj0ndp2uf0bpuvf4a` FOREIGN KEY (`id_teacher`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_group`
--

LOCK TABLES `_group` WRITE;
/*!40000 ALTER TABLE `_group` DISABLE KEYS */;
INSERT INTO `_group` VALUES (1,'Desc UNISINOS','','Unisinos','',1,NULL,1),(2,'Turma 72 - Experimento',NULL,'São Luiz Turma 72 Experimento',NULL,1,NULL,1),(3,'São Luiz Turma 72 Controle',NULL,'São Luiz Turma 72 Controle',NULL,1,NULL,1),(4,'São Luiz Turma 71 Experimento',NULL,'São Luiz Turma 71 Experimento',NULL,1,NULL,1),(5,'São Luiz Turma 71 Controle',NULL,'São Luiz Turma 71 Controle',NULL,1,NULL,1);
/*!40000 ALTER TABLE `_group` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-03-08 17:25:53
