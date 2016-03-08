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
-- Table structure for table `material_instrucional`
--

DROP TABLE IF EXISTS `material_instrucional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `material_instrucional` (
  `tipo` varchar(31) NOT NULL,
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(200) NOT NULL,
  `is_default` tinyint(1) DEFAULT NULL,
  `position` bigint(20) DEFAULT NULL,
  `equacao` varchar(150) DEFAULT NULL,
  `url` varchar(200) DEFAULT NULL,
  `explanacao` varchar(200) DEFAULT NULL,
  `id_grau` bigint(20) DEFAULT NULL,
  `id_habilidade` bigint(20) DEFAULT NULL,
  `id_nivel` bigint(20) DEFAULT NULL,
  `topico_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_8cbtn5g0j6qo5f45hw5c5e8dw` (`descricao`),
  UNIQUE KEY `UK_358ip33is93baeluxk05p5m77` (`position`),
  UNIQUE KEY `UK_i92yl65dp43u6a4107nnv7is` (`equacao`),
  UNIQUE KEY `UK_qyopkkwuqfjnpl2xrfcph36nv` (`url`),
  UNIQUE KEY `UK_js8pckot8wq23tb40awrnjxgs` (`explanacao`),
  KEY `FK_9glj797teg1ycoap2g4berg8g` (`id_grau`),
  KEY `FK_s35rbj0tdvgbw4xorlgpwrh3c` (`id_habilidade`),
  KEY `FK_sdxi5wpt6x62why7sh1orqyae` (`id_nivel`),
  KEY `FK_2kbxod4wkxcenb7u25t1peeuq` (`topico_id`),
  CONSTRAINT `FK_2kbxod4wkxcenb7u25t1peeuq` FOREIGN KEY (`topico_id`) REFERENCES `topico` (`id`),
  CONSTRAINT `FK_9glj797teg1ycoap2g4berg8g` FOREIGN KEY (`id_grau`) REFERENCES `grau_equacao` (`id`),
  CONSTRAINT `FK_s35rbj0tdvgbw4xorlgpwrh3c` FOREIGN KEY (`id_habilidade`) REFERENCES `habilidade` (`id`),
  CONSTRAINT `FK_sdxi5wpt6x62why7sh1orqyae` FOREIGN KEY (`id_nivel`) REFERENCES `nivel_dificuldade` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material_instrucional`
--

LOCK TABLES `material_instrucional` WRITE;
/*!40000 ALTER TABLE `material_instrucional` DISABLE KEYS */;
/*!40000 ALTER TABLE `material_instrucional` ENABLE KEYS */;
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
