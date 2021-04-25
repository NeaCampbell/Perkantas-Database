-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: muridku
-- ------------------------------------------------------
-- Server version	8.0.23

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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

--
-- Dumping events for database 'muridku'
--

--
-- Dumping routines for database 'muridku'
--
/*!50003 DROP PROCEDURE IF EXISTS `ActivateUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ActivateUser`( IN email VARCHAR(100) )
BEGIN
	UPDATE muridku.`user`
    SET is_active = 1
    WHERE email = email;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetActiveUserByEmail` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetActiveUserByEmail`( IN email VARCHAR(100) )
BEGIN
	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
	SELECT * FROM muridku.`user` WHERE email = email AND is_active = 1;
	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetAktbsByKtbId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAktbsByKtbId`( IN ktb_id BIGINT )
BEGIN
	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
	SELECT mbr.*
    FROM muridku.`member` AS mbr
    JOIN muridku.`ktbmember` AS ktbmbr ON ktbmbr.`member_id` = mbr.`id`
    WHERE ktbmbr.`ktb_id` = ktb_id
    AND ktbmbr.`is_active` = 1
    AND ktbmbr.`is_pktb` = 0;
	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetAllFaculty` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllFaculty`()
BEGIN
	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
	SELECT * FROM muridku.`faculty`;
	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetAllInstitution` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllInstitution`()
BEGIN
	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
	SELECT * FROM muridku.`institution`;
	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetAllUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllUser`()
BEGIN
	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
	SELECT * FROM muridku.`user`;
	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetFacultyById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetFacultyById`(IN id BIGINT)
BEGIN
	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
	SELECT * FROM muridku.`faculty` WHERE `id` = id;
	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetFacultyByInstitutionId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetFacultyByInstitutionId`(IN institution_id BIGINT)
BEGIN
	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
	SELECT * FROM muridku.`faculty` WHERE `institution_id` = institution_id;
	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetFacultyByListId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetFacultyByListId`(IN ids VARCHAR(8000))
BEGIN
	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
	SET @query = CONCAT('SELECT * FROM muridku.`faculty` WHERE muridku.`faculty`.id IN ', ids);
    PREPARE stmt FROM @query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetInstitutionById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetInstitutionById`(IN id BIGINT)
BEGIN
	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
	SELECT * FROM muridku.`institution` WHERE `id` = id;
	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetInstitutionByListId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetInstitutionByListId`(IN ids VARCHAR(8000))
BEGIN
	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
	SET @query = CONCAT('SELECT * FROM muridku.`institution` WHERE muridku.`institution`.id IN ', ids);
    PREPARE stmt FROM @query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetKtbsByPktbId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetKtbsByPktbId`( IN member_id BIGINT )
BEGIN
	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
	SELECT ktb.*
    FROM muridku.`ktb` AS ktb
    JOIN muridku.`ktbmember` AS ktbmember ON ktbmember.`ktb_id` = ktb.`id`
    WHERE ktbmember.`member_id` = member_id
    AND ktbmember.`is_pktb` = 1
    AND ktbmember.`is_active` = 1;
	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetMemberById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetMemberById`(IN id BIGINT)
BEGIN
	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
	SELECT * FROM muridku.`member` WHERE muridku.`member`.id = id;
	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetMembersByKtbId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetMembersByKtbId`( IN ktb_id BIGINT )
BEGIN
	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
	SELECT mbr.*
    FROM muridku.`member` AS mbr
    JOIN muridku.`ktbmember` AS ktbmbr ON ktbmbr.`member_id` = mbr.`id`
    WHERE ktbmbr.`ktb_id` = ktb_id
    AND ktbmbr.`is_active` = 1;
	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetMembersByListId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetMembersByListId`(IN ids VARCHAR(8000))
BEGIN
	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
	SET @query = CONCAT('SELECT * FROM muridku.`member` WHERE muridku.`member`.id IN ', ids);
    PREPARE stmt FROM @query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetUserByEmail` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetUserByEmail`(IN email VARCHAR(50))
BEGIN
	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
	SELECT * FROM muridku.`user` WHERE muridku.`user`.email = email;
	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Login` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Login`(IN email VARCHAR(100))
BEGIN
	UPDATE muridku.`user` SET is_logged_in = 1 WHERE muridku.`user`.email = email;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Logout` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Logout`(IN email VARCHAR(100))
BEGIN
	UPDATE muridku.`user` SET is_logged_in = 0 WHERE muridku.`user`.email = email;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `RegisterMuridkuUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `RegisterMuridkuUser`(
	IN member_name VARCHAR(100),
    IN email VARCHAR(100),
    IN `password` VARCHAR(100),
    IN usr_ins VARCHAR(100)
)
BEGIN
	DECLARE inserted_member_id BIGINT DEFAULT NULL;
    DECLARE dtm_ins DATETIME DEFAULT NULL;
    
    SET dtm_ins = NOW();

	INSERT INTO muridku.`member` ( `name`, address, usr_crt, dtm_crt, usr_upd, dtm_upd )
    VALUES ( member_name, "", usr_ins, dtm_ins, usr_ins, dtm_ins );
    
    SET inserted_member_id = LAST_INSERT_ID();
    
    INSERT INTO muridku.`user` ( member_id, email, `password`, is_active, is_logged_in, usr_crt, dtm_crt, usr_upd, dtm_upd )
    VALUES ( inserted_member_id, email, `password`, 0, 0, usr_ins, dtm_ins, usr_ins, dtm_ins );
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SaveApiLog` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SaveApiLog`(
	IN request_id VARCHAR(200), IN url VARCHAR(500),
	IN method_name VARCHAR(200), IN param_input VARCHAR(2000),
    IN response_status VARCHAR(3), IN param_output VARCHAR(2000),
    IN error_message VARCHAR(2000), IN usr_crt VARCHAR(100)
)
BEGIN
	INSERT INTO muridku.`logapi` (`request_id`, `url`,
								  `method_name`, `param_input`,
                                  `response_status`, `param_output`,
                                  `error_message`, `usr_crt`, `dtm_crt`)
	VALUES (request_id, url,
            method_name, param_input,
            CAST(response_status AS SIGNED), param_output,
            error_message, usr_crt, NOW()
	);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SaveSingleMember` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SaveSingleMember`(
	IN `name` VARCHAR(100),
    IN address VARCHAR(200),
    IN birth_dt_param VARCHAR(10),
    IN birth_place VARCHAR(100),
    IN mobile_phn VARCHAR(20),
    IN institution_id_param VARCHAR(100),
    IN faculty_id_param VARCHAR(100),
    IN usr VARCHAR(100)
)
BEGIN
	DECLARE member_id BIGINT DEFAULT NULL ;
	DECLARE birth_dt DATETIME DEFAULT NULL ;
	DECLARE institution_id BIGINT DEFAULT NULL ;
	DECLARE faculty_id BIGINT DEFAULT NULL ;
	DECLARE dtm_ins DATETIME DEFAULT NULL ;
    
    IF birth_dt_param <> "" THEN
		SET birth_dt = STR_TO_DATE(birth_dt_param, "%Y-%m-%d") ;
	END IF ;
    
    IF institution_id_param <> "" THEN
		SET institution_id = CAST(institution_id_param AS UNSIGNED) ;
	END IF ;
    
    IF faculty_id_param <> "" THEN
		SET faculty_id = CAST(faculty_id_param AS UNSIGNED) ;
	END IF ;
    
    SET dtm_ins = NOW() ;
    
    INSERT INTO muridku.`member` (
		`name`,
        address,
        birth_dt,
        birth_place,
        mobile_phn,
        institution_id,
        faculty_id,
        usr_crt,
        dtm_crt,
        usr_upd,
        dtm_upd
	)
    VALUES (
		`name`,
        address,
        birth_dt,
        birth_place,
        mobile_phn,
        institution_id,
        faculty_id,
        usr,
        dtm_ins,
        usr,
        dtm_ins
    ) ;
    
    SET member_id = LAST_INSERT_ID();
    
	SELECT * FROM muridku.`member` WHERE `id` = member_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-25 17:25:15
