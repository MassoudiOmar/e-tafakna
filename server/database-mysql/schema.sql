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
-- Table `questions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `questions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content_FR` VARCHAR(50) NOT NULL,
  `content_AR` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `contract_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `contract_types` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `signed_time` INT NOT NULL,
  `time_answering` INT NOT NULL,
  `title_FR` VARCHAR(50) NOT NULL,
  `title_AR` VARCHAR(50) NOT NULL,
  `description_FR` VARCHAR(255) NOT NULL,
  `description_AR` VARCHAR(255) NOT NULL,
  `image_url` VARCHAR(50) NOT NULL,
  `template_FR` VARCHAR(50) NOT NULL,
  `template_AR` VARCHAR(50) NOT NULL,
  `country` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `contracts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `contracts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `contract_url` VARCHAR(50) NOT NULL,
  `status` VARCHAR(50) NOT NULL,
  `created_at` VARCHAR(50) NULL DEFAULT NULL,
  `contract_types_id` INT NOT NULL,
  PRIMARY KEY (`id`, `contract_types_id`),
  INDEX `fk_contracts_contract_types1_idx` (`contract_types_id` ASC) VISIBLE,
  CONSTRAINT `fk_contracts_contract_types1`
    FOREIGN KEY (`contract_types_id`)
    REFERENCES `contract_types` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `answers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `answers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(50) NOT NULL,
  `questions_id` INT NOT NULL,
  `contracts_id` INT NOT NULL,
  `contracts_contract_types_id` INT NOT NULL,
  PRIMARY KEY (`id`, `questions_id`, `contracts_id`, `contracts_contract_types_id`),
  INDEX `fk_answers_questions1_idx` (`questions_id` ASC) VISIBLE,
  INDEX `fk_answers_contracts1_idx` (`contracts_id` ASC, `contracts_contract_types_id` ASC) VISIBLE,
  CONSTRAINT `fk_answers_questions1`
    FOREIGN KEY (`questions_id`)
    REFERENCES `questions` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_answers_contracts1`
    FOREIGN KEY (`contracts_id` , `contracts_contract_types_id`)
    REFERENCES `contracts` (`id` , `contract_types_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(200) NOT NULL,
  `last_name` VARCHAR(200) NOT NULL,
  `username` VARCHAR(200) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `address` VARCHAR(200) NOT NULL,
  `phone` VARCHAR(200) NOT NULL,
  `role` VARCHAR(200) NOT NULL,
  `status` VARCHAR(200) NOT NULL,
  `created_at` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `questions_has_contract_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `questions_has_contract_types` (
  `questions_id` INT NOT NULL,
  `contract_types_id` INT NOT NULL,
  `order_question` INT NULL,
  PRIMARY KEY (`questions_id`, `contract_types_id`),
  INDEX `fk_questions_has_contract_types_contract_types1_idx` (`contract_types_id` ASC) VISIBLE,
  INDEX `fk_questions_has_contract_types_questions_idx` (`questions_id` ASC) VISIBLE,
  CONSTRAINT `fk_questions_has_contract_types_questions`
    FOREIGN KEY (`questions_id`)
    REFERENCES `questions` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_questions_has_contract_types_contract_types1`
    FOREIGN KEY (`contract_types_id`)
    REFERENCES `contract_types` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `users_has_contracts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `users_has_contracts` (
  `owner` INT NOT NULL,
  `contracts_id` INT NOT NULL,
  `receiver` INT NULL,
  `receiver_email` VARCHAR(45) NULL,
  PRIMARY KEY (`owner`, `contracts_id`),
  INDEX `fk_users_has_contracts_contracts1_idx` (`contracts_id` ASC) VISIBLE,
  INDEX `fk_users_has_contracts_users1_idx` (`owner` ASC) VISIBLE,
  CONSTRAINT `fk_users_has_contracts_users1`
    FOREIGN KEY (`owner`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_contracts_contracts1`
    FOREIGN KEY (`contracts_id`)
    REFERENCES `contracts` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
