-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

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
CREATE SCHEMA IF NOT EXISTS etafakna DEFAULT CHARACTER SET cp1256;
USE `etafakna`;
select * from information_schema.character_sets where description like '%arabic%';
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
  `part2_FR` VARCHAR(50) NULL, 
  `part2_AR` VARCHAR(50) NULL, 
  `part2_EN` VARCHAR(50) NULL, 
  `inputType` VARCHAR(20) NOT NULL, 
  `options` VARCHAR(250), 
  `date` VARCHAR(10) NOT NULL,
  `explanation` VARCHAR(1000),
  PRIMARY KEY (`id`))
ENGINE = InnoDB
CHARACTER SET = utf8
 COLLATE = utf8_unicode_ci;


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



-- insert questions 
INSERT INTO etafakna.questions(content_FR,content_AR,content_EN,part2_FR,part2_AR,part2_EN,inputType,options,date,explanation)
-- attestation de stage
VALUES("Civilité ","arabe","Civility","Employeur","null","Employer","civilite","civilite","null","null"),
      (" Nom et prénom ","null","Full name"," Employeur ","arab","Employer","null","null","null","null"),
      ("Indiquer la fonction dans l'entreprise","null","Indicate the function in the company","null","null","null","null","null","null","null"),
      (" Civilité ","null","Civility","Stagiare","null","The intern","null","civilite","null","null"),
      ("Nom et prenom","null","Full name","Stagiare","null","The intern","null","null","null","null"),
      ("Adress","null","Address","Stagiare","null","The intern","null","null","null","null"),
      ("Nom de l'entreprise","null","Company Name","null","null","null","null","null","null","null"),
      ("Date","null","Date"," Debut ","null","Beginning","true","null","true","null"),
      ("Date","null","Date","fin","null","End","true","null","true","null"),
      ("Indiquer la fonction dans lentreprise","null","Indicate your position in the company","null","null","null","null","null","null","null"),
      ("Fait le","null","The date today","null","null","null","null","null","true","null"),
-- demande officielle
      ("A l'attention de ", "null", "To the attention of", "null", "null", "null", "null", "null", "false","la personne à qui vous voulez demander"),
      ("Quel est l'object de votre demande", "null", "What is the purpose of your request", "null", "null", "null", "null", "null", "false","null"),
      ("Veuillez presier votre demande", "null", "Please submit your request", "null", "null", "null", "null", "null", "false","null"),
      ("Fait à ", "null", "Made in", "null", "null", "null", "null", "null", "false","null"),
      ("Date ", "null", "Date", "null", "null", "null", "null", "null", "true","null"),
      ("Votre nom et prenom", "null", "Full name", "null", "null", "null", "null", "null", "false","null"),
-- contract dengagement
      ("Nom et prenom de l'engagé", "null", "Full name of the participant", "null", "null", "null", "null", "null", "false","null"),
      ("Numero de CIN", "null", "Number of CIN", "null", "null", "null", "null", "null", "null","Le contrat exige cette information"),
      ("CIN delivree le", "null", "CIN issued on", "null", "null", "null", "null", "null", "true","null"),
      ("Indiquer la fonction", "null", "null", "null", "null", "null", "null", "null", "null","null"),
      ("Nom de ma societe", "null", "null", "null", "null", "null", "null", "null", "null","null"),
      ("Identifiant unique", "null", "null", "null", "null", "null", "null", "null", "null","Un identifiant unique (UID ou Unique Identifier en anglais) est une chaîne numérique ou alphanumérique associée à une seule entité au sein d’un système donné. Les UID permettent de s’adresser à cette entité, afin de pouvoir y accéder et interagir avec elle."),
      ("Je m'engage", "null", "null", "null", "null", "null", "null", "null", "null","null"),
      ("Fait le", "n", "n", "n", "n", "n", "n", "n", "true","null"),
      ("à", "n", "n", "n", "n", "n", "n", "n", "true","null"),
-- contract domicielle
  ("Nom et prenom", "null", "Full name", "null", "null", "null", "null", "null", "false","null"),
      ("Numero de carte CIN", "null", "Number of CIN", "null", "null", "null", "null", "null", "null","Le contrat exige cette information"),
      ("CIN delivree le", "null", "CIN issued on", "null", "null", "null", "null", "null", "true","null"),
      ("Raison social", "n", "n", "n", "n", "n", "n", "n", "n","La raison sociale est le nom de votre société, c'est celui par lequel, en principe, elle sera connue de ses clients, de vos partenaires, et du grand public"),
      ("Forme juridique", "n", "n", "n", "n", "n", "n", "n", "n","Il existe cinq formes juridiques principales : l'entreprise individuelle, l'entreprise individuelle à responsabilité limitée, la société de capitaux, l'entreprise unipersonnelle à responsabilité limitée, et la société en nom collectif"),
      ("Capital de la societe", "n", "n", "n", "n", "n", "n", "n", "n","null"),
      ("Adress de local", "n", "n", "n", "n", "n", "n", "n", "n","null"),
      ("A titre", "n", "n", "n", "n", "n", "n", "n", "n","null"),
      ("Fait à", "n", "n", "n", "n", "n", "n", "n", "n","null"),
      ("Fait le", "n", "n", "n", "n", "n", "n", "n", "true","null"),
-- contract de travail
      ("Nom de la societe", "قرض", "Company Name", "part2fr", "part2ar", "part2en", "null", "null", "null","null"),
      ("Activite de la societe", "قرض", "Company activity", "part2fr", "null", "null", "null", "null", "null","null"),
      ("Adress de la societe", "قرض", "null", "Company address", "null", "null", "null", "null", "null","null"),
      ("N° du registre de commerce", "n", "part2fr", "n", "n", "n", "n", "n", "n","Qu'est-ce qu'un numéro RCS ? Le numéro RCS est le numéro d'identification du registre du commerce, il est attribué par l'Institut national de la statistique et des études économiques (Insee) à tous commerçants et sociétés qui s'inscrivent à ce registre"),
      ("civilité de gerant", "قرض", "n", "n", "n", "n", "n", "civilite", "n","null"),
      ("Nom et prenom du gerant", "n", "n", "n", "n", "n", "n", "n", "n","null"),
      ("civilité de l'employe", "n", "n", "n", "n", "n", "n", "civilite", "n","null"),
      ("Nom et prenom du L'emploe", "n", "n", "n", "n", "n", "n", "n", "n","null"),
      ("Statut de L'emploe", "n", "n", "n", "n", "n", "n", "n", "n","null"),
      ("Lieu de naissance", "n", "n", "n", "n", "n", "n", "n", "n","null"),
      ("Date de naissance", "n", "n", "n", "n", "n", "n", "n", "true","null"),
      ("N° de la carte CIN", "n", "n", "n", "n", "n", "n", "n", "n","Le contrat exige cette information"),
      ("CIN delivree", "n", "n", "n", "n", "n", "n", "n", "true","null"),
      ("Adress de L'emploe", "n", "n", "n", "n", "n", "n", "n", "n","null"),
      ("Fonction de L'emploe", "n", "n", "n", "n", "n", "n", "n", "n","null"),
      ("Debut de contract", "n", "n", "n", "n", "n", "n", "n", "true","null"),
      ("Fin de contract", "n", "n", "n", "n", "n", "n", "n", "true","null"),
      ("Salaire mensuel", "n", "n", "n", "n", "n", "n", "n", "n","null"),
      ("Fait a", "n", "n", "n", "n", "n", "n", "n", "n","null"),
      ("Date de contract", "n", "n", "n", "n", "n", "n", "n", "true","null"),
-- contract de location
      ("Nom et prenom de proprietaire le bailleur", "null", "null", "null", "null", "null", "null", "null", "false","null"),
      ("Nom et prenom de locataire", "n", "n", "n", "n", "n", "n", "n", "false","null"),
      ("Type de propriete", "n", "n", "n", "n", "n", "n", "n", "false","null"),
      ("Adress de propriete", "n", "n", "n", "n", "n", "n", "n", "false","null"),
      ("Duree de la location", "n", "n", "n", "n", "n", "n", "n", "false","null"),
      ("Location a partir de ", "n", "n", "n", "n", "n", "n", "n", "true","null"),
      ("Jusqu'a", "n", "n", "n", "n", "n", "n", "n", "true","null"),
      ("Montant du loyer", "n", "n", "n", "n", "n", "n", "n", "false","null"),
      ("Date du contrat", "n", "n", "n", "n", "n", "n", "n", "true","null");


-- insert question-has-contracttype 
INSERT INTO etafakna.questions_has_contract_types(questions_id,contract_types_id,order_question)
VALUES 
(1,20, 1),
( 2,20, 2),
( 3,20, 3),
( 4,20, 4),
( 5,20, 5),
( 6,20, 6),
( 7,20, 7),
( 8,20, 8),
( 9,20, 9),
( 10,20, 10),
( 11,20, 11),

( 12,34, 1),
( 13,34, 2),
( 14,34, 3),
( 15,34, 4),
( 16,34, 5),
( 17,34, 6),

( 18,27, 1),
( 19,27, 2),
( 20,27, 3),
( 21,27, 4),
( 22,27, 5),
( 23,27, 6),
( 24,27, 7),
( 24,27, 8),
( 24,27, 9),
( 25,27, 10),
( 26,27, 11),

( 27,33, 1),
( 28,33, 2),
( 29,33, 3),
( 30,33, 4),
( 31,33, 5),
( 32,33, 6),
( 33,33, 7),
( 34,33, 8),
( 35,33, 9),
( 36,33, 10),

( 37,18, 1),
( 38,18, 2),
( 39,18, 3),
( 40,18, 4),
( 41,18, 5),
( 42,18, 6),
( 43,18, 7),
( 44,18, 8),
( 45,18, 9),
( 46,18, 10),
( 47,18, 11),
( 48,18, 12),
( 49,18, 13),
( 50,18, 14),
( 51,18, 15),
( 52,18, 16),
( 53,18, 17),
( 54,18, 18),
( 55,18, 19),
( 56,18, 20),

( 57,26, 1),
( 58,26, 2),
( 59,26, 3),
( 60,26, 4),
( 61,26, 5),
( 62,26, 6),
( 63,26, 7),
( 64,26, 8),
( 65,26, 9),
( 66,26, 10);







-- Insert All Contracts
INSERT INTO etafakna.users(first_name,last_name,username,email,password,address,phone,role,image,status,created_at)
VALUES("fares","fares","fares","faroussassg007@gmail.com","$2b$10$sIzEhADNfPcEOUCO7ILtAunEbf8Y9YVQt2/gTaZ0TvHvNA3bN6U1O","boumhale","122883","user","https://res.cloudinary.com/dew6e8h2m/image/upload/v1664624355/cld-sample.jpg","Activated","2022-09-29"),
      ("omar","omar","omar","massoudiomar@gmail.com","$2b$10$sIzEhADNfPcEOUCO7ILtAunEbf8Y9YVQt2/gTaZ0TvHvNA3bN6U1O","boumhale","122883","user","https://res.cloudinary.com/dew6e8h2m/image/upload/v1664624356/cld-sample-3.jpg","Activated","2022-09-29");

-- Insert All Contracts
INSERT INTO etafakna.contract_types(signed_time,time_answering,title_EN,title_FR,title_AR,description_FR,description_AR,description_EN,image_url,template_FR,template_AR,template_EN,country)
VALUES(0,5,"NDA","Accord de non-divulgation(NDA)","اتفاقية عدم إفصاح","Anything can be rented using E-tafakna e-greement... From a room, to an appartement or a car...","desc_AR","desc_EN","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457759/unnamed_1_1_lzrkcv.png","https://res.cloudinary.com/dew6e8h2m/raw/upload/v1665084720/contract1_isna08_1_part1_esqffs.docx,https://res.cloudinary.com/dew6e8h2m/raw/upload/v1665084831/contract2_fiwvof_part2_i550oc.docx","https://res.cloudinary.com/dew6e8h2m/raw/upload/v1665084720/contract1_isna08_1_part1_esqffs.docx,https://res.cloudinary.com/dew6e8h2m/raw/upload/v1665084831/contract2_fiwvof_part2_i550oc.docx","https://res.cloudinary.com/dew6e8h2m/raw/upload/v1665084720/contract1_isna08_1_part1_esqffs.docx,https://res.cloudinary.com/dew6e8h2m/raw/upload/v1665084831/contract2_fiwvof_part2_i550oc.docx","Tunisia"),
      (0,5,"CDI, CDD, CIVP","CDI, CDD, Civp","CDI, CDD, CIVP","This is Description","desc_AR","desc_EN","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457759/unnamed_2_1_ztst4g.png","temp_FR","temp_AR","temp_EN","Tunisia"),
      (0,5,"Training Certificate","Attestation de stage","شهادة تدريب","Au sens le plus large, une attestation de formation est un document attestant que le titulaire a suivi une formation spécifique","desc_AR","In the broadest sense, a training certificate is a document certifying that the holder has taken a specific course of training.
","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457759/unnamed_3_1_bumvz0.png","https://res.cloudinary.com/e-tafakna/raw/upload/v1664543960/Attestation-de-stage_n2_rjvm0l.docx","https://res.cloudinary.com/dew6e8h2m/raw/upload/v1665051324/Attestation-de-stage_en1_sxoacs.docx","https://res.cloudinary.com/dew6e8h2m/raw/upload/v1665051324/Attestation-de-stage_en1_sxoacs.docx","Tunisia"),
      (0,5,"Freelancer","Freelance","مستقل","This is Freelancer Description","desc_AR","desc_EN","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457758/unnamed_4_1_fzraz8.png","temp_FR","temp_AR","temp_EN","Tunisia"),
      (0,5,"Microcredit","Contrat de Prêt numéraire (microcrédit) ","قرض","This is loan Description","desc_AR","desc_EN","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457758/unnamed_5_1_exbhco.png","temp_FR","temp_AR","temp_EN","Tunisia"),
      (0,5,"Car rental","Location de voiture","كراء سيارة","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457758/unnamed_6_1_owmpwk.png","temp_FR","temp_AR","temp_EN","Tunisia"),
      (0,5,"Car sale","Achat de voiture","بيع سيارة","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457758/unnamed_7_1_evodld.png","temp_FR","temp_AR","temp_EN","Tunisia"),
      (0,5,"Rental of real estate","Location de biens","Referencement","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457757/unnamed_16_1_drpr0x.png","temple_FR","temp_AR","temp_EN","Tunisia"),
      (0,5,"Sale","Vente","عقد كراء","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457757/unnamed_10_1_wbb9lm.png","https://res.cloudinary.com/dew6e8h2m/raw/upload/v1664737567/Template_Contrat_de_location_bureau_n3_xvsszr.docx","https://res.cloudinary.com/dew6e8h2m/raw/upload/v1664737567/Template_Contrat_de_location_bureau_n3_xvsszr.docx","https://res.cloudinary.com/dew6e8h2m/raw/upload/v1664737567/Template_Contrat_de_location_bureau_n3_xvsszr.docx","Tunisia"),
      (0,5,"Purchase","Achat","Contrat d’engagement ","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457758/unnamed_9_1_pmtbst.png","https://res.cloudinary.com/e-tafakna/raw/upload/v1664562844/Engagement_contract_n2_x14mz3.docx","https://res.cloudinary.com/e-tafakna/raw/upload/v1664562844/Engagement_contract_n2_x14mz3.docx","https://res.cloudinary.com/e-tafakna/raw/upload/v1664562844/Engagement_contract_n2_x14mz3.docx","Tunisia"),
      (0,5,"Partnership","Partenariat","شراكة","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457757/unnamed_18_1_fssujl.png","temp_FR","temp_AR","temp_EN","Tunisia"),
      (0,5,"Quotation/Bill","Devis/Facture ","Devis/Facture ","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457757/unnamed_13_1_klfbym.png","temp_FR","temp_AR","temp_EN","Tunisia"),
      (0,5,"Travel insurance","Assurance Voyage","Assurance Voyage","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457757/unnamed_12_1_mol4hi.png","temp_FR","temp_AR","temp_EN","Tunisia"),
      (0,5,"Idea registration","Enregistrement d'une idée","Enregistrement d'une idée","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457757/unnamed_11_1_rkyp58.png","temp_FR","temp_AR","temp_EN","Tunisia"),
      (0,5,"CV","CV","أمر شراء","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457757/unnamed_15_1_ubzxye.png","temp_FR","temp_AR","temp_EN","Tunisia"),
      (0,5,"Safe of real estate","Contrat de Domiciliation","Contrat de Domiciliation","This is Employment Contract Description","desc_AR","desc_EN","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457757/unnamed_17_1_mejvek.png","https://res.cloudinary.com/dew6e8h2m/raw/upload/v1664625501/Attestation_de_Domiciliation_n2_anigf5.docx","temp_AR","temp_EN","Tunisia"),
      (0,5,"Official request","Demande officielle", "طلب رسمي" ,"This is demande  Description","desc_AR","desc_EN","https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457757/unnamed_17_1_mejvek.png","https://res.cloudinary.com/e-tafakna/raw/upload/v1664546377/Demande_officielle_n4_m4cbe4.docx","temp_AR","temp_EN","Tunisia");
