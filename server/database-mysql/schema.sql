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

CREATE SCHEMA IF NOT EXISTS `etafakna` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

USE `etafakna`;

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
  `description_EN` VARCHAR(1000) NULL DEFAULT NULL,
  `description_FR` VARCHAR(1000) NULL DEFAULT NULL,
  `description_AR` VARCHAR(1000) NULL DEFAULT NULL,
  `image_url` VARCHAR(200) NOT NULL,
  `template_EN` VARCHAR(1000) NULL DEFAULT NULL,
  `template_FR` VARCHAR(1000) NULL DEFAULT NULL,
  `template_AR` VARCHAR(1000) NULL DEFAULT NULL,
  `country` VARCHAR(10) NULL DEFAULT NULL,
  `types` VARCHAR(10) NULL DEFAULT NULL,
  `categories` VARCHAR(10) NULL DEFAULT NULL,
  `inside_categories` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 18 DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;




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
  CONSTRAINT `fk_contracts_contract_types1` FOREIGN KEY (`contract_types_id`) REFERENCES `etafakna`.`contract_types` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `etafakna`.` 
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `etafakna`.`questions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content_FR` VARCHAR(100) NOT NULL,
  `content_AR` VARCHAR(100) NOT NULL,
  `content_EN` VARCHAR(100) NOT NULL,
  `part2_FR` VARCHAR(50) NULL,
  `part2_AR` VARCHAR(50) NULL,
  `part2_EN` VARCHAR(50) NULL,
  `inputType` LONGTEXT NOT NULL,
  `options` VARCHAR(250),
  `date` VARCHAR(10) NOT NULL,
  `explanation` VARCHAR(1000),
  `text_Area` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci;

-- -----------------------------------------------------
-- Table `etafakna`.`answers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `etafakna`.`answers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(50) NOT NULL,
  `contracts_id` INT NOT NULL,
  `contracts_contract_types_id` INT NOT NULL,
  `questions_id` INT NOT NULL,
  PRIMARY KEY (
    `id`,
    `contracts_id`,
    `contracts_contract_types_id`,
    `questions_id`
  ),
  INDEX `fk_answers_questions2_idx` (`questions_id` ASC) VISIBLE,
  CONSTRAINT `fk_answers_questions1` FOREIGN KEY (`contracts_id`, `contracts_contract_types_id`) REFERENCES `etafakna`.`contracts` (`id`, `contract_types_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_answers_questions2` FOREIGN KEY (`questions_id`) REFERENCES `etafakna`.`questions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
  CONSTRAINT `fk_questions_has_contract_types_contract_types1` FOREIGN KEY (`contract_types_id`) REFERENCES `etafakna`.`contract_types` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_questions_has_contract_types_questions` FOREIGN KEY (`questions_id`) REFERENCES `etafakna`.`questions` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
  `image` VARCHAR(200),
  `status` VARCHAR(200) NOT NULL,
  `created_at` DATE NULL DEFAULT NULL,
  `notification` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
  CONSTRAINT `fk_users_has_contracts_contracts1` FOREIGN KEY (`contracts_id`) REFERENCES `etafakna`.`contracts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_users_has_contracts_users1` FOREIGN KEY (`owner`) REFERENCES `etafakna`.`users` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
  CONSTRAINT `fk_users_has_notification_notification` FOREIGN KEY (`contracts_id`) REFERENCES `etafakna`.`contracts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_users_has_notification_users1` FOREIGN KEY (`owner`) REFERENCES `etafakna`.`users` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

SET SQL_MODE = @OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;

-- insert questions 
INSERT INTO etafakna.questions(content_FR,content_AR,content_EN,part2_FR,part2_AR,part2_EN,inputType,options,date,explanation,text_Area)
VALUES

-- CONTRACT Demande Officielle
   (
    "A l'attention",
    N'الانتباه الى',
    "To the attention of",
    "du destinataire",
    N'المرسل إليه',
    N'Recipient',
    "null",
    "civilite",
    "false",
    "null",
    "null"
  ),
   (
    N'Votre nom et prénom',
    N'اسمك الأول والأخير',
    "Full name",
    "Nom du destinataire",
    N'اسم المرسل إليه',
    N'Recipient`s name',
    "null",
    "null",
    "false",
    "null",
    "null"
  ),
  (
    N'Quel est l‘objet de votre demande',
    N'ما هو الغرض من طلبك',
    "What is the purpose of your request",
    "null",
    "null",
    "null",
    "null",
    "null",
    "false",
    "null",
    "null"
  ),
  (
    N'Veuillez préciser votre demande',
    N'يرجى تحديد طلبك',
    "Please specify your request",
    "null",
    "null",
    "null",
    "null",
    "null",
    "false",
    "null",
    "textArea"
  ),
  (
    N'Fait à',
    "null",
    "Made in",
    N'Veuillez préciser votre gouvernorat',
    N'يرجى تحديد محافظتك',
    "Please specify your governorate",
    "null",
    "null",
    "false",
    "null",
    "null"
  ),
  (
    "Date",
    N'تاريخ',
    "Date",
    "null",
    "null",
    "null",
    "null",
    "null",
    "true",
    "null",
    "null"
  ),
  (
    N'Votre nom et prénom',
    N'اسمك الأول والأخير',
    "Full name",
    "du demandeur",
    "null",
    "null",
    "null",
    "null",
    "false",
    "null",
    "null"
  ),
  -- --CONTRACT DE TRAVAILLE
  (
    N'Nom de la société',
    "karth",
    "Company Name",
    "null",
    "part2ar",
    "part2en",
    "null",
    "null",
    "null",
    "prrrrrrr",
    "null"
  ),
  (
    N'Activité de la société',
    N'قرض',
    "Company activity",
    "null",
    "null",
    "null",
    "null",
    "null",
    "null",
    "null",
    "null"
  ),
  (
    N'Adresse de la société',
    N'قرض',
    "null",
    "null",
    "null",
    "null",
    "null",
    "null",
    "null",
    "null",
    "null"
  ),
  (
    N'N° du registre de commerce',
    "null",
    "part2fr",
    "null",
    "null",
    "null",
    "null",
    "null",
    "null",
    "null",
    "null"
  ),
  (
    N'Civilité',
    N'قرض',
    "Civility",
    N'Du gérant',
    N'من المدير',
    "of manager",
    "n",
    "civilite",
    "n",
    "null",
    "null"
  ),
  (
    N'Nom et prénom',
    N'الإسم واللقب',
    "Full name",
    N'du gérant(e)',
    N'من المدير',
    "Of the manager",
    "n",
    "n",
    "n",
    "null",
    "null"
  ),
  (
    N'Civilité',
    "n",
    "n",
    N'du l`employé',
    "n",
    "n",
    "n",
    "civilite",
    "n",
    "null",
    "null"
  ),
  (
    N'Nom et prénom',
    N'الإسم واللقب',
    "Full name",
    N'de l`employé',
    "n",
    "n",
    "n",
    "n",
    "n",
    "null",
    "null"
  ),
  (
    "Statut",
    "n",
    "n",
    N'de l`employé',
    "n",
    "n",
    "n",
    "status",
    "n",
    "null",
    "null"
  ),
  (
    "Lieu de naissance",
    N'مكان الولادة',
    "Place of birth",
    "null",
    "n",
    "n",
    "n",
    "n",
    "n",
    "null",
    "null"
  ),
  (
    "Date de naissance",
    N'تاريخ الميلاد',
    "Date of Birth",
    "null",
    "n",
    "n",
    "n",
    "n",
    "true",
    "null",
    "null"
  ),
  (
    N'Numéro de la carte d identité',
    N'رقم بطاقة الهوية',
    "Identity card number",
    "null",
    "n",
    "n",
    "n",
    "n",
    "n",
    "null",
    "null"
  ),
  (
    N'CIN délivrée le',
    "n",
    "n",
    "null",
    "n",
    "n",
    "n",
    "n",
    "true",
    "null",
    "null"
  ),
  (
    "Adresse",
    "n",
    "n",
    N'de l`employé',
    "n",
    "n",
    "n",
    "n",
    "n",
    "null",
    "null"
  ),
  (
    "Fonction",
    "n",
    "n",
    N'de l`employé',
    "n",
    "n",
    "n",
    "n",
    "n",
    "null",
    "null"
  ),
  (
    N'Début du contrat',
    "n",
    "n",
    "null",
    "n",
    "n",
    "n",
    "n",
    "true",
    "null",
    "null"
  ),
  (
    "Fin du contract",
    "n",
    "n",
    "null",
    "n",
    "n",
    "n",
    "n",
    "true",
    "null",
    "null"
  ),
  (
    "Salaire mensuel",
    "n",
    "n",
    "null",
    "n",
    "n",
    "n",
    "n",
    "n",
    "null",
    "null"
  ),
  (
    N'Fait à',
    "n",
    "n",
    "null",
    "n",
    "n",
    "n",
    "n",
    "n",
    "null",
    "null"
  ),
  (
    "Date du contract",
    "n",
    "n",
    "null",
    "n",
    "n",
    "n",
    "n",
    "true",
    "null",
    "null"
  ),
  -- -- contract de location a usage administratif
   (
     N'Civilité',
     "n",
     "n",
     "Le bailleur",
     "n",
     "n",
     "n",
     "civilite",
     "n",
     "null",
     "null"
   ),
   (
     N'Nom et prénom du propriétaire',
     "null",
     "null",
     "Le bailleur",
     "null",
     "null",
     "null",
     "null",
     "false",
     "null",
     "null"
   ),
    (
     N'Civilité',
     "n",
     "n",
     "Le locataire",
     "n",
     "n",
     "n",
     "civilite",
     "n",
     "null",
     "null"
   ),
   (
     N'Nom et prénom',
     "n",
     "n",
     "Le locataire",
     "n",
     "n",
     "n",
     "n",
     "false",
     "null",
     "null"
   ),
  
   (
     N'Type de propriété',
     "n",
     "n",
     "null",
     "n",
     "n",
     "n",
     "n",
     "false",
     "null",
     "null"
   ),
   (
     N'Adresse de la propriété',
     "n",
     "n",
     "null",
     "n",
     "n",
     "n",
     "n",
     "false",
     "null",
     "null"
   ),
   (
     N'Durée de la location',
     "n",
     "n",
     "null",
     "n",
     "n",
     "n",
     "n",
     "false",
     "null",
     "null"
   ),
   (
     N'Location à partir de',
     "n",
     "n",
     "null",
     "n",
     "n",
     "n",
     "n",
     "true",
     "null",
     "null"
   ),
   (
     N'Jusqu`à',
     "n",
     "n",
     "null",
     "n",
     "n",
     "n",
     "n",
     "true",
     "null",
     "null"
   ),
   (
     "Montant du loyer",
     "n",
     "n",
     "en dinars",
     "n",
     "n",
     "n",
     "n",
     "false",
     "null",
     "null"
   ),
   (
     N'Contrat fait à',
     "n",
     "n",
     "null",
     "n",
     "n",
     "n",
     "n",
     "false",
     "null",
     "null"
   ),
   (
     "Date du contrat",
     "n",
     "n",
     "null",
     "n",
     "n",
     "n",
     "n",
     "true",
     "null",
     "null"
   ),
-- CONTRACT DE LOCATION à usage d'habitation
 (
     N'Civilité',
     "n",
     "n",
     N'Le propriétaire',
     "n",
     "n",
     "n",
     "civilite",
     "n",
     "null",
     "null"
   ),
    (
      N'Entrez le nom et prénom',
      N'الإسم واللقب',
      "Full name",
      N'Le propriétaire',
      N'prop',
      N'Le propriétaire',
      "null",
      "null",
      "null",
      "null",
      "null"
    ),
     (
      N'Demeurant à',
      N'demeurant',
      "Full name",
      N'Le propriétaire',
      N'prop',
      N'Le propriétaire',
      "null",
      "null",
      "null",
      "null",
      "null"
    ),
    (
      N'N° de la CIN',
      N'الإسم واللقب',
      "Full name",
      N'Le propriétaire',
      N'prop',
      N'Le propriétaire',
      "null",
      "null",
      "null",
      "null",
      "null"
    ),
     (
      N'CIN délivrée le',
      N'الإسم واللقب',
      "Full name",
      N'Le propriétaire',
      N'prop',
      N'Le propriétaire',
      "null",
      "null",
      "null",
      "null",
      "null"
    ),
     (
     N'Civilité',
     "n",
     "n",
     N'Le locataire',
     "n",
     "n",
     "n",
     "civilite",
     "n",
     "null",
     "null"
   ),
     (
      N'Entrez le nom et prénom',
      N'الإسم واللقب',
      "Full name",
      N'Le locataire',
      N'prop',
      N'Le propriétaire',
      "null",
      "null",
      "null",
      "null",
      "null"
    ),
     (
      N'Entrez la nationalité',
      N'الإسم واللقب',
      "Full name",
      N'Le locataire',
      N'prop',
      N'Le propriétaire',
      "null",
      "null",
      "null",
      "null",
      "null"
    ),
    (
      N'Date de naissance',
      N'تاريخ بدء التدريب',
      "Internship start date",
      "Le locataire",
      "null",
      "Beginning",
      "true",
      "null",
      "true",
      "null",
      "null"
    ),
     (
      N'N° de la CIN',
      N'الإسم واللقب',
      "Full name",
      N'Le locataire',
      N'prop',
      N'Le propriétaire',
      "null",
      "null",
      "null",
      "null",
      "null"
    ),
      (
      N'CIN délivrée le',
      N'تاريخ بدء التدريب',
      "Internship start date",
      "Le locataire",
      "null",
      "Beginning",
      "true",
      "null",
      "true",
      "null",
      "null"
    ),
     (
      N'Demeurant à',
      N'demeurant',
      "Full name",
      N'Le locataire',
      N'prop',
      N'Le locataire',
      "null",
      "null",
      "null",
      "null",
      "null"
    ),
    (
      N'Décrivez le type de propriété',
      N'demeurant',
      "Full name",
      N'null',
      N'prop',
      N'Le locataire',
      "null",
      "typeproprite",
      "null",
      "null",
      "null"
    ),
     (
      N'Adresse de la propriété',
      N'demeurant',
      "Full name",
      N'Rue, code postal et gouvernorat',
      N'prop',
      N'Le locataire',
      "null",
      "null",
      "null",
      "null",
      "null"
    ),
      (
      N'Durée de la location',
      N'demeurant',
      "Full name",
      N'Rue, code postal et gouvernorat',
      N'prop',
      N'Le locataire',
      "null",
      "null",
      "null",
      "null",
      "null"
    ),
      (
      N'Date de début de la location',
      N'تاريخ بدء التدريب',
      "Internship start date",
      "null",
      "null",
      "Beginning",
      "true",
      "null",
      "true",
      "null",
      "null"
    ),
       (
      N'Date de fin de la location',
      N'تاريخ بدء التدريب',
      "Internship start date",
      "null",
      "null",
      "Beginning",
      "true",
      "null",
      "true",
      "null",
      "null"
    ),
        (
      N'Montant de la location en TND',
      N'demeurant',
      "Full name",
      N'null',
      N'prop',
      N'Le locataire',
      "null",
      "null",
      "null",
      "null",
      "null"
    ),
    (
      N'Location est :',
      N'demeurant',
      "Full name",
      N'null',
      N'prop',
      N'Le locataire',
      "null",
      "null",
      "null",
      "null",
      "null"
    ),
     (
      N'Montant du cautionnement en TND',
      N'demeurant',
      "Full name",
      N'null',
      N'prop',
      N'null',
      "null",
      "null",
      "null",
      "null",
      "null"
    ),
     (
      N'Prise en charge des consommations (eau/électricité) par',
      N'demeurant',
      "Full name",
      N'null',
      N'prop',
      N'null',
      "null",
      "locprop",
      "null",
      "null",
      "null"
    ),
    (
      N'Date du contrat',
      N'تاريخ بدء التدريب',
      "Internship start date",
      "null",
      "null",
      "Beginning",
      "true",
      "null",
      "true",
      "null",
      "null"
    ),

-- contract dengagement
   (
     N'Civilité',
     "n",
     "n",
     N'de l`engagé',
     "n",
     "n",
     "n",
     "civilite",
     "n",
     "null",
     "null"
   ),
   (
     N'Nom et prénom',
     N'الإسم واللقب',
     "Full name",
     N'de l`engagé',
     N'من المشارك',
     "Of the participant",
     "null",
     "null",
     "false",
     "null",
     "null"
   ),
   (
    N'Numéro de CIN',
     "null",
     "Number of CIN",
     "null",
     "null",
     "null",
     "null",
     "null",
     "null",
     "null",
     "null"
   ),
   (
     N'CIN délivrée le',
     "null",
     "CIN issued on",
     "null",
     "null",
     "null",
     "null",
     "null",
     "true",
     "null",
     "null"
   ),
   (
     "Indiquer la fonction",
     "null",
     "null",
     "null",
     "null",
     "null",
     "null",
     "null",
     "null",
     "null",
     "null"
   ),
   (
     N'Nom de ma société',
     "null",
     "null",
     "null",
     "null",
     "null",
     "null",
     "null",
     "null",
     "null",
     "null"
   ),
   (
     "Identifiant unique",
     "null",
     "null",
     "null",
     "null",
     "null",
     "null",
     "null",
     "null",
     "null",
     "null"
   ),
   (
     N'Je m`engage',
     "null",
     "null",
     "null",
     "null",
     "null",
     "null",
     "null",
     "null",
     "null",
     "null"
   ),
   (
     "Fait le",
     "n",
     "n",
     "null",
     "n",
     "n",
     "n",
     "n",
     "true",
     "null",
     "null"
   ),
   (
     N'Fait à',
     "n",
     "n",
     "null",
     "n",
     "n",
     "n",
     "n",
     "null",
     "null",
     "null"
   ),
  --   contract domicilliation
    (
      N'Nom et prénom',
      "null",
      "Full name",
      "null",
      "null",
      "null",
      "null",
      "null",
      "false",
      "null",
      "null"
    ),
    (
      N'Numéro de carte CIN',
      "null",
      "Number of CIN",
      "null",
      "null",
     "null",
     "null",
     "null",
     "null",
     "null",
      "null"
   ),
   (
     N'CIN délivrée le',
     "null",
     "CIN issued on",
     "null",
     "null",
     "null",
     "null",
     "null",
     "true",
     "null",
      "null"
   ),
   (
     "Raison social",
     "n",
     "n",
     "nom de la societe",
     "n",
     "n",
     "n",
     "n",
     "n",
     "null",
      "null"
   ),
   (
     "Forme juridique",
     "n",
     "n",
     "null",
     "n",
     "n",
     "n",
     "form",
     "n",
     "null",
      "null"
   ),
   (
     N'Capital de la société',
     "n",
     "n",
     "null",
     "n",
     "n",
     "n",
     "n",
     "n",
     "null",
      "null"
   ),
   (
     "Adress du local",
     "n",
     "n",
     N'(du local/du siège)',
     "n",
     "n",
     "n",
     "n",
     "n",
     "null",
      "null"
   ),
   (
     N'À titre',
     "n",
     "n",
     "null",
     "n",
     "n",
     "n",
     "titre",
     "n",
     "null",
      "null"
   ),
   (
    N'Fait à',
    "n",
    "n",
    "null",
    "n",
    "n",
    "n",
    "n",
    "n",
    "null",
    "null"
  ),
  (
    "Fait le",
    "n",
    "n",
    "null",
    "n",
    "n",
    "n",
    "n",
    "true",
    "null",
    "null"
  ),

-- Attestation de stage 
 (
    N'Civilité',
     "arabe",
     "Civility",
     "Employeur",
     N'صاحب العمل',
     "Employer",
     "civilite",
     "civilite",
     "null",
     "null",
     "null"
   ),
   (
     N'Nom et prénom',
     N'الإسم واللقب',
     "Full name",
     "(Employeur)",
     N'صاحب العمل',
     "(Employer)",
     "null",
     "null",
     "null",
     "null",
     "null"
   ),
   (
     N'Sélectionnez le poste dans l`entreprise',
     N'حدد الوظيفة في الشركة',
     "Select the position in the company",
     "null",
     "null",
     "null",
     "null",
     "null",
     "null",
     "null",
     "null"
   ),
   (
     N'Civilité',
     "civilite",
     "Civility",
     "Stagiare",
     "null",
     "The intern",
     "null",
     "civilite",
     "null",
     "null",
     "null"
   ),
   (
     N'Nom et prénom',
     N'الإسم واللقب',
     "Full name",
     "(Stagiare)",
     "(Stagiare)",
     "(The intern)",
     "null",
     "null",
     "null",
     "null",
     "null"
   ),
   (
     "Adresse du Stagiare",
     N'عنوان المتدرب',
     "Trainee's address",
     "null",
     "null",
     "The intern",
     "null",
     "null",
     "null",
     "null",
     "null"
   ),
   (
     N'Nom de l`entreprise',
     N'اسم الشركة',
     "Company Name",
     "null",
     "null",
     "null",
     "null",
     "null",
     "null",
     "null",
     "null"
   ),
   (
     N'Date du début de stage',
     N'تاريخ بدء التدريب',
     "Internship start date",
     "null",
     "null",
     "Beginning",
     "true",
     "null",
     "true",
     "null",
     "null"
   ),
   (
     "Date de fin du stage",
     N'تاريخ انتهاء فترة التدريب',
     "Internship end date",
     "null",
     "null",
     "End",
     "true",
     "null",
     "true",
     "null",
     "null"
   ),
   (
     N'Sélectionnez le poste dans l`entreprise',
     N'حدد الوظيفة في الشركة',
     "Select the position in the company",
     "Stagiaire",
     N'المتدرب',
     "Intern",
     "null",
     "null",
     "null",
     "null",
     "null"
   ),
   (
     "Fait le",
     "null",
     "The date today",
     "null",
     "null",
     "null",
     "null",
     "null",
     "true",
     "null",
     "null"
   );
INSERT INTO etafakna.questions(id,content_FR,content_AR,content_EN,part2_FR,part2_AR,part2_EN,inputType,options,date,explanation,text_Area)
VALUES


   (93, 'Quel est le nom de votre Société ?', 'Quel est le nom de votre Société ?', 'Quel est le nom de votre Société ?', 'n', 'n', 'n', 'n', NULL, 'n', 'n', 'null'),
(94, 'Quel est votre gouvernorat ?', ' Quel est votre gouvernorat ?', ' Quel est votre gouvernorat ?', 'n', 'n', 'n', 'n', NULL, 'n', 'n', 'null'),
(95, 'Quel est la date de votre facture ?', ' Quel est la date de votre facture ?', ' Quel est la date de votre facture ?', 'n', 'n', 'n', 'n', NULL, 'true', 'n', 'null'),
(97, 'Quel est le nom de la société de votre client ?', ' Quel est le nom de la société de votre client ?', ' Quel est le nom de la société de votre client ?', 'n', 'n', 'n', 'n', NULL, 'n', 'n', 'null'),
(98, 'Quel est la Matricule Fiscale de votre client ?', 'Quel est la Matricule Fiscale de votre client ?', 'Quel est la Matricule Fiscale de votre client ?', 'n', 'n', 'n', 'n', NULL, 'n', 'n', 'null'),
(99, 'Quel est le numéro de votre facture ?', 'Quel est le numéro de votre facture ?', 'Quel est le numéro de votre facture ?', 'n', 'n', 'n', 'n', NULL, 'n', 'n', 'null'),
(100, 'Quel est l’année de la facture ?', 'Quel est l’année de la facture ?', 'Quel est l’année de la facture ?', 'n', 'n', 'n', 'n', NULL, 'n', 'n', 'null'),
(101, 'Insérez le nom de votre produit ?', 'Insérez le nom de votre produit ?', 'Insérez le nom de votre produit ?', 'n', 'n', 'n', 'n', NULL, 'n', 'n', 'null'),
(102, 'Insérez la quantité de ce produit?', 'Insérez la quantité de ce produit?', 'la quantité de ce produit ?', 'n', 'n', 'n', 'n', NULL, 'n', 'n', 'null'),
(103, 'Insérez le prix du produit', 'Insérez le prix du produit', 'Insérez le prix du produit', 'n', 'n', 'n', 'n', NULL, 'n', 'n', 'null'),
(104, 'Quel est l’adresse de votre société?', 'Quel est l’adresse de votre société?', 'Quel est l’adresse de votre société?', 'n', 'n', 'n', 'n', NULL, 'n', 'n', 'null'),
(105, 'Quel est la Matricule Fiscale de votre société ?', 'Quel est la Matricule Fiscale de votre société ?', 'Quel est la Matricule Fiscale de votre société?', 'n', 'n', 'n', 'n', NULL, 'n', 'n', 'null'),
(106, 'Quel est votre code postale ', 'Quel est la Matricule Fiscale de votre société ?', 'Quel est la Matricule Fiscale de votre société?', 'n', 'n', 'n', 'n', NULL, 'n', 'n', 'null'),
(107, 'Quel est la somme de la facture', 'Quel est la somme de la facture', 'Quel est la somme de la facture', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'null'),
(109, 'Quelle est les nombre des Produit', 'Quelle est les nombre des Produit', 'Quelle est les nombre des Produit', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n');

  
  
  

-- insert question-has-contracttype 
INSERT INTO
  etafakna.questions_has_contract_types(questions_id, contract_types_id, order_question)
VALUES

 -- Questions Demande Officielle
   (1, 34, 1),
   (2, 34, 2),
   (3, 34, 3),
   (4, 34, 4),
   (5, 34, 5),
   (6, 34, 6),
   (7, 34, 7),

-- CONTRACT DE TRAVAILLE
   (8, 36, 1),
   (9, 36, 2),
   (10, 36, 3),
   (11, 36, 4),
   (12, 36, 5),
   (13, 36, 6),
   (14, 36, 7),
   (15, 36, 8),
   (16, 36, 9),
   (17, 36, 10),
   (18, 36, 11),
   (19, 36, 12),
   (20, 36, 13),
   (21, 36, 14),
   (22, 36, 15),
   (23, 36, 16),
   (24, 36, 17),
   (25, 36, 18),
   (26, 36, 19),
   (27, 36, 20),


-- CONTRACT DE LOCATION A USAGE ADMINISTRATIF
   
   (28, 38, 1),
   (29, 38, 2),
   (30, 38, 3),
   (31, 38, 4),
   (32, 38, 5),
   (33, 38, 6),
   (34, 38, 7),
   (35, 38, 8),
   (36, 38, 9),
   (37, 38, 10),
   (38, 38, 11),
   (39, 38, 12),

-- CONTRACT DE LOCATION  à usage d'habitation
   (40, 39, 1),
   (41, 39, 2),
   (42, 39, 3),
   (43, 39, 4),
   (44, 39, 5),
   (45, 39, 6),
   (46, 39, 7),
   (47, 39, 8),
   (48, 39, 9),
   (49, 39, 10),
   (50, 39, 11),
   (51, 39, 12),
   (52, 39, 13),
   (53, 39, 14),
   (54, 39, 15),
   (55, 39, 16),
   (56, 39, 17),
   (57, 39, 18),
   (58, 39, 19),
   (59, 39, 20),
   (60, 39, 21),
   (61, 39, 22),

-- CONTRACT DENGAGEMENT
  (62, 27, 1),
  (63, 27, 2),
  (64, 27, 3),
  (65, 27, 4),
  (66, 27, 5),
  (67, 27, 6),
  (68, 27, 7),
  (69, 27, 8),
  (70, 27, 9),
  (71, 27, 10),


-- Contrat de Domiciliation
  (72, 33, 1),
  (73, 33, 2),
  (74, 33, 3),
  (75, 33, 4),
  (76, 33, 5),
  (77, 33, 6),
  (78, 33, 7),
  (79, 33, 8),
  (80, 33, 9),
  (81, 33, 10),


-- Contrat de attestation de stage
  (82, 20, 1),
  (83, 20, 2),
  (84, 20, 3),
  (85, 20, 4),
  (86, 20, 5),
  (87, 20, 6),
  (88, 20, 7),
  (89, 20, 8),
  (80, 20, 9),
  (91, 20, 10),
  (92, 20, 11) ;
INSERT INTO
  etafakna.questions_has_contract_types(id,questions_id, contract_types_id, order_question)
VALUES

  (93, 93, 40, 1),
(96, 94, 40, 2),
(97, 95, 40, 3),
(99, 97, 40, 5),
(100, 98, 40, 6),
(101, 99, 40, 7),
(102, 100, 40, 8),
(103, 101, 40, 10),
(104, 102, 40, 11),
(105, 103, 40, 12),
(106, 104, 40, 13),
(107, 105, 40, 14),
(110, 106, 40, 15),
(113, 107, 40, 16),
(114, 109, 40, 9);



 
-- Insert All Contracts
INSERT INTO
  etafakna.users(
    first_name,
    last_name,
    username,
    email,
    password,
    address,
    phone,
    role,
    image,
    status,
    created_at
  )
VALUES
(
    "fares",
    "fares",
    "fares",
    "faroussassg007@gmail.com",
    "$2b$10$sIzEhADNfPcEOUCO7ILtAunEbf8Y9YVQt2/gTaZ0TvHvNA3bN6U1O",
    "boumhale",
    "122883",
    "user",
    "https://res.cloudinary.com/dew6e8h2m/image/upload/v1664624355/cld-sample.jpg",
    "Activated",
    "2022-09-29"
  ),
  (
    "omar",
    "omar",
    "omar",
    "massoudiomar@gmail.com",
    "$2b$10$sIzEhADNfPcEOUCO7ILtAunEbf8Y9YVQt2/gTaZ0TvHvNA3bN6U1O",
    "boumhale",
    "122883",
    "user",
    "https://res.cloudinary.com/dew6e8h2m/image/upload/v1664624356/cld-sample-3.jpg",
    "Activated",
    "2022-09-29"
  );




-- Insert All Contracts
INSERT INTO
  etafakna.contract_types(
    signed_time,
    time_answering,
    title_EN,
    title_FR,
    title_AR,
    description_FR,
    description_AR,
    description_EN,
    image_url,
    template_FR,
    template_AR,
    template_EN,
    country,
    types,
    categories,
    inside_categories
  )
VALUES
(
    0,
    5,
    "Employment contract",
    "Contrat de travaille",
    N'عقد التوظيف',
    "Anything can be rented using E-tafakna e-greement... From a room, to an appartement or a car...",
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665949431/icons/cdd_qmrm8e.png",
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1665084720/contract1_isna08_1_part1_esqffs.docx,https://res.cloudinary.com/dew6e8h2m/raw/upload/v1665084831/contract2_fiwvof_part2_i550oc.docx",
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1665084720/contract1_isna08_1_part1_esqffs.docx,https://res.cloudinary.com/dew6e8h2m/raw/upload/v1665084831/contract2_fiwvof_part2_i550oc.docx",
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1665084720/contract1_isna08_1_part1_esqffs.docx,https://res.cloudinary.com/dew6e8h2m/raw/upload/v1665084831/contract2_fiwvof_part2_i550oc.docx",
    "Tunisia",
    "types",
    "categories",
    "null"
  ),
  (
    0,
    5,
    "Nda",
    "Accord de non-divulgation(NDA)",
    "Accord de non-divulgation(NDA)",
    "This is Description",
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665949432/icons/nda_jehp4p.png",
    "temp_FR",
    "temp_AR",
    "temp_EN",
    "Tunisia",
    "types",
    "null",
    "null"
  ),
  (
    0,
    5,
    "Training Certificate",
    "Attestation de stage",
    "شهادة تدريب",
    N'L`attestation de stage E-Tafakna, aussi appelée le certificat de stage, est un document remis au stagiaire permettant de valider une expérience professionnelle au sein de l`entreprise.',
    "desc_AR",
    "In the broadest sense, a training certificate is a document certifying that the holder has taken a specific course of training.",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665949431/icons/attestation_de_stage_sn9jhb.png",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/raw/upload/v1665774426/WORD-CONTRACTS/Attestation-de-stage_n2_rjvm0l_v5c4wo.docx",
    "null",
    "null",
    "Tunisia",
    "types",
    "null",
    "null"
  ),
  (
    0,
    5,
    "Freelancer",
    "Freelance",
    "مستقل",
    "This is Freelancer Description",
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665949432/icons/freelance_zbfpcj.png",
    "temp_FR",
    "temp_AR",
    "temp_EN",
    "Tunisia",
    "types",
    "null",
    "null"
  ),
  (
    0,
    5,
    "Microcredit",
    N'Contrat de Prêt numéraire (microcrédit)',
    "قرض",
    "This is loan Description",
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665949431/icons/creditmicro_texuoj.png",
    "temp_FR",
    "temp_AR",
    "temp_EN",
    "Tunisia",
    "types",
    "null",
    "null"
  ),
  (
    0,
    5,
    "Car rental",
    "Location de voiture",
    "كراء سيارة",
    "This is Employment Contract Description",
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665949432/icons/location_voiture_kxvdrc.png",
    "temp_FR",
    "temp_AR",
    "temp_EN",
    "Tunisia",
    "types",
    "null",
    "null"
  ),
  (
    0,
    5,
    "Car sale",
    "Achat de voiture",
    "بيع سيارة",
    "This is Employment Contract Description",
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665949430/icons/achat_voiture_j3ikzr.png",
    "temp_FR",
    "temp_AR",
    "temp_EN",
    "Tunisia",
    "types",
    "null",
    "null"
  ),
  (
    0,
    5,
    "Rental of real estate",
    "Location de biens",
    "Referencement",
    N'Tout peut être loué en utilisant le contrat de location de E-Tafakna. D`une chambre, une villa, un appartement, à un bureau. Qu`il s&#39;agisse d`une location à court terme ou à long terme',
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665949432/icons/location_de_bien_duunpu.png",
    "temple_FR",
    "temp_AR",
    "temp_EN",
    "Tunisia",
    "types",
    "categorie",
    "null"
  ),
  (
    0,
    5,
    "Sale",
    "Vente",
    "عقد كراء",
    "This is Employment Contract Description",
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665949430/icons/achat_vente_r4ifpl.png",
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1664737567/Template_Contrat_de_location_bureau_n3_xvsszr.docx",
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1664737567/Template_Contrat_de_location_bureau_n3_xvsszr.docx",
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1664737567/Template_Contrat_de_location_bureau_n3_xvsszr.docx",
    "Tunisia",
    "types",
    "null",
    "null"
  ),
  (
    0,
    5,
    N'Contrat d’engagement',
    N'Contrat d’engagement',
    N'Contrat d’engagement',
    N'Le contrat d’engagement E-Tafakna nous permet de nous assurer que vous soyez prêt à entreprendre des travaux, avant de commencer à travailler plus en profondeur sur votre projet.',
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665949431/icons/engagement_p8xhg9.png",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/raw/upload/v1665770960/WORD-CONTRACTS/Engagement_contract_n2_x14mz3_wg8rm1_gukspl.docx",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/raw/upload/v1665770960/WORD-CONTRACTS/Engagement_contract_n2_x14mz3_wg8rm1_gukspl.docx",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/raw/upload/v1665770960/WORD-CONTRACTS/Engagement_contract_n2_x14mz3_wg8rm1_gukspl.docx",
    "Tunisia",
    "types",
    "null",
    "null"
  ),
  (
    0,
    5,
    "Partnership",
    "Partenariat",
    "شراكة",
    "This is Employment Contract Description",
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665949432/icons/partenariat_lvlalz.png",
    "temp_FR",
    "temp_AR",
    "temp_EN",
    "Tunisia",
    "types",
    "null",
    "null"
  ),
  (
    0,
    5,
    "Quotation/Bill",
    "Devis/Facture ",
    "Devis/Facture ",
    "This is Employment Contract Description",
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665949431/icons/facture_devis_ox5oml.png",
    "temp_FR",
    "temp_AR",
    "temp_EN",
    "Tunisia",
    "types",
    "null",
    "null"
  ),
  (
    0,
    5,
    "Travel insurance",
    "Assurance Voyage",
    "Assurance Voyage",
    "This is Employment Contract Description",
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665949430/icons/assurance_voyage_rrv8ql.png",
    "temp_FR",
    "temp_AR",
    "temp_EN",
    "Tunisia",
    "types",
    "null",
    "null"
  ),
  (
    0,
    5,
    "Idea registration",
    N'Enregistrement d’une idée',
    N'تسجيل فكرة',
    "This is Employment Contract Description",
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665949431/icons/icons8-idea-ios-16-filled-72_q7lw1x.png",
    "temp_FR",
    "temp_AR",
    "temp_EN",
    "Tunisia",
    "types",
    "null",
    "null"
  ),
  (
    0,
    5,
    "CV",
    "CV",
    "أمر شراء",
    "This is Employment Contract Description",
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665949431/icons/exlusivite_fodbew.png",
    "temp_FR",
    "temp_AR",
    "temp_EN",
    "Tunisia",
    "types",
    "null",
    "null"
  ),
  (
    0,
    5,
    "Safe of real estate",
    "Contrat de Domiciliation",
    "Contrat de Domiciliation",
    N'Le contrat de domiciliation E-Tafakna est une obligation pour toutes les sociétés, mais également pour les associations. Il s`agit de l`adresse administrative et fiscale à laquelle tous les courriers seront envoyés.',
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665949431/icons/domiciliation_djraeo.png",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/raw/upload/v1665772844/WORD-CONTRACTS/Attestation_de_Domiciliation_n2_anigf5_yfnom4.docx",
    "temp_AR",
    "temp_EN",
    "Tunisia",
    "types",
    "null",
    "null"
  ),
  (
    0,
    5,
    "Official request",
    "Demande officielle",
    N'طلب رسمي',
    N'Une demande Officielle E-Tafakna constitue effectivement une preuve réelle de la démarche engagée que l`on peut réaliser et apporter à toutes fins utiles.',
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665949431/icons/demande_ofiicielle_y3pgqq.png",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/raw/upload/v1665573149/WORD-CONTRACTS/Demande_officielle_n4_m4cbe4_cfrc9c.docx",
    "temp_AR",
    "temp_EN",
    "Tunisia",
    "types",
    "null",
    "null"
    
  ),
  
  (
    0,
    5,
    "CDI",
    "CDI",
    "CDI",
    "CDI",
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457759/unnamed_2_1_ztst4g.png",
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1665084720/contract1_isna08_1_part1_esqffs.docx,https://res.cloudinary.com/dew6e8h2m/raw/upload/v1665084831/contract2_fiwvof_part2_i550oc.docx",
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1665084720/contract1_isna08_1_part1_esqffs.docx,https://res.cloudinary.com/dew6e8h2m/raw/upload/v1665084831/contract2_fiwvof_part2_i550oc.docx",
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1665084720/contract1_isna08_1_part1_esqffs.docx,https://res.cloudinary.com/dew6e8h2m/raw/upload/v1665084831/contract2_fiwvof_part2_i550oc.docx",
    "Tunisia",
    "work",
    "categories",
    "inside_categories"
  ),
  (
    0,
    5,
    "CDD",
    "CDD",
    "CDD",
    N'Le contrat à durée déterminée (CDD) E-Tafakna est un contrat de travail par lequel un employeur recrute un salarié pour une durée limitée. Un tel contrat n’est possible que pour l’exécution d’une tâche précise et temporaire et seulement dans les cas énumérés par la loi.',
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457759/unnamed_2_1_ztst4g.png",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/raw/upload/v1665748919/WORD-CONTRACTS/contract1_isna08_1_part1_esqffs_ycbrtu.docx,https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/raw/upload/v1665748967/WORD-CONTRACTS/contract2_fiwvof_part2_i550oc_doi7zp.docx",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/raw/upload/v1665748919/WORD-CONTRACTS/contract1_isna08_1_part1_esqffs_ycbrtu.docx,https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/raw/upload/v1665748967/WORD-CONTRACTS/contract2_fiwvof_part2_i550oc_doi7zp.docx",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/raw/upload/v1665748919/WORD-CONTRACTS/contract1_isna08_1_part1_esqffs_ycbrtu.docx,https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/raw/upload/v1665748967/WORD-CONTRACTS/contract2_fiwvof_part2_i550oc_doi7zp.docx",
    "Tunisia",
    "work",
    "categories",
    "inside_categories"
  ),
  (
    0,
    5,
    "CIVP",
    "CIVP",
    "Civp",
    "CIVP",
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457759/unnamed_2_1_ztst4g.png",
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1665084720/contract1_isna08_1_part1_esqffs.docx,https://res.cloudinary.com/dew6e8h2m/raw/upload/v1665084831/contract2_fiwvof_part2_i550oc.docx",
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1665084720/contract1_isna08_1_part1_esqffs.docx,https://res.cloudinary.com/dew6e8h2m/raw/upload/v1665084831/contract2_fiwvof_part2_i550oc.docx",
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1665084720/contract1_isna08_1_part1_esqffs.docx,https://res.cloudinary.com/dew6e8h2m/raw/upload/v1665084831/contract2_fiwvof_part2_i550oc.docx",
    "Tunisia",
    "work",
    "categories",
    "inside_categories"
  ),
  (
    0,
    5,
    "Rental of real estate",
    N'location à usage de bureau',
    "Referencement",
    N'Tout peut être loué en utilisant le contrat de location de E-Tafakna. D`une chambre, une villa, un appartement, à un bureau. Qu`il s’agisse d`une location à court terme ou à long terme',
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457757/unnamed_16_1_drpr0x.png",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/raw/upload/v1665757549/WORD-CONTRACTS/location_1_yi45ht.docx,https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/raw/upload/v1665757559/WORD-CONTRACTS/location_2_c96htt.docx",
    "temp_AR",
    "temp_EN",
    "Tunisia",
    "work",
    "null",
    "inside_categorie"
  ),
  (
    0,
    5,
    "Rental of real estate",
    N'Location à usage d’habitation',
    "Referencement",
    N'Tout peut être loué en utilisant le contrat de location de E-Tafakna. D`une chambre, une villa, un appartement, à un bureau. Qu`il s’agisse d`une location à court terme ou à long terme',
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457757/unnamed_16_1_drpr0x.png",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/raw/upload/v1665761577/WORD-CONTRACTS/Contrat_de_location_simple_1_nsezaf.docx",
    "temp_AR",
    "temp_EN",
    "Tunisia",
    "work",
    "null",
    "inside_categorie"
  );

INSERT INTO
  etafakna.contract_types(
    id,
    signed_time,
    time_answering,
    title_EN,
    title_FR,
    title_AR,
    description_FR,
    description_AR,
    description_EN,
    image_url,
    template_FR,
    template_AR,
    template_EN,
    country,
    types,
    categories,
    inside_categories
  )
VALUES


(
40, 
0, 
5, 
'Facture', '
Facture', 
'Facture', 'Facture', 
'Facture', 
'Facture', 
'https://res.cloudinary.com/dn6kxvylo/image/upload/v1665584941/quotation_cx1xtp.png',
'https://res.cloudinary.com/dn6kxvylo/raw/upload/v1665755893/Template_facture_ymmtjd.xlsx',
'https://res.cloudinary.com/dn6kxvylo/raw/upload/v1665755893/Template_facture_ymmtjd.xlsx',
'https://res.cloudinary.com/dn6kxvylo/raw/upload/v1665755893/Template_facture_ymmtjd.xlsx',
'tunisie', 
'types',
NULL, 
NULL);
