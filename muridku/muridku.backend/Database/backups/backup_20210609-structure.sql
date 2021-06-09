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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `meet_dt` datetime NOT NULL,
  `material_id` bigint NOT NULL,
  `material_name` varchar(100) NOT NULL,
  `material_chapter` int NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL,
  `usr_upd` varchar(100) NOT NULL,
  `dtm_upd` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ktb_id` (`ktb_id`),
  KEY `material_id` (`material_id`),
  CONSTRAINT `ktbhistory_ibfk_1` FOREIGN KEY (`ktb_id`) REFERENCES `ktb` (`id`),
  CONSTRAINT `ktbhistory_ibfk_3` FOREIGN KEY (`material_id`) REFERENCES `material` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ktbhistorymember`
--

DROP TABLE IF EXISTS `ktbhistorymember`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ktbhistorymember` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ktb_history_id` bigint NOT NULL,
  `member_id` bigint NOT NULL,
  `is_attending` bigint NOT NULL,
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL,
  `usr_upd` varchar(100) NOT NULL,
  `dtm_upd` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ktb_history_id` (`ktb_history_id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `ktbhistorymember_ibfk_1` FOREIGN KEY (`ktb_history_id`) REFERENCES `ktbhistory` (`id`),
  CONSTRAINT `ktbhistorymember_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=40761 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `inst_type` varchar(5) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `accept_term` tinyint NOT NULL DEFAULT '1',
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL,
  `usr_upd` varchar(100) NOT NULL,
  `dtm_upd` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `userdevice`
--

DROP TABLE IF EXISTS `userdevice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userdevice` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `device_id` varchar(200) NOT NULL,
  `is_logged_in` int NOT NULL,
  `is_stay_logged_in` int NOT NULL,
  `last_login_dt` datetime NOT NULL,
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL,
  `usr_upd` varchar(100) NOT NULL,
  `dtm_upd` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `userdevice_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `ActivateUser`( IN email VARCHAR(100), IN is_active_param VARCHAR(50) )
BEGIN
	DECLARE is_active TINYINT DEFAULT NULL ;
    
    IF(is_active_param IS NULL OR is_active_param = "") THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'invalid is_active param' ;
	END IF ;
    
	IF((SELECT COUNT(*) FROM muridku.`user` WHERE muridku.`user`.`email` = `email` LIMIT 0,1) = 0) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'data not found';
	END IF ;
    
    SET is_active = CAST(is_active_param AS SIGNED) ;
    
	UPDATE muridku.`user`
    SET is_active = is_active
    WHERE muridku.`user`.`email` = email;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CheckUserActiveOnDevice` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CheckUserActiveOnDevice`(
	IN deviceid VARCHAR(200)
)
BEGIN
	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
    SELECT usr.*
	FROM muridku.`user` usr
	JOIN muridku.`userdevice` dvc ON dvc.`user_id` = usr.`id`
	WHERE usr.`is_active` = 1
	AND dvc.`is_logged_in` = 1
    AND dvc.`is_stay_logged_in` = 1
	AND dvc.`device_id` = deviceid
    LIMIT 0,1;
	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CheckUserLoginStatus` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CheckUserLoginStatus`(
	IN email VARCHAR(100),
    IN deviceid VARCHAR(200)
)
BEGIN
	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
    SELECT usr.*
	FROM muridku.`user` usr
	JOIN muridku.`userdevice` dvc ON dvc.`user_id` = usr.`id`
	WHERE usr.`email` = email
	AND usr.`is_active` = 1
	AND dvc.`is_logged_in` = 1
	AND dvc.`device_id` = deviceid;
	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteKtbMemberByListId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteKtbMemberByListId`(
	IN ktb_id_param VARCHAR(100),
    IN list_id VARCHAR(2000),
    IN usr VARCHAR(100)
)
BEGIN
	DECLARE ktb_id BIGINT DEFAULT NULL ;
	DECLARE dtm_ins DATETIME DEFAULT NULL ;
    
    IF ktb_id_param = "" THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'invalid group id';
	END IF ;
    
    IF list_id = "" THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'invalid list member id';
	END IF ;
    
	SET ktb_id = CAST(ktb_id_param AS UNSIGNED) ;
    
    SET @member_count = 0 ;
    SET @query = CONCAT('SELECT COUNT(*) ',
						'INTO @member_count ',
                        'FROM muridku.`ktbmember` ktbmbr ',
                        'JOIN muridku.`ktbhistory` hist ON hist.ktb_id = ktbmbr.ktb_id ',
                        'JOIN muridku.`ktbhistorymember` histd ON histd.ktb_history_id = hist.id AND histd.member_id = ktbmbr.member_id ',
                        'WHERE ktbmbr.`ktb_id` = ', ktb_id_param,
                        ' AND histd.`member_id` IN ', list_id);
    PREPARE stmt FROM @query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
    
    IF @member_count > 0 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'member already has group histories.';
    END IF ;
    
    SET dtm_ins = NOW() ;
	SET @query = CONCAT('DELETE FROM muridku.`ktbmember` WHERE muridku.`ktbmember`.`ktb_id` = ', ktb_id_param, ' AND muridku.`ktbmember`.`member_id` IN ', list_id);
    PREPARE stmt2 FROM @query;
    EXECUTE stmt2;
    DEALLOCATE PREPARE stmt2;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteKtbsByListId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteKtbsByListId`(IN list_id VARCHAR(2000))
BEGIN
	SET @histcount = 0 ;
    SET @query = CONCAT(
		'SELECT COUNT(hist.id) INTO @histcount ',
        'FROM muridku.`ktbhistory` hist ',
        'WHERE hist.ktb_id IN ', list_id
    ) ;
    PREPARE stmthist FROM @query;
    EXECUTE stmthist;
    DEALLOCATE PREPARE stmthist;
    IF (@histcount > 0) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'member already has group histories.';
    END IF ;

	SET @query = CONCAT('DELETE FROM muridku.`ktbmember` WHERE muridku.`ktbmember`.`ktb_id` IN ', list_id);
    PREPARE stmt FROM @query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
	SET @query = CONCAT('DELETE FROM muridku.`ktb` WHERE muridku.`ktb`.`id` IN ', list_id);
    PREPARE stmt2 FROM @query;
    EXECUTE stmt2;
    DEALLOCATE PREPARE stmt2;
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetActiveUserByEmail`(
	IN email VARCHAR(100),
    IN deviceid VARCHAR(200)
)
BEGIN
	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
    IF (deviceid IS NOT NULL) THEN
		SELECT usr.*
		FROM muridku.`user` usr
		JOIN muridku.`userdevice` dvc ON dvc.`user_id` = usr.`id`
		WHERE usr.`email` = email
		AND usr.`is_active` = 1
		AND dvc.`device_id` = deviceid;
    ELSE
		SELECT usr.*
		FROM muridku.`user` usr
		WHERE usr.`email` = email
		AND usr.`is_active` = 1;
	END IF ;
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
/*!50003 DROP PROCEDURE IF EXISTS `GetAllInactiveKtbMembers` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllInactiveKtbMembers`(IN pktb_id_param VARCHAR(100))
BEGIN
	DECLARE pktb_id BIGINT DEFAULT NULL ;
    
    IF pktb_id_param IS NOT NULL AND pktb_id_param <> "" THEN
		SET pktb_id = CAST(pktb_id_param as UNSIGNED) ;
	END IF ;
    
	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
    SELECT mbr.*
	FROM muridku.`member` mbr
    LEFT JOIN (
		SELECT ktbmbr.member_id, MAX(ktbmbr.is_active) AS is_active
        FROM muridku.`ktbmember` ktbmbr
        WHERE ktbmbr.`is_pktb` = 0
        GROUP BY ktbmbr.member_id
	) mbrd ON mbrd.member_id = mbr.id
	WHERE mbr.id <> pktb_id
    AND (mbrd.member_id IS NULL
    OR mbrd.`is_active` = 0) ;
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
/*!50003 DROP PROCEDURE IF EXISTS `GetAllMaterials` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllMaterials`()
BEGIN
	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
    SELECT * FROM muridku.`material`;
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
	SELECT * FROM muridku.`faculty` WHERE muridku.`faculty`.`id` = id;
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
	SELECT * FROM muridku.`faculty` WHERE muridku.`faculty`.`institution_id` = institution_id;
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
	SET @query = CONCAT('SELECT * FROM muridku.`faculty` WHERE muridku.`faculty`.`id` IN ', ids);
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
/*!50003 DROP PROCEDURE IF EXISTS `GetInactiveUsers` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetInactiveUsers`()
BEGIN
	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
    SELECT usr.`id`, usr.`email`, usr.`is_active`, mbr.`name`
	FROM muridku.`user` usr
    JOIN muridku.`member` mbr ON mbr.`id` = usr.`member_id`
	WHERE usr.`is_active` <> 1;
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
	SELECT * FROM muridku.`institution` WHERE muridku.`institution`.`id` = id;
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
	SET @query = CONCAT('SELECT * FROM muridku.`institution` WHERE muridku.`institution`.`id` IN ', ids);
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
/*!50003 DROP PROCEDURE IF EXISTS `GetInstitutionByType` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetInstitutionByType`( IN insttype VARCHAR(5) )
BEGIN
	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
    IF (insttype = 'ALL') THEN
		SELECT * FROM muridku.`institution`;
    ELSE
		SELECT * FROM muridku.`institution` WHERE muridku.`institution`.`type` = insttype;
	END IF;
	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetKtbByKtbId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetKtbByKtbId`( IN id BIGINT )
BEGIN
	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
	SELECT * FROM muridku.`ktb` WHERE muridku.`ktb`.`id` = id;
	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetKtbHistoryByKtbId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetKtbHistoryByKtbId`(
	IN ktb_id_param VARCHAR(100)
)
BEGIN
    DECLARE ktb_id BIGINT DEFAULT NULL ;
	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
    IF(ktb_id_param IS NOT NULL AND ktb_id_param <> "") THEN
		SET ktb_id = CAST(ktb_id_param AS UNSIGNED) ;
		SELECT hist.*
        FROM muridku.`ktbhistory` hist
        WHERE hist.ktb_id = ktb_id
        ORDER BY hist.`meet_dt` DESC;
    END IF ;
	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetKtbHistoryMemberByKtbHistoryId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetKtbHistoryMemberByKtbHistoryId`(
	IN ktb_hist_id_param VARCHAR(100)
)
BEGIN
    DECLARE ktb_hist_id BIGINT DEFAULT NULL ;
	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
    IF(ktb_hist_id_param IS NOT NULL AND ktb_hist_id_param <> '') THEN
		SET ktb_hist_id = CAST(ktb_hist_id_param AS UNSIGNED) ;
		SELECT mbr.*
        FROM muridku.`ktbhistorymember` hist
        JOIN muridku.`member` mbr ON mbr.id = hist.`member_id`
        WHERE hist.ktb_history_id = ktb_hist_id
        AND hist.is_attending = 1 ;
    END IF ;
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
	SELECT * FROM muridku.`member` WHERE muridku.`member`.`id` = id;
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
	SET @query = CONCAT('SELECT * FROM muridku.`member` WHERE muridku.`member`.`id` IN ', ids);
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
/*!50003 DROP PROCEDURE IF EXISTS `GetSingleKtbHistoryByKtbId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetSingleKtbHistoryByKtbId`(
	IN ktb_id_param VARCHAR(100)
)
BEGIN
    DECLARE ktb_id BIGINT DEFAULT NULL ;
	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
    IF(ktb_id_param IS NOT NULL AND ktb_id_param <> "") THEN
		SET ktb_id = CAST(ktb_id_param AS UNSIGNED) ;
        SELECT * FROM muridku.`ktbhistory` hist WHERE hist.ktb_id = ktb_id LIMIT 0,1 ;
	END IF;
	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetSingleKtbHistoryMemberByKtbIdMemberId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetSingleKtbHistoryMemberByKtbIdMemberId`(
	IN ktb_id_param VARCHAR(100),
    IN member_id_param VARCHAR(100)
)
BEGIN
    DECLARE ktb_id BIGINT DEFAULT NULL ;
    DECLARE member_id BIGINT DEFAULT NULL ;
	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
    IF(ktb_id_param IS NOT NULL AND ktb_id_param <> "" AND member_id_param IS NOT NULL AND member_id_param <> "") THEN
		SET ktb_id = CAST(ktb_id_param AS UNSIGNED) ;
		SET member_id = CAST(member_id_param AS UNSIGNED) ;
        SELECT histd.*
        FROM muridku.`ktbhistorymember` histd
        JOIN muridku.`ktbhistory` hist ON hist.id = histd.ktb_history_id
        WHERE hist.ktb_id = ktb_id
        AND histd.member_id = member_id
        LIMIT 0, 1 ;
	END IF;
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
	SELECT * FROM muridku.`user` WHERE muridku.`user`.`email` = email;
	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetUserByMemberId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetUserByMemberId`( IN memberid BIGINT )
BEGIN
	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
	SELECT * FROM muridku.`user` WHERE muridku.`user`.`member_id` = memberid LIMIT 0,1;
	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetUsersByMemberId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetUsersByMemberId`( IN memberid BIGINT )
BEGIN
	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
	SELECT * FROM muridku.`user` WHERE muridku.`user`.`member_id` = memberid;
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `Login`(IN email VARCHAR(100),
	IN deviceid VARCHAR(200),
    IN isstayloggedin INT)
BEGIN
	DECLARE dtm_ins DATETIME DEFAULT NULL;
    
	IF((SELECT COUNT(*) AS COUNT_USR FROM muridku.`user` WHERE muridku.`user`.`email` = `email`) = 0) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'data not found';
	END IF ;
    
	IF((SELECT COUNT(*) AS COUNT_USR FROM muridku.`user` WHERE muridku.`user`.`email` = `email` AND muridku.`user`.`is_active` = 1) = 0) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'user still not active';
	END IF ;
    
	IF((SELECT COUNT(*) FROM muridku.`user` WHERE muridku.`user`.`email` = `email` LIMIT 0,1) > 1) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'multiple user found';
	END IF ;
    
    SET dtm_ins = NOW();
    
    IF((
		SELECT COUNT(*)
        FROM muridku.`userdevice` dvc
        JOIN muridku.`user` usr ON usr.`id` = dvc.`user_id`
        WHERE usr.`email` = `email`
        AND dvc.`device_id` = `deviceid`
        ) = 0
	) THEN
		INSERT INTO muridku.`userdevice` (
			user_id,
            device_id,
            is_logged_in,
            is_stay_logged_in,
            last_login_dt,
            usr_crt,
            dtm_crt,
            usr_upd,
            dtm_upd
		)
        VALUES (
			(SELECT muridku.`user`.`id` FROM muridku.`user` WHERE muridku.`user`.`email` = `email` LIMIT 0,1),
            deviceid,
            1,
            isstayloggedin,
            dtm_ins,
            'SYSTEM',
            dtm_ins,
            'SYSTEM',
            dtm_ins
		);
	ELSE
		UPDATE muridku.`userdevice` dvc
        JOIN muridku.`user` usr ON usr.`id` = dvc.`user_id`
        SET dvc.is_logged_in = 1
          , dvc.device_id = deviceid
          , dvc.is_stay_logged_in = isstayloggedin
		  , dvc.usr_upd = 'SYSTEM'
          , dvc.dtm_upd = dtm_ins
        WHERE usr.`email` = email
        AND dvc.`device_id` = deviceid;
	END IF ;
    
    SELECT * FROM muridku.`user` WHERE muridku.`user`.`email` = `email`;
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `Logout`(IN email VARCHAR(100), IN deviceid VARCHAR(200))
BEGIN
	DECLARE dtm_ins DATETIME DEFAULT NULL;
    
	IF((SELECT COUNT(*) FROM muridku.`user` WHERE muridku.`user`.`email` = `email`) = 0) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'data not found';
	END IF ;
    
	IF((SELECT COUNT(*) FROM muridku.`user` WHERE muridku.`user`.`email` = `email` AND muridku.`user`.`is_active` = 1) = 0) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'user still not active';
	END IF ;
    
	IF((SELECT COUNT(*) FROM muridku.`user` WHERE muridku.`user`.`email` = `email`) > 1) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'multiple user found';
	END IF ;
    
    SET dtm_ins = NOW();
    
    UPDATE muridku.`userdevice` dvc
	JOIN muridku.`user` usr ON usr.`id` = dvc.`user_id`
	SET dvc.is_logged_in = 0
	  , dvc.is_stay_logged_in = 0
	  , dvc.usr_upd = 'SYSTEM'
	  , dvc.dtm_upd = dtm_ins
	WHERE usr.`email` = email
    AND dvc.`device_id` = deviceid;
    
    SELECT * FROM muridku.`user` WHERE muridku.`user`.`email` = email;
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
    IN address VARCHAR(200),
    IN `password` VARCHAR(100),
    IN usr_ins VARCHAR(100)
)
BEGIN
	DECLARE inserted_member_id BIGINT DEFAULT NULL;
    DECLARE dtm_ins DATETIME DEFAULT NULL;
    
	IF((SELECT COUNT(*) FROM muridku.`user` WHERE LOWER(muridku.`user`.`email`) = LOWER(`email`) LIMIT 0,1) = 1) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'user already exists';
	END IF ;
    
    SET dtm_ins = NOW();

	INSERT INTO muridku.`member` ( `name`, `address`, `usr_crt`, `dtm_crt`, `usr_upd`, `dtm_upd` )
    VALUES ( member_name, address, usr_ins, dtm_ins, usr_ins, dtm_ins );
    
    SET inserted_member_id = LAST_INSERT_ID();
    
    INSERT INTO muridku.`user` ( `member_id`, `email`, `password`, `is_active`, `usr_crt`, `dtm_crt`, `usr_upd`, `dtm_upd` )
    VALUES ( inserted_member_id, email, `password`, 0, usr_ins, dtm_ins, usr_ins, dtm_ins );
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
/*!50003 DROP PROCEDURE IF EXISTS `SaveSingleKtb` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SaveSingleKtb`(
	IN pktb_id_param VARCHAR(100),
    IN name_param VARCHAR(100),
    IN usr VARCHAR(100)
)
BEGIN
	DECLARE pktb_id BIGINT DEFAULT NULL ;
	DECLARE dtm_ins DATETIME DEFAULT NULL ;
	DECLARE ktb_id BIGINT DEFAULT NULL ;
    
    IF pktb_id_param = "" THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'invalid group leader id';
	END IF ;
    
    SET pktb_id = CAST(pktb_id_param AS UNSIGNED) ;
    
	IF((
		SELECT COUNT(*)
        FROM muridku.`ktb` ktb
        JOIN muridku.`ktbmember` ktbmbr ON ktbmbr.`ktb_id` = ktb.`id`
        WHERE LOWER(ktb.`name`) = LOWER(`name_param`)
        AND ktbmbr.`member_id` = pktb_id
        LIMIT 0,1
	) = 1) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'group name already used';
	END IF ;
    
    SET dtm_ins = NOW() ;
    
    INSERT INTO muridku.`ktb` (`code`, `name`, `usr_crt`, `dtm_crt`, `usr_upd`, `dtm_upd`)
    VALUES ('', name_param, usr, dtm_ins, usr, dtm_ins);
    
    SET ktb_id = LAST_INSERT_ID();
    
    INSERT INTO muridku.`ktbmember` (`ktb_id`, `member_id`, `is_pktb`, `is_active`, `usr_crt`, `dtm_crt`, `usr_upd`, `dtm_upd`)
    VALUES (ktb_id, pktb_id, 1, 1, usr, dtm_ins, usr, dtm_ins);
    
	SELECT * FROM muridku.`ktb` WHERE muridku.`ktb`.`id` = ktb_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SaveSingleKtbHistory` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SaveSingleKtbHistory`(
	IN ktb_id_param VARCHAR(100),
	IN meet_dt_param VARCHAR(20),
	IN material_id_param VARCHAR(100),
	IN material_name_param VARCHAR(100),
	IN material_chapter_param VARCHAR(50),
    IN usr VARCHAR(100)
)
BEGIN
    DECLARE ktb_id BIGINT DEFAULT NULL ;
    DECLARE ktb_history_id BIGINT DEFAULT NULL ;
    DECLARE material_id BIGINT DEFAULT NULL ;
    DECLARE material_chapter INT DEFAULT NULL ;
	DECLARE dtm_ins DATETIME DEFAULT NULL ;
    
    IF ktb_id_param = "" THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'invalid group id';
	END IF ;
    
    IF meet_dt_param = "" THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'invalid meet date';
	END IF ;
    
    IF material_id_param = "" THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'invalid material id';
	END IF ;
    
    IF material_name_param = "" THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'invalid material name';
	END IF ;
    
    IF material_chapter_param = "" THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'invalid material chapter';
	END IF ;
    
    SET ktb_id = CAST(ktb_id_param AS UNSIGNED) ;
    SET material_id = CAST(material_id_param AS UNSIGNED) ;
    SET material_chapter = CAST(material_chapter_param AS SIGNED) ;
    SET dtm_ins = NOW() ;
    
    INSERT INTO muridku.`ktbhistory` (`ktb_id`, `meet_dt`, `material_id`, `material_name`, `material_chapter`, `usr_crt`, `dtm_crt`, `usr_upd`, `dtm_upd`)
    VALUES (ktb_id, meet_dt_param, material_id, material_name_param, material_chapter, usr, dtm_ins, usr, dtm_ins);
    
    SET ktb_history_id = LAST_INSERT_ID();
    
	SELECT * FROM muridku.`ktbhistory` WHERE muridku.`ktbhistory`.`id` = ktb_history_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SaveSingleKtbHistoryMember` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SaveSingleKtbHistoryMember`(
	IN ktb_history_id_param VARCHAR(100),
	IN member_id_param VARCHAR(100),
	IN is_attending_param VARCHAR(50),
    IN usr VARCHAR(100)
)
BEGIN
    DECLARE ktb_history_id BIGINT DEFAULT NULL ;
    DECLARE member_id BIGINT DEFAULT NULL ;
    DECLARE is_attending INT DEFAULT NULL ;
	DECLARE dtm_ins DATETIME DEFAULT NULL ;
    
    IF ktb_history_id_param = "" THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'invalid group history id';
	END IF ;
    
    IF member_id_param = "" THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'invalid member id';
	END IF ;
    
    IF is_attending_param = "" THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'invalid attending param';
	END IF ;
    
    SET ktb_history_id = CAST(ktb_history_id_param AS UNSIGNED) ;
    SET member_id = CAST(member_id_param AS UNSIGNED) ;
    SET is_attending = CAST(is_attending_param AS SIGNED) ;
    SET dtm_ins = NOW() ;
    
    INSERT INTO muridku.`ktbhistorymember` (`ktb_history_id`, `member_id`, `is_attending`, `usr_crt`, `dtm_crt`, `usr_upd`, `dtm_upd`)
    VALUES (ktb_history_id, member_id, is_attending, usr, dtm_ins, usr, dtm_ins);
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
	IN `ktb_id_param` VARCHAR(100),
    IN `member_id_param` VARCHAR(100),
	IN `email` VARCHAR(100),
    IN `password` VARCHAR(100),
	IN `name` VARCHAR(100),
    IN address VARCHAR(200),
    IN birth_dt_param VARCHAR(20),
    IN birth_place VARCHAR(100),
    IN mobile_phn VARCHAR(20),
    IN inst_type VARCHAR(5),
    IN institution_id_param VARCHAR(100),
    IN faculty_id_param VARCHAR(100),
    IN usr VARCHAR(100)
)
BEGIN
	DECLARE ktb_id BIGINT DEFAULT NULL ;
	DECLARE member_id BIGINT DEFAULT NULL ;
	DECLARE birth_dt DATETIME DEFAULT NULL ;
	DECLARE institution_id BIGINT DEFAULT NULL ;
	DECLARE faculty_id BIGINT DEFAULT NULL ;
	DECLARE dtm_ins DATETIME DEFAULT NULL ;
    
    IF ktb_id_param <> "" THEN
		SET ktb_id = CAST(ktb_id_param AS UNSIGNED) ;
	END IF ;
    
    IF member_id_param <> "" THEN
		SET member_id = CAST(member_id_param AS UNSIGNED) ;
	END IF ;
    
	IF(member_id = NULL AND (SELECT COUNT(*) FROM muridku.`user` WHERE LOWER(muridku.`user`.`email`) = LOWER(`email`) LIMIT 0,1) = 1) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'email already used';
	END IF ;
    
	IF((SELECT COUNT(*) FROM muridku.`ktbmember` ktbmbr WHERE ktbmbr.`ktb_id` <> ktb_id AND ktbmbr.`member_id` = member_id AND ktbmbr.`is_active` = 1 AND ktbmbr.`is_pktb` = 0 LIMIT 0,1) = 1) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'member already in another group';
	END IF ;
    
	IF((SELECT COUNT(*) FROM muridku.`user` WHERE LOWER(muridku.`user`.`email`) = LOWER(`email`) AND muridku.`user`.`member_id` <> member_id LIMIT 0,1) = 1) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'email already used';
	END IF ;
    
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
    
    IF (member_id IS NULL) THEN
		INSERT INTO muridku.`member` (
			`name`,
			`address`,
			`birth_dt`,
			`birth_place`,
			`mobile_phn`,
			`inst_type`,
			`institution_id`,
			`faculty_id`,
			`usr_crt`,
			`dtm_crt`,
			`usr_upd`,
			`dtm_upd`
		)
		VALUES (
			`name`,
			address,
			birth_dt,
			birth_place,
			mobile_phn,
			inst_type,
			institution_id,
			faculty_id,
			usr,
			dtm_ins,
			usr,
			dtm_ins
		) ;
		
		SET member_id = LAST_INSERT_ID();
		
		INSERT INTO muridku.`user` (`member_id`, `email`, `password`, `is_active`, `usr_crt`, `dtm_crt`, `usr_upd`, `dtm_upd`)
		VALUES (member_id, `email`, `password`, 2, usr, dtm_ins, usr, dtm_ins);
	ELSE
		CALL muridku.`UpdateSingleMember`(`email`, `member_id_param`, `name`, `address`, birth_dt_param, birth_place, mobile_phn, inst_type, institution_id_param, faculty_id_param, usr) ;
    END IF ;
	
    IF((SELECT COUNT(*) FROM muridku.`ktbmember` ktbmbr WHERE ktbmbr.ktb_id = ktb_id AND ktbmbr.member_id = member_id LIMIT 0,1) = 0) THEN
		INSERT INTO muridku.`ktbmember` (`ktb_id`, `member_id`, `is_pktb`, `is_active`, `usr_crt`, `dtm_crt`, `usr_upd`, `dtm_upd`)
		VALUES (ktb_id, member_id, 0, 1, usr, dtm_ins, usr, dtm_ins);
	ELSE
		UPDATE muridku.`ktbmember`
        SET `is_active` = 1
          , `usr_upd` = usr
          , `dtm_upd` = dtm_ins
		WHERE muridku.`ktbmember`.ktb_id = ktb_id
        AND muridku.`ktbmember`.member_id = member_id ;
    END IF ;
    
	SELECT * FROM muridku.`member` WHERE muridku.`member`.`id` = member_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateAktbStatusByListId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateAktbStatusByListId`(
	IN ktb_id_param VARCHAR(100),
    IN list_id VARCHAR(2000),
    IN usr VARCHAR(100)
)
BEGIN
	DECLARE ktb_id BIGINT DEFAULT NULL ;
	DECLARE dtm_ins DATETIME DEFAULT NULL ;
    
    IF ktb_id_param = "" THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'invalid group id';
	END IF ;
    
    SET dtm_ins = NOW() ;
	SET @query = CONCAT('UPDATE muridku.`ktbmember` SET is_active = 0, usr_upd = ''', usr, ''', dtm_upd = ''', dtm_ins, ''' WHERE muridku.`ktbmember`.`ktb_id` = ', ktb_id_param, ' AND muridku.`ktbmember`.`member_id` IN ', list_id);
    PREPARE stmt FROM @query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateSingleKtb` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateSingleKtb`(
	IN ktb_id_param VARCHAR(100),
    IN pktb_id_param VARCHAR(100),
    IN name_param VARCHAR(100),
    IN usr VARCHAR(100)
)
BEGIN
	DECLARE ktb_id BIGINT DEFAULT NULL ;
	DECLARE pktb_id BIGINT DEFAULT NULL ;
	DECLARE dtm_ins DATETIME DEFAULT NULL ;
    
    IF ktb_id_param = "" THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'invalid group id';
	END IF ;
    
    IF pktb_id_param = "" THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'invalid group leader id';
	END IF ;
    
	SET ktb_id = CAST(ktb_id_param AS UNSIGNED) ;
	SET pktb_id = CAST(pktb_id_param AS UNSIGNED) ;
    
	IF((
		SELECT COUNT(*)
        FROM muridku.`ktb` ktb
        JOIN muridku.`ktbmember` ktbmbr ON ktbmbr.`ktb_id` = ktb.`id`
        WHERE LOWER(ktb.`name`) = LOWER(`name_param`)
        AND ktbmbr.`member_id` = pktb_id
        AND ktb.`id` <> ktb_id
        LIMIT 0,1
	) = 1) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'group name already used';
	END IF ;
    
    SET dtm_ins = NOW() ;
    
    UPDATE muridku.`ktb`
    SET `name` = name_param
      , `usr_upd` = usr
      , `dtm_upd` = dtm_ins
    WHERE muridku.`ktb`.`id` = ktb_id ;
    
	SELECT * FROM muridku.`ktb` WHERE muridku.`ktb`.`id` = ktb_id ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateSingleMember` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateSingleMember`(
	IN `email` VARCHAR(100),
	IN id_param VARCHAR(100),
	IN `name` VARCHAR(100),
    IN address VARCHAR(200),
    IN birth_dt_param VARCHAR(20),
    IN birth_place VARCHAR(100),
    IN mobile_phn VARCHAR(20),
    IN inst_type VARCHAR(5),
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
    
    IF id_param <> "" THEN
		SET member_id = CAST(id_param AS UNSIGNED) ;
	END IF ;
    
	IF((SELECT COUNT(*) FROM muridku.`user` WHERE muridku.`user`.`member_id` = `member_id` AND muridku.`user`.`is_active` = 1 AND muridku.`user`.`email` <> `email` LIMIT 0,1) = 1) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'cannot change email, email already activated';
	END IF ;
    
	IF((SELECT COUNT(*) FROM muridku.`user` WHERE muridku.`user`.`email` = `email` AND muridku.`user`.`member_id` <> member_id LIMIT 0,1) = 1) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'email already taken by another user';
	END IF ;
    
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
    
    UPDATE muridku.`member`
    SET muridku.`member`.`name` = `name`
      , muridku.`member`.`address` = address
      , muridku.`member`.`birth_dt` = birth_dt
      , muridku.`member`.`birth_place` = birth_place
      , muridku.`member`.`mobile_phn` = mobile_phn
      , muridku.`member`.`inst_type` = inst_type
      , muridku.`member`.`institution_id` = institution_id
      , muridku.`member`.`faculty_id` = faculty_id
      , muridku.`member`.`usr_upd` = usr
      , muridku.`member`.`dtm_upd` = dtm_ins
	WHERE muridku.`member`.`id` = member_id;
    
    UPDATE muridku.`user`
    SET muridku.`user`.`email` = `email`
      , muridku.`user`.`usr_upd` = usr
	  , muridku.`user`.`dtm_upd` = dtm_ins
	WHERE muridku.`user`.`member_id` = member_id;
    
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

-- Dump completed on 2021-06-09 17:20:40
