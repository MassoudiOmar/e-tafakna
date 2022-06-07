-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema etafakna
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema etafakna
-- -----------------------------------------------------
DROP DATABASE IF EXISTS `etafakna`;

CREATE SCHEMA IF NOT EXISTS `etafakna` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `etafakna` ;

-- -----------------------------------------------------
-- Table `etafakna`.`contract_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `etafakna`.`contract_types` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `signed_time` INT ,
  `time_answering` INT NOT NULL,
  `title_FR` VARCHAR(200) NOT NULL,
  `title_AR` VARCHAR(200) ,
  `description_FR` VARCHAR(255) NOT NULL,
  `description_AR` VARCHAR(255) ,
  `image_url` VARCHAR(200) NOT NULL,
  `template_FR` VARCHAR(200) ,
  `template_AR` VARCHAR(200) ,
  `country` VARCHAR(10),
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `etafakna`.`contracts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `etafakna`.`contracts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `contract_url` VARCHAR(255) NOT NULL,
  `status` VARCHAR(50) NOT NULL,
  `created_at` VARCHAR(50) NULL DEFAULT NULL,
  `contract_image` VARCHAR(255) NULL DEFAULT NULL,
  `contract_types_id` INT NOT NULL,
  PRIMARY KEY (`id`, `contract_types_id`),
  INDEX `fk_contracts_contract_types1_idx` (`contract_types_id` ASC) VISIBLE,
  CONSTRAINT `fk_contracts_contract_types1`
    FOREIGN KEY (`contract_types_id`)
    REFERENCES `etafakna`.`contract_types` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `etafakna`.`questions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `etafakna`.`questions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content_FR` VARCHAR(50) NOT NULL,
  `content_AR` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `etafakna`.`answers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `etafakna`.`answers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(50) NOT NULL,
  `questions_id` INT NOT NULL,
  `contracts_id` INT NOT NULL, `contracts_contract_types_id` INT NOT NULL,
  PRIMARY KEY (`id`, `questions_id`, `contracts_id`, `contracts_contract_types_id`),
  INDEX `fk_answers_questions1_idx` (`questions_id` ASC) VISIBLE,
  INDEX `fk_answers_contracts1_idx` (`contracts_id` ASC, `contracts_contract_types_id` ASC) VISIBLE,
  CONSTRAINT `fk_answers_contracts1`
    FOREIGN KEY (`contracts_id`)
    REFERENCES `etafakna`.`contracts` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_answers_questions1`
	FOREIGN KEY (`contracts_id` , `contracts_contract_types_id`)
    REFERENCES `etafakna`.`contracts` (`id` , `contract_types_id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `etafakna`.`questions_has_contract_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `etafakna`.`questions_has_contract_types` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `questions_id` INT NOT NULL,
  `contract_types_id` INT NOT NULL,
  `order_question` INT NULL DEFAULT NULL,
  INDEX `fk_questions_has_contract_types_questions` (`questions_id` ASC) VISIBLE,
  INDEX `fk_questions_has_contract_types_contract_types1` (`contract_types_id` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_questions_has_contract_types_contract_types1`
    FOREIGN KEY (`contract_types_id`)
    REFERENCES `etafakna`.`contract_types` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_questions_has_contract_types_questions`
    FOREIGN KEY (`questions_id`)
    REFERENCES `etafakna`.`questions` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `etafakna`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `etafakna`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(200) NOT NULL,
  `last_name` VARCHAR(200) NOT NULL,
  `username` VARCHAR(200) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `address` VARCHAR(200) NOT NULL,
  `phone` VARCHAR(200) NOT NULL,
  `role` VARCHAR(200) NOT NULL,
  `image` VARCHAR(200) NOT NULL,
  `status` VARCHAR(200) NOT NULL,
  `created_at` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `etafakna`.`users_has_contracts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `etafakna`.`users_has_contracts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `owner` INT NOT NULL,
  `contracts_id` INT NOT NULL,
  `receiver` INT,
  `receiver_email` VARCHAR(45) ,
  PRIMARY KEY (`id`),
  INDEX `fk_users_has_contracts_contracts1_idx` (`contracts_id` ASC) VISIBLE,
  INDEX `fk_users_has_contracts_users1_idx` (`owner` ASC) VISIBLE,
  CONSTRAINT `fk_users_has_contracts_contracts1`
    FOREIGN KEY (`contracts_id`)
    REFERENCES `etafakna`.`contracts` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_users_has_contracts_users1`
    FOREIGN KEY (`owner`)
    REFERENCES `etafakna`.`users` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


-- Insert All Contracts
INSERT INTO etafakna.contract_types(signed_time,time_answering,title_FR,title_AR,description_FR,description_AR,image_url,template_FR,template_AR,country)
VALUES(115,2,"Rent","Rent","Anything can be rented using E-tafakna e-greement... From a room, to an appartement or a car...","desc_AR","https://thumbs.dreamstime.com/b/word-rent-cubes-model-home-real-estate-word-rent-cubes-model-home-real-estate-concept-133078583.jpg","temp_FR","temp_AR","Tunisia"),
      (41,5,"Promise","Promise","This is Promise Description","desc_AR","https://i.pinimg.com/originals/0e/f1/54/0ef15459639689548bb4bd1008f9b8cb.png","temp_FR","temp_AR","Tunisia"),
      (74,2,"Credencial","Credencial","This is Credencial Description","desc_AR","https://image.shutterstock.com/image-vector/confidential-grunge-rubber-stamp-on-260nw-178606619.jpg","temp_FR","temp_AR","Tunisia"),
      (153,9,"Handyman","Handyman","This is Handyman Description","desc_AR","https://handymanservices.ae/images/Handyman%20services-01.png","temp_FR","temp_AR","Tunisia"),
      (78,4,"SARL-SUARL","SARL-SUARL","This is SARL-SUARL Description","desc_AR","https://swiver.io/wp-content/uploads/2021/12/sarl.png","temp_FR","temp_AR","Tunisia"),
      (52,4,"Freelancer","Freelancer","This is Freelancer Description","desc_AR","https://craftypixels.com/placeholder-image/600x315/042550/ffffff.png&text=Freelancer","temp_FR","temp_AR","Tunisia"),
      (78,10,"Loan","Loan","This is loan Description","desc_AR","https://www.cashadvanceqmvt.com/wp-content/uploads/2022/03/Loan2.jpg","temp_FR","temp_AR","Tunisia"),
      (78,10,"Employment Contract","Employment Contract","This is Employment Contract Description","desc_AR","https://trak.in/wp-content/uploads/2015/06/Employment-in-India-cities.jpg","temp_FR","temp_AR","Tunisia");