CREATE DATABASE  IF NOT EXISTS `muridku` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `muridku`;
-- MySQL dump 10.13  Distrib 8.0.24, for Win64 (x86_64)
--
-- Host: localhost    Database: muridku
-- ------------------------------------------------------
-- Server version	8.0.24

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
-- Table structure for table `faculty`
--

DROP TABLE IF EXISTS `faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faculty` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `institution_id` bigint NOT NULL,
  `code` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL,
  `usr_upd` varchar(100) NOT NULL,
  `dtm_upd` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `institution_id` (`institution_id`),
  CONSTRAINT `faculty_ibfk_1` FOREIGN KEY (`institution_id`) REFERENCES `institution` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `institution`
--

DROP TABLE IF EXISTS `institution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institution` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` varchar(5) NOT NULL,
  `address` varchar(200) DEFAULT NULL,
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL,
  `usr_upd` varchar(100) NOT NULL,
  `dtm_upd` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ktb`
--

DROP TABLE IF EXISTS `ktb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ktb` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `last_meet_dt` datetime DEFAULT NULL,
  `last_material_name` varchar(100) DEFAULT NULL,
  `last_material_chapter` int DEFAULT NULL,
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL,
  `usr_upd` varchar(100) NOT NULL,
  `dtm_upd` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ktbhistory`
--

DROP TABLE IF EXISTS `ktbhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ktbhistory` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ktb_id` bigint NOT NULL,
  `member_id` bigint NOT NULL,
  `is_attending` tinyint NOT NULL,
  `meet_dt` datetime NOT NULL,
  `material_id` bigint NOT NULL,
  `material_name` varchar(100) NOT NULL,
  `material_chapter` int NOT NULL,
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL,
  `usr_upd` varchar(100) NOT NULL,
  `dtm_upd` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ktb_id` (`ktb_id`),
  KEY `member_id` (`member_id`),
  KEY `material_id` (`material_id`),
  CONSTRAINT `ktbhistory_ibfk_1` FOREIGN KEY (`ktb_id`) REFERENCES `ktb` (`id`),
  CONSTRAINT `ktbhistory_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  CONSTRAINT `ktbhistory_ibfk_3` FOREIGN KEY (`material_id`) REFERENCES `material` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ktbmember`
--

DROP TABLE IF EXISTS `ktbmember`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ktbmember` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ktb_id` bigint NOT NULL,
  `member_id` bigint NOT NULL,
  `is_pktb` tinyint NOT NULL,
  `is_active` tinyint NOT NULL,
  `old_ktb_id` bigint DEFAULT NULL,
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL,
  `usr_upd` varchar(100) NOT NULL,
  `dtm_upd` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ktb_id` (`ktb_id`),
  KEY `member_id` (`member_id`),
  KEY `old_ktb_id` (`old_ktb_id`),
  CONSTRAINT `ktbmember_ibfk_1` FOREIGN KEY (`ktb_id`) REFERENCES `ktb` (`id`),
  CONSTRAINT `ktbmember_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  CONSTRAINT `ktbmember_ibfk_3` FOREIGN KEY (`old_ktb_id`) REFERENCES `ktb` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `logapi`
--

DROP TABLE IF EXISTS `logapi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logapi` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `request_id` varchar(200) NOT NULL,
  `url` varchar(500) NOT NULL,
  `method_name` varchar(200) NOT NULL,
  `param_input` varchar(2000) NOT NULL,
  `response_status` int NOT NULL,
  `param_output` varchar(2000) NOT NULL,
  `error_message` varchar(2000) DEFAULT NULL,
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6534 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `material`
--

DROP TABLE IF EXISTS `material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `chapter_count` int NOT NULL,
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL,
  `usr_upd` varchar(100) NOT NULL,
  `dtm_upd` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `address` varchar(200) DEFAULT NULL,
  `birth_dt` datetime DEFAULT NULL,
  `birth_place` varchar(100) DEFAULT NULL,
  `mobile_phn` varchar(20) DEFAULT NULL,
  `institution_id` bigint DEFAULT NULL,
  `faculty_id` bigint DEFAULT NULL,
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL,
  `usr_upd` varchar(100) NOT NULL,
  `dtm_upd` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `institution_id` (`institution_id`),
  KEY `faculty_id` (`faculty_id`),
  CONSTRAINT `member_ibfk_1` FOREIGN KEY (`institution_id`) REFERENCES `institution` (`id`),
  CONSTRAINT `member_ibfk_2` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `memberinstitutionhist`
--

DROP TABLE IF EXISTS `memberinstitutionhist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `memberinstitutionhist` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `member_id` bigint NOT NULL,
  `institution_id` bigint NOT NULL,
  `faculty_id` bigint DEFAULT NULL,
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL,
  `usr_upd` varchar(100) NOT NULL,
  `dtm_upd` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `member_id` (`member_id`),
  KEY `institution_id` (`institution_id`),
  KEY `faculty_id` (`faculty_id`),
  CONSTRAINT `memberinstitutionhist_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  CONSTRAINT `memberinstitutionhist_ibfk_2` FOREIGN KEY (`institution_id`) REFERENCES `institution` (`id`),
  CONSTRAINT `memberinstitutionhist_ibfk_3` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL,
  `usr_upd` varchar(100) NOT NULL,
  `dtm_upd` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `member_id` bigint NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `is_active` tinyint NOT NULL,
  `is_logged_in` tinyint NOT NULL DEFAULT '0',
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL,
  `usr_upd` varchar(100) NOT NULL,
  `dtm_upd` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `userrole`
--

DROP TABLE IF EXISTS `userrole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userrole` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `role_id` bigint NOT NULL,
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL,
  `usr_upd` varchar(100) NOT NULL,
  `dtm_upd` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `userrole_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `userrole_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-20 10:35:08
