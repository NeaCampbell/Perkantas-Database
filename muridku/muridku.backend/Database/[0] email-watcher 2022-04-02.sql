CREATE TABLE `outbox` (
	`id` bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` bigint NOT NULL,
    `destination` varchar(200) NOT NULL,
    `title` varchar(100) NOT NULL,
    `message` varchar(500) NOT NULL,
    `status` tinyint NOT NULL,
	`usr_crt` varchar(50) NOT NULL,
	`dtm_crt` datetime NOT NULL,
	`usr_upd` varchar(50) NOT NULL,
	`dtm_upd` datetime NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `credential` (
	`id` bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `type` varchar(20) NOT NULL,
    `username` varchar(200) NOT NULL,
    `password` varchar(200) NOT NULL
);

INSERT INTO `credential` (`type`, `username`, `password`)
VALUES ('Sender', 'huajuinggg@gmail.com', 'trzazzwsdlhgrggb');

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SendEmail`( IN user_id BIGINT, IN destination VARCHAR(200), IN title VARCHAR(100), IN message VARCHAR(500) )
BEGIN
	DECLARE `status` TINYINT DEFAULT NULL;
    DECLARE dtm_ins DATETIME DEFAULT NULL;
    
    IF(user_id IS NULL OR user_id = 0 OR destination IS NULL OR destination = '' OR title IS NULL OR title = '' OR message IS NULL OR message = '') THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'invalid param' ;
	END IF;
    
	IF((SELECT COUNT(*) FROM muridku.`user` WHERE muridku.`user`.`id` = `user_id` LIMIT 0,1) = 0) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'data not found';
	END IF ;
    
    SET `status` = 0;
    SET dtm_ins = NOW();
    
    INSERT INTO muridku.`outbox` (`user_id`, `destination`, `title`, `message`, `status`, `usr_crt`, `dtm_crt`, `usr_upd`, `dtm_upd`)
    VALUES (user_id, destination, title, message, `status`, 'system', dtm_ins, 'system', dtm_ins);
END$$
DELIMITER ;

UPDATE `version`
SET version_no = '0.0.8'
WHERE id < 3;