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
  `title_EN` VARCHAR(200) ,
  `title_FR` VARCHAR(200) ,
  `title_AR` VARCHAR(200) ,
  `description_EN` VARCHAR(255) ,
  `description_FR` VARCHAR(255) ,
  `description_AR` VARCHAR(255) ,
  `image_url` VARCHAR(200) NOT NULL,
  `template_EN` VARCHAR(200) ,
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
  `notification` VARCHAR(200),
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


-- -----------------------------------------------------
-- Table `etafakna`.`users_has_contracts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `etafakna`.`users_has_notifications` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `owner` INT NOT NULL,
  `contracts_id` INT NOT NULL,
  `receiver` INT,
  `date` VARCHAR(45) ,
  PRIMARY KEY (`id`),
  INDEX `fk_users_has_notification_contracts1_idx` (`contracts_id` ASC) VISIBLE,
  INDEX `fk_users_has_notification_users1_idx` (`owner` ASC) VISIBLE,
  CONSTRAINT `fk_users_has_notification_notification`
    FOREIGN KEY (`contracts_id`)
    REFERENCES `etafakna`.`contracts` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_users_has_notification_users1`
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
INSERT INTO etafakna.contract_types(signed_time,time_answering,title_EN,title_FR,title_AR,description_FR,description_AR,description_EN,image_url,template_FR,template_AR,template_EN,country)
VALUES(115,2,"NDA(Non-disclosure agreement)","Accord de non-divulgation","اتفاقية عدم إفصاح","Anything can be rented using E-tafakna e-greement... From a room, to an appartement or a car...","desc_AR","desc_EN","https://res.cloudinary.com/diyuy6jxe/image/upload/v1659574972/agreement_tybudr.png","temp_FR","temp_AR","temp_EN","Tunisia"),
      (41,5,"CDI, CDD, Civp","CDI, CDD, Civp","CDI, CDD, Civp","This is Description","desc_AR","desc_EN","https://res.cloudinary.com/diyuy6jxe/image/upload/v1659574972/licensing_cguq6w.png","temp_FR","temp_AR","temp_EN","Tunisia"),
      (74,2,"Training Certificate","Attestation de stage","شهادة تدريب","This is Credencial Description","desc_AR","desc_EN","https://res.cloudinary.com/diyuy6jxe/image/upload/v1659575382/certificate_pq9iv1.png","temp_FR","temp_AR","temp_EN","Tunisia"),
      (52,4,"Freelancer","Freelancer","مستقل","This is Freelancer Description","desc_AR","desc_EN","https://res.cloudinary.com/diyuy6jxe/image/upload/v1659575545/freelancer_ceengy.png","temp_FR","temp_AR","temp_EN","Tunisia"),
      (78,10,"Microcredit","Microcredit ","قرض","This is loan Description","desc_AR","desc_EN","https://res.cloudinary.com/diyuy6jxe/image/upload/v1659575642/microcredit_kys5yy.png","temp_FR","temp_AR","temp_EN","Tunisia"),
      (78,10,"Car rental","Location de voiture","كراء سيارة","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/diyuy6jxe/image/upload/v1659574972/leasing_1_dzzmi0.png","temp_FR","temp_AR","temp_EN","Tunisia"),
      (78,10,"Car sale","Vente de voiture","بيع سيارة","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/diyuy6jxe/image/upload/v1659574972/leasing_a1cb8o.png","temp_FR","temp_AR","temp_EN","Tunisia"),
      (78,10,"SEO","Referral agreement","Referencement","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/diyuy6jxe/image/upload/v1659575738/handshake_kfryge.png","temp_FR","temp_AR","temp_EN","Tunisia"),
(78,10,"Idea registration","Enregistrement idee","
تسجيل الفكرة","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/diyuy6jxe/image/upload/v1659575802/lightbulb_f8bkri.png","temp_FR","temp_AR","temp_EN","Tunisia"),
      (78,10,"Sale","Vente","بيع","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/diyuy6jxe/image/upload/v1659575959/sales_ozshqo.png","temp_FR","temp_AR","temp_EN","Tunisia"),
      (78,10,"purchase","Achat","شراء","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/diyuy6jxe/image/upload/v1659574972/purchase_cvzcwn.png","temp_FR","temp_AR","temp_EN","Tunisia"),
      (78,10,"CV","CV","
سيرة ذاتية","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/diyuy6jxe/image/upload/v1659576033/approved_mmrxqi.png","temp_FR","temp_AR","temp_EN","Tunisia"),
            (78,10,"Rental of real estate","Location de biens immobiliers","
بيع العقارات
","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/diyuy6jxe/image/upload/v1659574972/house_gkguyb.png","temp_FR","temp_AR","temp_EN","Tunisia"),
            (78,10,"Sale of real estate
","Vente de biens immobiliers","كراء العقارات
","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/diyuy6jxe/image/upload/v1659574972/house_gkguyb.png","temp_FR","temp_AR","temp_EN","Tunisia"),
            (78,10,"partnership","Partenariat","partnership","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/diyuy6jxe/image/upload/v1659576106/team_iqzzmy.png","temp_FR","temp_AR","temp_EN","Tunisia"),
            (78,10,"Purchase Order","Bon de commande","أمر شراء","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/diyuy6jxe/image/upload/v1659576186/cargo_o6zhv6.png","temp_FR","temp_AR","temp_EN","Tunisia"),
            (78,10,"Quotation","Devis","التسعير
","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/diyuy6jxe/image/upload/v1659576295/dollar_rdejbp.png","temp_FR","temp_AR","temp_EN","Tunisia");

