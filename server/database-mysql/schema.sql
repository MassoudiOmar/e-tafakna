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
  `signed_time` INT NULL DEFAULT NULL,
  `time_answering` INT NOT NULL,
  `title_EN` VARCHAR(200) NULL DEFAULT NULL,
  `title_FR` VARCHAR(200) NULL DEFAULT NULL,
  `title_AR` VARCHAR(200) NULL DEFAULT NULL,
  `description_EN` VARCHAR(255) NULL DEFAULT NULL,
  `description_FR` VARCHAR(255) NULL DEFAULT NULL,
  `description_AR` VARCHAR(255) NULL DEFAULT NULL,
  `image_url` VARCHAR(200) NOT NULL,
  `template_EN` VARCHAR(1000) NULL DEFAULT NULL,
  `template_FR` VARCHAR(1000) NULL DEFAULT NULL,
  `template_AR` VARCHAR(1000) NULL DEFAULT NULL,
  `country` VARCHAR(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 18
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
--------------------
-- change templeteEN to Array to add all the parts if it have part2 
--------------------

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
  `archieve` VARCHAR(255) NULL DEFAULT NULL,
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
  `content_FR` VARCHAR(100) NOT NULL,
  `content_AR` VARCHAR(100) NOT NULL,
  `content_EN` VARCHAR(100) NOT NULL,
  `part2` VARCHAR(50) NOT NULL, 
  `inputType` VARCHAR(20) NOT NULL, 
  `options` VARCHAR(250), 
  `date` VARCHAR(10) NOT NULL,
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
  `contracts_id` INT NOT NULL,
  `contracts_contract_types_id` INT NOT NULL,
  `questions_id` INT NOT NULL,
  PRIMARY KEY (`id`, `contracts_id`, `contracts_contract_types_id`, `questions_id`),
  INDEX `fk_answers_questions2_idx` (`questions_id` ASC) VISIBLE,
  CONSTRAINT `fk_answers_questions1`
    FOREIGN KEY (`contracts_id` , `contracts_contract_types_id`)
    REFERENCES `etafakna`.`contracts` (`id` , `contract_types_id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_answers_questions2`
    FOREIGN KEY (`questions_id`)
    REFERENCES `etafakna`.`questions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
    PRIMARY KEY (`id`),
    INDEX `fk_questions_has_contract_types_questions` (`questions_id` ASC) VISIBLE,
    INDEX `fk_questions_has_contract_types_contract_types1` (`contract_types_id` ASC) VISIBLE,
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
  `notification` VARCHAR(200) NULL DEFAULT NULL,
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
  `receiver` INT NULL DEFAULT NULL,
  `receiver_email` VARCHAR(45) NULL DEFAULT NULL,
  `date` VARCHAR(45) NULL DEFAULT NULL,
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
-- Table `etafakna`.`users_has_notifications`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `etafakna`.`users_has_notifications` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `owner` INT NOT NULL,
  `contracts_id` INT NOT NULL,
  `receiver` INT NULL DEFAULT NULL,
  `date` VARCHAR(45) NULL DEFAULT NULL,
  `seen` VARCHAR(45) NULL DEFAULT NULL,
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



-- Insert All ContractsINSERT INTO etafakna.contract_types(signed_time,time_answering,title_EN,title_FR,title_AR,description_FR,description_AR,description_EN,image_url,template_FR,template_AR,template_EN,country)
VALUES(0,5,"NDA","Accord de non-divulgation(NDA)","اتفاقية عدم إفصاح","Anything can be rented using E-tafakna e-greement... From a room, to an appartement or a car...","desc_AR","desc_EN","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457759/unnamed_1_1_lzrkcv.png","https://res.cloudinary.com/dew6e8h2m/raw/upload/v1664713235/Contrat_de_travail_a%CC%80_dure%CC%81e_determine%CC%81e_n6_qxx7rq.docx","https://res.cloudinary.com/dew6e8h2m/raw/upload/v1664713235/Contrat_de_travail_a%CC%80_dure%CC%81e_determine%CC%81e_n6_qxx7rq.docx","https://res.cloudinary.com/dew6e8h2m/raw/upload/v1664713235/Contrat_de_travail_a%CC%80_dure%CC%81e_determine%CC%81e_n6_qxx7rq.docx","Tunisia"),
      (0,5,"CDI, CDD, CIVP","CDI, CDD, Civp","CDI, CDD, CIVP","This is Description","desc_AR","desc_EN","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457759/unnamed_2_1_ztst4g.png","temp_FR","temp_AR","temp_EN","Tunisia"),
      (0,5,"Training Certificate","Attestation de stage","شهادة تدريب","This is Credencial Description","desc_AR","desc_EN","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457759/unnamed_3_1_bumvz0.png","https://res.cloudinary.com/e-tafakna/raw/upload/v1664543960/Attestation-de-stage_n2_rjvm0l.docx","https://res.cloudinary.com/e-tafakna/raw/upload/v1664543960/Attestation-de-stage_n2_rjvm0l.docx","https://res.cloudinary.com/e-tafakna/raw/upload/v1664543960/Attestation-de-stage_n2_rjvm0l.docx","Tunisia"),
      (0,5,"Freelancer","Freelance","مستقل","This is Freelancer Description","desc_AR","desc_EN","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457758/unnamed_4_1_fzraz8.png","temp_FR","temp_AR","temp_EN","Tunisia"),
      (0,5,"Microcredit","Contrat de Prêt numéraire (microcrédit) ","قرض","This is loan Description","desc_AR","desc_EN","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457758/unnamed_5_1_exbhco.png","temp_FR","temp_AR","temp_EN","Tunisia"),
      (0,5,"Car rental","Location de voiture","كراء سيارة","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457758/unnamed_6_1_owmpwk.png","temp_FR","temp_AR","temp_EN","Tunisia"),
      (0,5,"Car sale","Achat de voiture","بيع سيارة","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457758/unnamed_7_1_evodld.png","temp_FR","temp_AR","temp_EN","Tunisia"),
      (0,5,"Rental of real estate","Location de biens","Referencement","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457757/unnamed_16_1_drpr0x.png","temp_FR","temp_AR","temp_EN","Tunisia"),
      (0,5,"Sale","Vente","عقد كراء","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457757/unnamed_10_1_wbb9lm.png","https://res.cloudinary.com/obesity-healer/raw/upload/v1662650983/Contrat_de_location_simple_hx7nv7.docx","https://res.cloudinary.com/obesity-healer/raw/upload/v1662650983/Contrat_de_location_simple_hx7nv7.docx","https://res.cloudinary.com/obesity-healer/raw/upload/v1662650983/Contrat_de_location_simple_hx7nv7.docx","Tunisia"),
      (0,5,"Purchase","Achat","Contrat d’engagement ","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457758/unnamed_9_1_pmtbst.png","https://res.cloudinary.com/e-tafakna/raw/upload/v1664562844/Engagement_contract_n2_x14mz3.docx","https://res.cloudinary.com/e-tafakna/raw/upload/v1664562844/Engagement_contract_n2_x14mz3.docx","https://res.cloudinary.com/e-tafakna/raw/upload/v1664562844/Engagement_contract_n2_x14mz3.docx","Tunisia"),
      (0,5,"Partnership","Partenariat","شراكة","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457757/unnamed_18_1_fssujl.png","temp_FR","temp_AR","temp_EN","Tunisia"),
      (0,5,"Quotation/Bill","Devis/Facture ","Devis/Facture ","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457757/unnamed_13_1_klfbym.png","temp_FR","temp_AR","temp_EN","Tunisia"),
      (0,5,"Travel insurance","Assurance Voyage","Assurance Voyage","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457757/unnamed_12_1_mol4hi.png","temp_FR","temp_AR","temp_EN","Tunisia"),
      (0,5,"Idea registration","Enregistrement d'une idée","Enregistrement d'une idée","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457757/unnamed_11_1_rkyp58.png","temp_FR","temp_AR","temp_EN","Tunisia"),
      (0,5,"CV","CV","أمر شراء","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457757/unnamed_15_1_ubzxye.png","temp_FR","temp_AR","temp_EN","Tunisia"),
      (0,5,"Safe of real estate","Contrat de Domiciliation","Contrat de Domiciliation","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457757/unnamed_17_1_mejvek.png","https://res.cloudinary.com/dew6e8h2m/raw/upload/v1664625501/Attestation_de_Domiciliation_n2_anigf5.docx","temp_AR","temp_EN","Tunisia"),
      (0,5,"Official request","Demande officielle", "طلب رسمي" ,"This is demande  Description","desc_AR","desc_EN","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457757/unnamed_17_1_mejvek.png","https://res.cloudinary.com/e-tafakna/raw/upload/v1664546377/Demande_officielle_n4_m4cbe4.docx","temp_AR","temp_EN","Tunisia");