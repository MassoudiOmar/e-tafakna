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
CREATE TABLE IF NOT EXISTS `etafakna`.`questions_EN` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content_EN` VARCHAR(100) NOT NULL,
  `part2_EN` VARCHAR(50) NULL,
  `inputType` LONGTEXT NOT NULL,
  `options` VARCHAR(250),
  `date` VARCHAR(10) NOT NULL,
  `explanation` VARCHAR(1000),
  `text_Area` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci;
-- -----------------------------------------------------
-- Table `etafakna`.` 
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `etafakna`.`questions_FR` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content_FR` VARCHAR(100) NOT NULL,
  `part2_FR` VARCHAR(50) NULL,
  `inputType` LONGTEXT NULL,
  `options` VARCHAR(250),
  `date` VARCHAR(10)  NULL,
  `explanation` VARCHAR(1000),
  `text_Area` VARCHAR(10)  NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci;
-- -----------------------------------------------------
-- Table `etafakna`.` 
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `etafakna`.`questions_AR` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content_AR` VARCHAR(100)  NULL,
  `part2_AR` VARCHAR(50) NULL,
  `inputType` LONGTEXT  NULL,
  `options` VARCHAR(250),
  `date` VARCHAR(10)  NULL,
  `explanation` VARCHAR(1000),
  `text_Area` VARCHAR(10)  NULL,
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
  CONSTRAINT `fk_answers_questions2` FOREIGN KEY (`questions_id`) REFERENCES `etafakna`.`questions_FR` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `etafakna`.`questions_has_contract_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `etafakna`.`questions_has_contract_types_EN` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `questions_id` INT NOT NULL,
  `contract_types_id` INT NOT NULL,
  `order_question` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_questions_has_contract_types_questions_EN` (`questions_id` ASC) VISIBLE,
  INDEX `fk_questions_has_contract_types_contract_types0` (`contract_types_id` ASC) VISIBLE,
  CONSTRAINT `fk_questions_has_contract_types_contract_types0` FOREIGN KEY (`contract_types_id`) REFERENCES `etafakna`.`contract_types` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_questions_has_contract_types_questions_EN` FOREIGN KEY (`questions_id`) REFERENCES `etafakna`.`questions` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `etafakna`.`questions_has_contract_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `etafakna`.`questions_has_contract_types_FR` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `questions_id` INT NOT NULL,
  `contract_types_id` INT NOT NULL,
  `order_question` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_questions_has_contract_types_questions_FR` (`questions_id` ASC) VISIBLE,
  INDEX `fk_questions_has_contract_types_contract_types2` (`contract_types_id` ASC) VISIBLE,
  CONSTRAINT `fk_questions_has_contract_types_contract_types2` FOREIGN KEY (`contract_types_id`) REFERENCES `etafakna`.`contract_types` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_questions_has_contract_types_questions_FR` FOREIGN KEY (`questions_id`) REFERENCES `etafakna`.`questions` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `etafakna`.`questions_has_contract_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `etafakna`.`questions_has_contract_types_AR` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `questions_id` INT NOT NULL,
  `contract_types_id` INT NOT NULL,
  `order_question` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_questions_has_contract_types_questions_AR` (`questions_id` ASC) VISIBLE,
  INDEX `fk_questions_has_contract_types_contract_types3` (`contract_types_id` ASC) VISIBLE,
  CONSTRAINT `fk_questions_has_contract_types_contract_types3` FOREIGN KEY (`contract_types_id`) REFERENCES `etafakna`.`contract_types` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_questions_has_contract_types_questions_AR` FOREIGN KEY (`questions_id`) REFERENCES `etafakna`.`questions` (`id`) ON DELETE CASCADE
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
  `signatureUrl` VARCHAR(200) NULL DEFAULT NULL,
  `carteCinFront` VARCHAR(200) NULL DEFAULT NULL,
  `carteCinBack` VARCHAR(200) NULL DEFAULT NULL,
  `faceVideo` VARCHAR(200) NULL DEFAULT NULL,
  `scanSignature` VARCHAR(200) NULL DEFAULT NULL,
  `scanSignatureCheck` VARCHAR(200) NULL DEFAULT false,
  `formulaireCheck` VARCHAR(200) NULL DEFAULT false,
  `CINCheck` VARCHAR(200) NULL DEFAULT false,
  `videiSelfieCheck` VARCHAR(200) NULL DEFAULT false,
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
INSERT INTO etafakna.questions_AR(content_AR,part2_AR,inputType,options,date,explanation,text_Area)
VALUES

-- Attestation de stage
(N'اسم و لقب',N' صاحب/ة الشركة',null,null,"false",null,"null"),
(N'عدد بطاقة التعريف الوطنية',N'صاحب/ة الشركة',null,null,"false",null,"null"),
(N'تاريخ صدور بطاقة التعريف ',N'صاحب/ة الشركة',null,null,"true",null,"null"),
(N'اسم الشركة ',NULL,null,null,"false",null,"null"),
(N'مقر الشركة',NULL,null,null,"false",null,"null"),
(N'اسم و لقب  ',N'المتربص/ة',null,null,"false",null,"null"),
(N'عدد بطاقة التعريف الوطنية',N'المتربص/ة',null,null,"false",null,"null"),
(N'تاريخ صدور بطاقة التعريف ',N'المتربص/ة',null,null,"true",null,"null"),
(N'اختصاص التربص ',null,null,null,"false",null,"null"),
(N'مدة التربص',N'بالأشهر',null,null,"false",null,"null"),
(N'بداية فترة التربص',null,null,null,"true",null,"null"),
(N'نهاية فترة التربص',null,null,null,"true",null,"null"),
(N'التاريخ ',null,null,null,"true",null,"null"),

-- CDD
(N'اسم الشركة المؤجرة',null,null,null,"false",null,"null"),
(N'المقر الاجتماعي للشركة',null,null,null,"false",null,"null"),
(N'اسم و لقب ',N'الممثل القانوني للشركة',null,null,"false",null,"null"),
(N'اسم و لقب ',N'الأجير/ة',null,null,"false",null,"null"),
(N'جنسية ',N'الأجير/ة',null,'civilite',"false",null,"null"),
(N'مكان ولادة',N'الأجير/ة',null,null,"false",null,"null"),
(N'رقم بـطـاقـة التعريف الـوطنيـة',N'الأجير/ة',null,null,"false",null,"null"),
(N'تاريخ صدور بطاقة التعريف',N'الأجير/ة',null,null,"true",null,"null"),
(N'عنوان ',N'الأجير/ة',null,null,"false",null,"null"),
(N'المنصب المشغور في العمل ',null,null,null,"false",null,"null"),
(N'مـدة العمل ',N'بالأشهر',null,null,"false",null,"null"),
(N'بداية من ',null,null,null,"true",null,"null"),
(N'الى غاية  ',null,null,null,"true",null,"null"),
(N'الأجـر الشهري ',null,null,null,"false",null,"null"),
(N'فترة التجربة المحددة  ',N'بالاشــهـر',null,null,"false",null,"null"),
(N'تاريخ امضاء العقد  ',null,null,null,"true",null,"null"),

-- CDI
(N'اسم الشركة المؤجرة',null,null,null,"false",null,"null"),
(N'المقر الاجتماعي للشركة',null,null,null,"false",null,"null"),
(N'اسم و لقب ',N'الممثل القانوني للشركة',null,null,"false",null,"null"),
(N'اسم و لقب ',N'الأجير/ة',null,null,"false",null,"null"),
(N'رقم بـطـاقـة التعريف الـوطنيـة',N'الأجير/ة',null,null,"false",null,"null"),
(N'عنوان ',N'الأجير/ة',null,null,"false",null,"null"),
(N'المنصب المشغور في العمل ',null,null,null,"false",null,"null"),
(N'الأجـر الشهري ',null,null,null,"false",null,"null"),
(N'مكان العمل',null,null,null,"false",null,"null"),
(N'تاريخ بداية تنفيذ العقد',null,null,null,"true",null,"null"),
(N'فترة التجربة المحددة  ',N'بالاشــهـر',null,null,"false",null,"null"),
(N'تاريخ امضاء العقد  ',null,null,null,"true",null,"null"),

-- loc dahabitation
(N'اسم و لقب ',N'المالك',null,null,"false",null,"null"),
(N' رقم بطاقة التعريف الوطنية',N'المالك',null,null,"false",null,"null"),
(N' تاريخ صدور بطاقة التعريف الوطنية',N'المالك',null,null,"true",null,"null"),
(N'اسم و لقب ',N'المتسوغ',null,null,"false",null,"null"),
(N'رقم بطاقة التعريف الوطنية ',N'المتسوغ',null,null,"false",null,"null"),
(N'تاريخ صدور بطاقة التعريف الوطنية ',N'المتسوغ',null,null,"true",null,"null"),
(N'عنوان  المحل الموضوع الكراء ',null,null,null,"false",null,"null"),
(N'عدد غرف المحل ',null,null,null,"false",null,"null"),
(N'مدة الكراء',N'بالاشــهـر',null,null,"false",null,"null"),
(N'بداية من',null,null,null,"true",null,"null"),
(N' إلى تاريخ ',null,null,null,"true",null,"null"),
(N' معين الكراء الشهري',null,null,null,"false",null,"null"),
(N' قيمة الضمان',null,null,null,"false",null,"null"),
(N' مكان الامضاء',null,null,null,"false",null,"null"),
(N'تاريخ الامضاء',null,null,null,"true",null,"null"),

-- loc commercial 
(N'اسم و لقب ',N'المالك',null,null,"false",null,"null"),
(N' رقم بطاقة التعريف الوطنية',N'المالك',null,null,"false",null,"null"),
(N' تاريخ صدور بطاقة التعريف الوطنية',N'المالك',null,null,"true",null,"null"),
(N'اسم و لقب ',N'المتسوغ',null,null,"false",null,"null"),
(N'رقم بطاقة التعريف الوطنية ',N'المتسوغ',null,null,"false",null,"null"),
(N'تاريخ صدور بطاقة التعريف الوطنية ',N'المتسوغ',null,null,"true",null,"null"),
(N'عنوان  المحل الموضوع الكراء ',null,null,null,"false",null,"null"),
(N'مساحة المحل ',N'بالمتر المربع ',null,null,"false",null,"null"),
(N'النشاط التجاري الذي سيتم تعاطيه في المحل',null,null,null,"false",null,"null"),
(N'مدة الكراء',N'بالاشــهـر',null,null,"false",null,"null"),
(N'بداية من',null,null,null,"true",null,"null"),
(N' إلى تاريخ ',null,null,null,"true",null,"null"),
(N' معين الكراء الشهري',null,null,null,"false",null,"null"),
(N' قيمة الضمان',null,null,null,"false",null,"null"),
(N' مكان الامضاء',null,null,null,"false",null,"null"),
(N'تاريخ الامضاء',null,null,null,"true",null,"null"),

-- loc dengagement 
(N'اسم و لقب ',N' القائم بالالتزام',null,null,"false",null,"null"),
(N' رقم بطاقة التعريف الوطنية',N'المالك',null,null,"false",null,"null"),
(N' تاريخ صدور بطاقة التعريف الوطنية',N' القائم بالالتزام',null,null,"true",null,"null"),
(N'عنوان',N' القائم بالالتزام',null,null,"false",null,"null"),
(N'موضوع الالتزام بالتفصيل',null,null,null,"false",null,null),
(N'تاريخ تعمير الاستمارة ',null,null,null,"true",null,"null"),

-- atte honneur 
(N'اسم و لقب ',N' القائم/ة بالتصريح',null,null,"false",null,"null"),
(N' رقم بطاقة التعريف الوطنية',N'القائم/ة بالتصريح',null,null,"false",null,"null"),
(N' تاريخ صدور بطاقة التعريف الوطنية',N' القائم بالتصريح',null,null,"true",null,"null"),
(N' عنوان سكنى',N' القائم بالتصريح',null,null,"false",null,"null"),
(N' التصريحب التفصيل',null,null,null,"false",null,null),
(N' تاريخ التصريح',null,null,null,"true",null,null),

-- atte domiciel 
(N'اسم و لقب ',N' القائم/ة بالتصريح',null,null,"false",null,"null"),
(N' رقم بطاقة التعريف الوطنية',N'القائم/ة بالتصريح',null,null,"false",null,"null"),
(N' تاريخ صدور بطاقة التعريف الوطنية',N' القائم بالتصريح',null,null,"true",null,"null"),
(N' اسم الشركة',null,null,null,"false",null,"null"),
(N' نوع الشركة',null,null,null,"false",null,"null"),
(N' رأسمال الشركة',null,null,null,"false",null,"null"),
(N' العنوان',null,null,null,"false",null,"null"),
(N' مقابل الاقامة ',null,null,null,"false",null,"null"),
(N' تاريخ تعمير الاستمارة  ',null,null,null,"true",null,"null");


INSERT INTO etafakna.questions_FR(content_FR,part2_FR,inputType,options,date,explanation,text_Area)
VALUES
("A l'attention",N'Civilité du destinataire',null,"civilite","false",null,"deded"),
(N'Nom et prénom',N'Du destinataire',null,null,"false",null,"deded"),
(N'Quel est l’objet de votre demande',null,null,null,"false",null,"deded"),
(N'Veuillez préciser votre demande',null,null,null,"false",null,"textArea"),
(N'Fait à',N'Veuillez préciser votre gouvernorat',null,null,"false",null,"deded"),
("Date de la demande",null,null,null,"true",null,"deded"),
(N'Votre nom et prénom',"Du demandeur",null,null,"false",null,"deded"),
(N'Nom de la société',null,null,null,null,"prrrrrrr",null),
(N'Activité de la société',null,null,null,null,null,null), 
(N'Adresse de la société',null,null,null,null,null,null),
(N'N° du registre de commerce',null,null,null,null,null,null),
(N'Civilité',N'Du gérant',"n","civilite","n",null,null),
(N'Nom et prénom',N'Du gérant(e)',"n","n","n",null,null),
(N'Civilité',N'De l’employé',"n","civilite","n",null,null),
(N'Nom et prénom',N'De l’employé',"n","n","n",null,null),
("Statut",N'De l’employé',"n","status","n",null,null),
("Lieu de naissance",null,"n","n","n",null,null),
("Date de naissance",null,"n","n","true",null,null),
(N'Numéro de la carte d identité',null,"n","n","n",null,null),
(N'CIN délivrée le',null,"n","n","true",null,null),
(N'Adresse','De l’employé',"n","n","n",null,null),
("Fonction",N'De l’employé',"n",null,null,null,null),
(N'Début du contrat',null,null,null,"true",null,null),
("Fin du contract",null,null,null,"true",null,null),
("Salaire mensuel","En dinars",null,null,null,null,null),
(N'Fait à',null,null,null,null,null,null),
("Date du contract",null,null,null,"true",null,null),
(N'Civilité',"Le bailleur",null,"civilite",null,null,null),
("Nom et prénom du propriétaire","Le bailleur",null,null,"false",null,null),
(N'Civilité',"Le locataire",null,"civilite",null,null,null),
(N'Nom et prénom',"Le locataire",null,null,"false",null,null),
(N'Type de propriété',null,null,null,"false",null,null),
(N'Adresse de la propriété',"Rue, gouvernorat et code postal",null,null,"false",null,null),
(N'Durée de la location',null,null,null,"false",null,null),
(N'Location à partir de',null,null,null,"true",null,null),
(N'Jusqu’à',null,null,null,"true",null,null),
("Montant du loyer","En dinars",null,null,"false",null,null),
("Contrat fait à",null,null,null,"false",null,null),
("Date du contrat",null,null,null,"true",null,null),
(N'Civilité',"Le propriétaire",null,"civilite",null,null,null),
("Entrez le nom et prénom","Le propriétaire",null,null,null,null,null),
("Demeurant à","Le propriétaire: Rue,gouvernorat et code postal",null,null,null,null,null),
("N° de la CIN","Le propriétaire",null,null,null,null,null),
("CIN délivrée le","Le propriétaire",null,null,null,null,null),
(N'Civilité',"Le locataire",null,"civilite",null,null,null),
("Entrez le nom et prénom","Le locataire",null,null,null,null,null),
("Entrez la nationalité","Le locataire",null,null,null,null,null),
("Date de naissance","Le locataire","true",null,"true",null,null),
("N° de la CIN","Le locataire",null,null,null,null,null),
("CIN délivrée le","Le locataire","true",null,"true",null,null),
("Demeurant à","Le locataire: Rue,gouvernorat et code postal",null,null,null,null,null),
("Décrivez le type de propriété",null,null,"typeproprite",null,null,null),
("Adresse de la propriété","Rue,gouvernorat et code postal",null,null,null,null,null),
("Durée de la location",null,null,null,null,null,null),
("Date de début de la location",null,"true",null,"true",null,null),
("Date de fin de la location",null,"true",null,"true",null,null),
("Montant de la location ","En dinars",null,null,null,null,null),
("Location est :",null,null,"jour",null,null,null),
("Montant du cautionnement en TND","En dinars",null,null,null,null,null),
("Prise en charge des consommations (eau/électricité) par",null,null,"locprop",null,null,null),
("Date du contrat",null,"true",null,"true",null,null),
(N'Civilité',"De l’engagé(e)",null,"civilite","n",null,null),
("Nom et prénom","De l’engagé(e)",null,null,"false",null,null),
("Numéro de CIN",null,null,null,null,null,null),
("CIN délivrée le",null,null,null,"true",null,null),
("Indiquer la fonction","De l’engagé(e)",null,null,null,null,null),
("Nom de ma société",null,null,null,null,null,null),
("Identifiant unique",null,null,null,null,null,null),
("Je m`engage",null,null,null,null,null,null),
("Fait le",null,null,null,"true",null,null),
("Fait à",null,null,null,null,null,null),
("Nom et prénom",null,null,null,"false",null,null),
("Numéro de carte CIN",null,null,null,null,null,null),
("CIN délivrée le",null,null,null,"true",null,null),
("Raison social","Nom de la société",null,null,null,null,null),
("Forme juridique",null,null,"form",null,null,null),
("Capital de la société","En dinars",null,null,null,null,null),
("Adress du siège",null,null,null,null,null,null),
("À titre",null,null,"titre",null,null,null),
("Fait à",null,null,null,null,null,null),
("Fait le",null,null,null,"true",null,null),
(N'Civilité',"Employeur","civilite","civilite",null,null,null),
("Nom et prénom","Employeur",null,null,null,null,null),
("Indiquer le fonction dans l’entreprise","Employeur",null,null,null,null,null),
(N'Civilité',"Stagiare",null,"civilite",null,null,null),
("Nom et prénom","Stagiare",null,null,null,null,null),
("Adresse du Stagiare","Rue, gouvernorat et code postal",null,null,null,null,null),
("Nom de l’entreprise",null,null,null,null,null,null),
("Date du début de stage",null,"true",null,"true",null,null),
("Date de fin du stage",null,"true",null,"true",null,null),
("Indiquer le poste dans l’entreprise","Stagiaire",null,null,null,null,null),
("Fait le",null,null,null,"true",null,null),
("Quel est le nom de votre Société ?",null,null,NULL,null,null,null),
("Quel est votre gouvernorat ?",null,null,NULL,null,null,null),
("Quel est la date de votre facture ?",null,null,NULL,"true",null,null),
("Quel est le nom de la société de votre client ?",null,null,NULL,null,null,null),
("Quel est la Matricule Fiscale de votre client ?",null,null,NULL,null,null,null),
("Quel est le numéro de votre facture ?",null,null,NULL,null,null,null),
("Quel est l’année de la facture ?",null,null,NULL,null,null,null),
("Insérez le nom de votre produit ?",null,null,NULL,null,null,null),
("Insérez la quantité de ce produit?",null,null,NULL,null,null,null),
("Insérez le prix du produit",null,null,NULL,null,null,null),
("Quel est l’adresse de votre société?",null,null,NULL,null,null,null),
("Quel est la Matricule Fiscale de votre société ?",null,null,NULL,null,null,null),
("Quel est votre code postale ",null,null,NULL,null,null,null),
("Quel est la somme de la facture",null,null,null,null,null,null),
("Quelle est les nombre des Produit",null,null,null,null,null,null);
-- insert question-has-contracttype 
INSERT INTO etafakna.questions_has_contract_types_EN(questions_id, contract_types_id, order_question)
VALUES

 -- Questions Demande Officielle ar
   (1, 34, 1),
   (2, 34, 2),
   (3, 34, 3),
   (4, 34, 4),
   (5, 34, 1),
   (6, 19, 1);
 -- insert question-has-contracttype 
INSERT INTO etafakna.questions_has_contract_types_AR(questions_id, contract_types_id, order_question)
VALUES
-- attestation de stage
   (1, 20, 1),
   (2, 20, 2),
   (3, 20, 3),
   (4, 20, 4),
   (5, 20, 5),
   (6, 20, 6),
   (7, 20, 7),
   (8, 20, 8),
   (9, 20, 9),
   (10, 20, 10),
   (11, 20, 11),
   (12, 20, 12),
   (13, 20, 13),

  -- CDD
   (14, 36,1),
   (15, 36, 2),
   (16, 36, 3),
   (17, 36, 4),
   (18, 36, 5),
   (19, 36, 6),
   (20, 36, 7),
   (21, 36, 8),
   (22, 36, 9),
   (23, 36, 10),
   (24, 36, 11),
   (25, 36, 12),
   (26, 36, 13),
   (27, 36, 14),
   (28, 36, 15),
   (29, 36, 16),

-- CDI
   (30, 35,1),
   (31, 35, 2),
   (32, 35, 3),
   (33, 35, 4),
   (34, 35, 5),
   (35, 35, 6),
   (36, 35, 7),
   (37, 35, 8),
   (38, 35, 9),
   (39, 35, 10),
   (40, 35, 11),
   (41, 35, 12),

-- LOC dahabitation
   (42, 39, 1),
   (43, 39, 2),
   (44, 39, 3),
   (45, 39, 4),
   (46, 39, 5),
   (47, 39, 6),
   (48, 39, 7),
   (49, 39, 8),
   (50, 39, 9),
   (51, 39, 10),
   (52, 39, 11),
   (53, 39, 12),
   (54, 39, 13),
   (55, 39, 14),
   (56, 39, 15),

-- LOC commercial
   (57, 38,1),
   (58, 38, 2),
   (59, 38, 3),
   (60, 38, 4),
   (61, 38, 5),
   (62, 38, 6),
   (63, 38, 7),
   (64, 38, 8),
   (65, 38, 9),
   (66, 38, 10),
   (67, 38, 11),
   (68, 38, 12),
   (69, 38, 13),
   (70, 38, 14),
   (71, 38, 15),
   (72, 38, 16),

-- contract dengagement
   (73, 27,1),
   (74, 27, 2),
   (75, 27, 3),
   (76, 27, 4),
   (77, 27, 5),
   (78, 27, 6),

-- attes honneur
   (79, 31,1),
   (80, 31, 2),
   (81, 31, 3),
   (82, 31, 4),
   (83, 31, 5),
   (84, 31, 6),

-- con domiciel
   (85, 33,1),
   (86, 33, 2),
   (87, 33, 3),
   (88, 33, 4),
   (89, 33, 5),
   (90, 33, 6),
   (91, 33, 7),
   (92, 33, 8),
   (93, 33, 9);

INSERT INTO etafakna.questions_has_contract_types_FR(questions_id, contract_types_id, order_question)
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
  (90, 20, 9),
  (91, 20, 10),
  (92, 20, 11) ,

  -- Contract Devis Facture
  (93, 40, 1),
  (94, 40, 2),
  (95, 40, 3),
  (97, 40, 5),
  (98, 40, 6),
  (99, 40, 7),
  (100, 40, 8),
  (101, 40, 10),
  (102, 40, 11),
  (103, 40, 12),
  (104, 40, 13),
  (105, 40, 14),
  (106, 40, 15),
  (07,  40, 16),
  (109, 40,  9);

 
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
  ),
  (
    "Norchen",
    "Mezni",
    "Norchen Mezni",
    "Norchenmezni1@gmail.com",
    "$2b$10$kzeiOtT.FvnFlD175KxSHe1VhrFJ.OUtIcq.5C4YprY6qjDvWz3/a",
    "Tunis",
    "52979979",
    "user",
    "null",
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
    "Contrat de travail",
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
    N'اتفاق غير معلن',
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
    N'شهادة تدريب',
    N'L`attestation de stage E-Tafakna, aussi appelée le certificat de stage, est un document remis au stagiaire permettant de valider une expérience professionnelle au sein de l`entreprise.',
    "desc_AR",
    "In the broadest sense, a training certificate is a document certifying that the holder has taken a specific course of training.",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665949431/icons/attestation_de_stage_sn9jhb.png",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/raw/upload/v1665573149/WORD-CONTRACTS/Demande_officielle_n4_m4cbe4_cfrc9c.docx",
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1666864700/_1._Attestation_Stage_AR_fffffff_vjv8jp.docx",
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
  N'مستقل',
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
    N'قرض',
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
    N'كراء سيارة',
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
    N'بيع سيارة',
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
    N'تأجير العقارات',
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
    N'عقد كراء',
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
    N'عقد التوظيف',
    N'Le contrat d’engagement E-Tafakna nous permet de nous assurer que vous soyez prêt à entreprendre des travaux, avant de commencer à travailler plus en profondeur sur votre projet.',
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665949431/icons/engagement_p8xhg9.png",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/raw/upload/v1666361761/Engagement_contract_n2_x14mz3_wg8rm1_gukspl_1_ihtbkp.docx",
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1666880088/7._Engagement_fff_pduwtc.docx",
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
    N'شراكة',
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
    N'فاتورة/التسعير',
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
    N'تامين السفر',
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
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1666970446/8._Attes_sur_l_honneur_AR_fffffff_x2vw0v.docx",
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
    N'أمر شراء',
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
    N'عقد التوطين',
    N'Le contrat de domiciliation E-Tafakna est une obligation pour toutes les sociétés, mais également pour les associations. Il s`agit de l`adresse administrative et fiscale à laquelle tous les courriers seront envoyés.',
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665949431/icons/domiciliation_djraeo.png",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/raw/upload/v1665772844/WORD-CONTRACTS/Attestation_de_Domiciliation_n2_anigf5_yfnom4.docx",
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1666980180/6._Domiciliation_AR_1_ffff1_omhmkn.docx",
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
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1666875400/3._CDI_AR_fffff_ogzsix.docx",
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
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1666874907/2._CDD_AR_fffff1_rgsynf.docx",
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
    N'Location à usage de bureau',
    "Referencement",
    N'Tout peut être loué en utilisant le contrat de location de E-Tafakna. D`une chambre, une villa, un appartement, à un bureau. Qu`il s’agisse d`une location à court terme ou à long terme',
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457757/unnamed_16_1_drpr0x.png",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/raw/upload/v1665757549/WORD-CONTRACTS/location_1_yi45ht.docx,https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/raw/upload/v1665757559/WORD-CONTRACTS/location_2_c96htt.docx",
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1666879144/5._Loc_commerciale_AR_ffffff1_seykwm.docx",
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
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1666878066/4._Loc_habitation_AR_ffff1_gbisrt.docx",
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
