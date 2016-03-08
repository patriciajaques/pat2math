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
-- Table structure for table `set_of_tasks`
--

DROP TABLE IF EXISTS `set_of_tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `set_of_tasks` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` longtext NOT NULL,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `set_of_tasks`
--

LOCK TABLES `set_of_tasks` WRITE;
/*!40000 ALTER TABLE `set_of_tasks` DISABLE KEYS */;
INSERT INTO `set_of_tasks` VALUES (1,'Tutorial','Tour Interativo'),(2,'Desc Plano de aula 1','Plano de aula 1'),(3,'edadfadda','Plano de aula 2'),(4,'Observe o exemplo e resolva as equações, sendo  x um número racional.','Plano de aula 3'),(5,'Resolva as equações do 1º grau com muita atenção.','Plano de aula 4'),(6,'Aplique a propriedade distributiva corretamente e após calcule as equações do 1º grau com muita atenção.','Plano de aula 5'),(7,'Resolva as equações, sendo x um número racional.','Plano de aula 6'),(8,'Resolva as equações, com muita atenção.','Plano de aula 7'),(9,'Tour para aprendizado do sistema.','Tour'),(10,'Resolva as equações do 1º grau.','Plano de aula 8'),(11,'Resolva as equações do 1º grau.','Plano de aula 9'),(12,'Resolva as equações','Plano de aula 10'),(13,'Resolva as equações','Plano de aula 11'),(14,'Resolva as equações','Plano de aula 12'),(15,'Resolva as equações','Plano de aula 13'),(16,'Resolva as equações','Plano de aula 14'),(17,'Resolva as equações','Plano de aula 15'),(18,'Resolva as equações','Plano de aula 16'),(19,'Resolva as equações','Plano de aula 17'),(20,'Resolva as equações','Plano de aula 18'),(21,'Resolva as equações','Plano de aula 19');
/*!40000 ALTER TABLE `set_of_tasks` ENABLE KEYS */;
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
