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

 ALTER TABLE `etafakna`.`contract_types` AUTO_INCREMENT = 1;


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
  `content` VARCHAR(50) NULL,
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
  CONSTRAINT `fk_answers_questions2` FOREIGN KEY (`questions_id`) REFERENCES `etafakna`.`questions_AR` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `username` VARCHAR(200) ,
  `email` VARCHAR(200) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `address` VARCHAR(200) ,
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
(N'اسم و لقب  ',N' صاحب/ة الشركة',null,null,"false",null,"null"),
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
(N'تاريخ الامضاء  ',null,null,null,"true",null,"null"),

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
(N' تاريخ تعمير الاستمارة  ',null,null,null,"true",null,"null"),

-- freelance normal person
(N'اسم و لقب ',N' المؤجر/ة',null,null,"false",null,"null"),
(N' رقم بطاقة التعريف الوطنية',N' للمؤجر/ة ',null,null,"false",null,"null"),
(N'اسم و لقب ',N' منفذ/ة العمل الحر',null,null,"false",null,"null"),
(N' رقم بطاقة التعريف الوطنية',N' منفذ/ة العمل الحر ',null,null,"false",null,"null"),
(N' مجال العمل الحرّ',null,null,null,"false",null,"null"),
(N' تحديد العمل موضوع العقد بالتفصيل',null,null,null,"false",null,"null"),
(N'المدة التي سيمتد خلالها العمل الحر',N'بالاشــهـر',null,null,"false",null,"null"),
(N'المقابل  ',N'بالدينار التونسي',null,null,"false",null,"null"),
(N'تاريخ آخر أجل للخلاص ',null,null,null,"true",null,"null"),
(N' تاريخ إجراء الامضاء ',null,null,null,"true",null,"null"),

-- freelance company
(N' اسم الشركة ' ,N' المؤجر/ة',null,null,"false",null,"null"),
(N' اسم ولقب ' ,N'من سيمثل الشركة',null,null,"false",null,"null"),
(N' رقم بطاقة التعريف الوطنية',N'من سيمثل الشركة ',null,null,"false",null,"null"),
(N'اسم و لقب ',N' منفذ/ة العمل الحر',null,null,"false",null,"null"),
(N' رقم بطاقة التعريف الوطنية',N' منفذ/ة العمل الحر ',null,null,"false",null,"null"),
(N' مجال العمل الحرّ',null,null,null,"false",null,"null"),
(N' تحديد العمل موضوع العقد بالتفصيل',null,null,null,"false",null,"null"),
(N'المدة التي سيمتد خلالها العمل الحر',N'بالاشــهـر',null,null,"false",null,"null"),
(N'المقابل  ',N'بالدينار التونسي',null,null,"false",null,"null"),
(N'تاريخ آخر أجل للخلاص ',null,null,null,"true",null,"null"),
(N' تاريخ إجراء الامضاء ',null,null,null,"true",null,"null"),

-- achat de voiture
(N'اسم و لقب ',N'بائع/ة السيارة',null,null,"false",null,"null"),
(N' رقم بطاقة التعريف الوطنية',N'بائع/ة السيارة ',null,null,"false",null,"null"),
(N' مقر سكنى',N'بائع/ة السيارة ',null,null,"false",null,"null"),
(N'اسم و لقب ',N' مشتري/ة السيارة',null,null,"false",null,"null"),
(N' رقم بطاقة التعريف الوطنية',N' مشتري/ة السيارة ',null,null,"false",null,"null"),
(N' مقر سكنى',N' مشتري/ة السيارة ',null,null,"false",null,"null"),
(N' صانع السيارة ',null ,null,null,"false",N'المصنع اي علامة السيارة كان تكون مرسيدس / بيجو …',"null"),
(N'نوع السيارة ',null ,null,null,"false",null,"null"),
(N'العدد الرتبي بالمصنع ',null ,null,null,"false",null,"null"),
(N'العدد الرتبي بالمصنع ',null ,null,null,"false",null,"null"),
(N'القوة المقدرة ',N'بالحصان' ,null,null,"false",null,"null"),
(N'وقود السيارة  ',null ,null,null,"false",null,"null"),
(N'تاريخ أول إذن بالجولان  ',null ,null,null,"true",null,"null"),
(N'رقم التسجيل للسيارة  ',null ,null,null,"false",null,"null"),
(N'ثمن بيع السيارة  ',N'بالدينار التونسي' ,null,null,"false",null,"null"),
(N'تاريخ تحرير العقد  ',null ,null,null,"true",null,"null"),

-- vente 
(N'اسم ولقب ',N'البائع/ة' ,null,null,null,null,"null"),
(N'رقم بطاقة التعريف الوطنية ',N'البائع/ة' ,null,null,null,null,"null"),
(N'مقر سكنى ',N'البائع/ة' ,null,null,null,null,"null"),
(N'اسم ولقب ',N'المشتري/ة' ,null,null,null,null,"null"),
(N'رقم بطاقة التعريف الوطنية ',N'المشتري/ة' ,null,null,null,null,"null"),
(N'مقر سكنى ',N'المشتري/ة' ,null,null,null,null,"null"),
(N'موضوع عقد البيع ووصفه ',null ,null,null,null,null,"null"),
(N'ثمن البيع  ',N'بالدينار التونسي' ,null,null,null,null,"null"),
(N'تاريخ تحرير العقد  ',N'بالدينار التونسي' ,null,null,"true",null,"null"),

-- demande officiel 
(N'موضوع المطلب ',null ,null,null,null,null,"null"),
(N'اسم ولقب ',N'القائم/ة بالمطلب' ,null,null,null,null,"null"),
(N'رقم بطاقة التعريف الوطنية ',N'القائم/ة بالمطلب' ,null,null,null,null,"null"),
(N' تاريخ صدور بطاقة التعريف الوطنية',N'القائم/ة بالمطلب',null,null,"true",null,"null"),
(N' عنوان سكنى',N'القائم/ة بالمطلب',null,null,"false",null,"null"),
(N' صفة القائم بالمطلب',null,null,null,"false",N'طالب اذا كان المطلب موجه الى ادارة الكلية او موظف في الشركة اذا المطلب موجه للشركة الموظفة او ولي امر التلميذ/ة , بالنسبة للمدرسة او المعهد…',"null"),
(N'الهيكل أو صفة الشخص المسؤول ',N'المطلوب منه',null,null,"false",N' تحديد الطرف الموجه له المطلب: مثلا عميدة كلية العلوم بتونس, او المدير التنفيذي للبنك , او وزارة التربية والتعليم…',"null"),
(N' موضوع المطلب بالتفصيل',null,null,null,"false",null,"null"),
(N' تاريخ  تحرير المطلب ',null,null,null,"true",null,"null"),

-- procuration 
(N'اسم ولقب ',N'الموكل' ,null,null,null,N'الشخص اللي بش يعطيك التوكيل وبش تاخو بلاصتو',"null"),
(N'رقم بطاقة تعريف  ',N'الموكل' ,null,null,null,null,"null"),
(N'صفة الموكل',null ,null,null,null,null,"null"),
(N'اسم ولقب ',N'الوكيل' ,null,null,null,N'الشخص اللي بش يقوم بالتوكيل يعني اللي بش يقضي هو القضية في بلاصت العبد الآخر',"null"),
(N'رقم بطاقة تعريف',N'الوكيل ' ,null,null,null,null,"null"),
(N'الغرض من التوكيل',null ,null,null,null,N'مثلا لتمثيلي امام البلدية او لتمثيلي امام المجلس كذا كذا او امام الوزارة كذا كذا…',"null"),

-- CIVP
(N'اسم المؤسسة',null ,null,null,null,null,"null"),
(N'قطاع نشاط المؤسسة',null ,null,null,null,null,"null"),
(N' البريد الألكتروني للمؤسسة',null ,null,null,null,null,"null"),
(N' المقر الإجتماعي للمؤسسة',null ,null,null,null,null,"null"),
(N' المعرف الجبائي للمؤسسة',null ,null,null,null,null,"null"),
(N' رقم الانخراط بالصندوق الوطني للضمان االجتماعي للمؤسسة',null ,null,null,null,null,"null"),
(N'اسم ولقب',N'رئيس المؤسسة' ,null,null,null,null,"null"),
(N'اسم ولقب',N'الممثل القانوني للمؤسسة' ,null,null,null,null,"null"),
(N'اسم ولقب',N'المنتفع/ة' ,null,null,null,null,"null"),
(N'مكان ولادة ',N'المنتفع/ة' ,null,null,null,null,"null"),
(N'تاريخ ولادة ',N'المنتفع/ة' ,null,null,"true",null,"null"),
(N'رقم بطاقة التعريف الوطنية',N'المنتفع/ة' ,null,null,null,null,"null"),
(N'عنوان ',N'المنتفع/ة' ,null,null,null,null,"null"),
(N'البريد الالكتروني',N'المنتفع/ة' ,null,null,null,null,"null"),
(N'المستوى التعليمي ',N'المنتفع/ة' ,null,null,null,null,"null"),
(N'الاختصاص',N'المنتفع/ة' ,null,null,null,null,"null"),
(N'الشهادة التي تحصل عليها',N'المنتفع/ة' ,null,null,null,null,"null"),
(N'تاريخ الحصول على الشهادة',N'المنتفع/ة' ,null,null,"true",null,"null"),
(N'الحساب الجاري',N'المنتفع/ة' ,null,null,null,null,"null"),
(N'فرع البنك أو مكتب البريد',null ,null,null,null,null,"null"),
(N'المنصب المشغور في العمل',N'المنتفع/ة' ,null,null,null,null,"null"),
(N'اسم ولقب',N'المؤطر/ة للمنتفع/ة' ,null,null,null,null,"null"),
(N'صفة المؤطر/ة بالمؤسسة',null ,null,null,null,null,"null"),
(N'المقر الذي يجري فيه العمل',null ,null,null,null,null,"null"),
(N'تاريخ بداية عقد العمل',null ,null,null,"true",null,"null"),
(N'تاريخ نهاية عقد العمل ',null ,null,null,"true",null,"null"),
(N'المنحة الشهرية المتحصل عليها من قبل الوكالة الوطنية للتشغيل والعمل المستقل',N'بالدينار' ,null,null,null,null,"null"),
(N'المنحة الشهرية المتحصل عليها مباشرة من المشغل',N'بالدينار' ,null,null,null,null,"null"),
(N'تاريخ تحرير العقد',null ,null,null,"true",null,"null");


INSERT INTO etafakna.questions_FR(content_FR,part2_FR,inputType,options,date,explanation,text_Area)
VALUES

-- DEMANDE OFFICIEL
("A l'attention",N'Civilité du destinataire',null,"civilite","false",null,"nukk"),
(N'Nom et prénom',N'Du destinataire',null,null,"false",null,"nukk"),
(N'Quel est l’objet de votre demande',null,null,null,"false",null,"nukk"),
(N'Veuillez préciser votre demande',null,null,null,"false",null,"textArea"),
(N'Fait à',N'Veuillez préciser votre gouvernorat',null,null,"false",null,null),
("Date de la demande",null,null,null,"true",null,null),
(N'Votre nom et prénom',"Du demandeur",null,null,"false",null,null),

-- CDD
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
(N'Adresse',N'De l’employé',"n","n","n",null,null),
("Fonction",N'De l’employé',"n",null,null,null,null),
(N'Début du contrat',null,null,null,"true",null,null),
("Fin du contract",null,null,null,"true",null,null),
("Salaire mensuel","En dinars",null,null,null,null,null),
(N'Fait à',null,null,null,null,null,null),
("Date du contract",null,null,null,"true",null,null),

-- CONTRACT DE LOCATION A USAGE Bureau
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

-- CONTRACT DE LOCATION  à usage d'habitation
(N'Civilité',"Le propriétaire",null,"civilite",null,null,null),
(N'Entrez le nom et prénom',N'Le propriétaire',null,null,null,null,null),
(N'Demeurant à',N'Le propriétaire: Rue,gouvernorat et code postal',null,null,null,null,null),
(N'N° de la CIN',N'Le propriétaire',null,null,null,null,null),
(N'CIN délivrée le',N'Le propriétaire',null,null,null,null,null),
(N'Civilité',"Le locataire",null,"civilite",null,null,null),
(N'Entrez le nom et prénom',"Le locataire",null,null,null,null,null),
(N'Entrez la nationalité',"Le locataire",null,null,null,null,null),
(N'Date de naissance',"Le locataire","true",null,"true",null,null),
(N'N° de la CIN',"Le locataire",null,null,null,null,null),
(N'CIN délivrée le',"Le locataire","true",null,"true",null,null),
(N'Demeurant à',"Le locataire: Rue,gouvernorat et code postal",null,null,null,null,null),
(N'Décrivez le type de propriété',null,null,"typeproprite",null,null,null),
(N'Adresse de la propriété',N'Rue,gouvernorat et code postal',null,null,null,null,null),
(N'Durée de la location',null,null,null,null,null,null),
(N'Date de début de la location',null,"true",null,"true",null,null),
(N'Date de fin de la location',null,"true",null,"true",null,null),
(N'Montant de la location',"En dinars",null,null,null,null,null),
(N'Location est ',null,null,"jour",null,null,null),
(N'Montant du cautionnement en TND',"En dinars",null,null,null,null,null),
(N'Prise en charge des consommations (eau/électricité) par',null,null,"locprop",null,null,null),
(N'Date du contrat',null,"true",null,"true",null,null),

-- CONTRACT DENGAGEMENT
(N'Civilité',N'De l’engagé(e)',null,"civilite","n",null,null),
(N'Nom et prénom',N'De l’engagé(e)',null,null,"false",null,null),
(N'Numéro de CIN',null,null,null,null,null,null),
(N'CIN délivrée le',null,null,null,"true",null,null),
(N'Indiquer la fonction',N'De l’engagé(e)',null,null,null,null,null),
(N'Nom de ma société',null,null,null,null,null,null),
(N'Identifiant unique',null,null,null,null,null,null),
(N'Je m`engage',null,null,null,null,null,null),
(N'Fait le',null,null,null,"true",null,null),
(N'Fait à',null,null,null,null,null,null),

-- Contrat de Domiciliation
(N'Nom et prénom',null,null,null,"false",null,null),
(N'Numéro de carte CIN',null,null,null,null,null,null),
(N'CIN délivrée le',null,null,null,"true",null,null),
(N'Raison social',N'Nom de la société',null,null,null,null,null),
(N'Forme juridique',null,null,"form",null,null,null),
(N'Capital de la société',"En dinars",null,null,null,null,null),
(N'Adress du siège',null,null,null,null,null,null),
(N'À titre',null,null,"titre",null,null,null),
(N'Fait à',null,null,null,null,null,null),
(N'Fait le',null,null,null,"true",null,null),

-- Contrat de attestation de stage
(N'Civilité',"Employeur","civilite","civilite",null,null,null),
(N'Nom et prénom',"Employeur",null,null,null,null,null),
(N'Indiquer le fonction dans l’entreprise',"Employeur",null,null,null,null,null),
(N'Civilité',"Stagiare",null,"civilite",null,null,null),
(N'Nom et prénom',"Stagiare",null,null,null,null,null),
(N'Adresse du Stagiare',N'Rue, gouvernorat et code postal',null,null,null,null,null),
(N'Nom de l’entreprise',null,null,null,null,null,null),
(N'Date du début de stage',null,"true",null,"true",null,null),
(N'Date de fin du stage',null,"true",null,"true",null,null),
(N'Indiquer le poste dans l’entreprise',"Stagiaire",null,null,null,null,null),
(N'Fait le',null,null,null,"true",null,null),

-- Contract Devis Facture
(N'Quel est le nom de votre Société ?',null,null,NULL,null,null,null),
(N'Quel est votre gouvernorat ?',null,null,NULL,null,null,null),
(N'Quel est la date de votre facture ?',null,null,NULL,"true",null,null),
(N'Quel est le nom de la société de votre client ?',null,null,NULL,null,null,null),
(N'Quel est la Matricule Fiscale de votre client ?',null,null,NULL,null,null,null),
(N'Quel est le numéro de votre facture ?',null,null,NULL,null,null,null),
(N'Quel est l’année de la facture ?',null,null,NULL,null,null,null),
(N'Insérez le nom de votre produit ?',null,null,NULL,null,null,null),
(N'Insérez la quantité de ce produit?',null,null,NULL,null,null,null),
(N'Insérez le prix du produit',null,null,NULL,null,null,null),
(N'Quel est l’adresse de votre société?',null,null,NULL,null,null,null),
(N'Quel est la Matricule Fiscale de votre société ?',null,null,NULL,null,null,null),
(N'Quel est votre code postale',null,null,NULL,null,null,null),
(N'Quel est la somme de la facture',null,null,null,null,null,null),
(N'Quelle est les nombre des Produit',null,null,null,null,null,null),

-- CIVP 
(N'Nom de la société',null,null,null,null,null,null),
(N'Activité de la société ',null,null,null,null,null,null),
(N'Adresse de la société ',N'Rue',null,null,null,null,null),
(N'Adresse de la société ',N'Gouvernorat',null,null,null,null,null),
(N'Adresse de la société ',N'Pays',null,null,null,null,null),
(N'Adresse de la société ',N'Code Postal',null,null,null,null,null),
(N'Adresse électronique',null,null,null,null,null,null),
(N'Numéro de téléphone',null,null,null,null,null,null),
(N'N° du registre de commerce',null,null,null,null,null,null),
(N'Numéro d’affiliation CNSS',null,null,null,null,null,null),
(N'Civilité ',N'Du gérant(e) ',null,"civilite",null,null,null),
(N'Nom et prénom',N'Du gérant(e)',null,null,null,null,null),
(N'Civilité ',N'Du représentant',null,"civilite",null,null,null),
(N'Nom et prénom',N'Du remplaçant',null,null,null,null,null),
(N'En qualité de :',N'Du remplaçant',null,null,null,null,null),
(N'Numéro de téléphone ',N'Du représentant',null,null,null,null,null),
(N'Civilité ',N'Du bénéficiaire ',null,"civilite",null,null,null),
(N'Nom et prénom',N'Bénéficaire du CIVP',null,null,null,null,null),
(N'Date de naissance',N'Bénéficaire du CIVP',null,null,"true",null,null),
(N'Lieu de naissance',N'Bénéficaire du CIVP',null,null,null,null,null),
(N'Adresse du bénéficiare',N'Rue',null,null,null,null,null),
(N'Adresse du bénéficiare',N'Gouvernorat',null,null,null,null,null),
(N'Adresse du bénéficiare',N'Pays',null,null,null,null,null),
(N'Adresse du bénéficiare',N'Code Postal',null,null,null,null,null),
(N'Adresse électronique',N'Bénéficiare',null,null,null,null,null),
(N'Niveau scolaire ',N'Bénéficiare',null,null,null,null,null),
(N'Diplôme & specialité',N'Bénéficiare',null,null,null,null,null),
(N'Date d’obtention du diplôme',null,null,null,"true",null,null),
(N'N°du compte courant',null,null,null,null,null,null),
(N'Agence bancaire ou postale',null,null,null,null,null,null),
(N'Poste occupé',N'bénéficiare',null,null,null,null,null),
(N'Durée du contrat ',"Du",null,null,"true",null,null),
(N'Durée du contrat ',"Au",null,null,"true",null,null),
(N'Salaire mensuel',N'En dinars',null,null,null,null,null),
(N'Fait à ',null,null,null,null,null,null),
(N'Date du contrat',null,null,null,"true",null,null),

-- Procuration 
(N'Civilité ',N'Du Mandataire ',null,"civilite",null,N'C’est la personne qui donne la procuration',null),
(N'Nom et Prénom ',N'Du Mandataire ',null,null,null,N'C’est la personne qui donne la procuration',null),
(N'Numéro de la carte CIN',N'Du Mandataire ',null,null,null,N'C’est la personne qui donne la procuration',null),
(N'Date de délivrance de la carte CIN',N'Du Mandataire ',null,null,"true",N'C’est la personne qui donne la procuration',null),
(N'Veuillez précisez la qualité du mandat',null,null,null,null,null,null),
(N'Civilité',N'Personne qui va effectuer la procuration',null,"civilite",null,N'C’est la personne qui accepte d’effectuer la procuration',null),
(N'Nom et Prénom',N'Personne qui va effectuer la procuration',null,null,null,N'C’est la personne qui accepte d’effectuer la procuration',null),
(N'Nom de l’entité ou l’organisme auprés duquel sera effectué la procuration',null,null,null,null,null,null),
(N'Date de la demande',null,null,null,"true",null,null),
(N'Précisez le lieu de la demande',null,null,null,null,null,null);


-- insert question-has-contracttype 
INSERT INTO etafakna.questions_has_contract_types_EN(questions_id, contract_types_id, order_question)
VALUES

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
   (1, 4, 1),
   (2, 4, 2),
   (3, 4, 3),
   (4, 4, 4),
   (5, 4, 5),
   (6, 4, 6),
   (7, 4, 7),
   (8, 4, 8),
   (9, 4, 9),
   (10, 4, 10),
   (11, 4, 11),
   (12, 4, 12),
   (13, 4, 13),

  -- CDD
   (14, 23,1),
   (15, 23, 2),
   (16, 23, 3),
   (17, 23, 4),
   (18, 23, 5),
   (19, 23, 6),
   (20, 23, 7),
   (21, 23, 8),
   (22, 23, 9),
   (23, 23, 10),
   (24, 23, 11),
   (25, 23, 12),
   (26, 23, 13),
   (27, 23, 14),
   (28, 23, 15),
   (29, 23, 16),

-- CDI
   (30, 19,1),
   (31, 19, 2),
   (32, 19, 3),
   (33, 19, 4),
   (34, 19, 5),
   (35, 19, 6),
   (36, 19, 7),
   (37, 19, 8),
   (38, 19, 9),
   (39, 19, 10),
   (40, 19, 11),
   (41, 19, 12),

-- LOC dahabitation
   (42, 26, 1),
   (43, 26, 2),
   (44, 26, 3),
   (45, 26, 4),
   (46, 26, 5),
   (47, 26, 6),
   (48, 26, 7),
   (49, 26, 8),
   (50, 26, 9),
   (51, 26, 10),
   (52, 26, 11),
   (53, 26, 12),
   (54, 26, 13),
   (55, 26, 14),
   (56, 26, 15),

-- LOC commercial
   (57, 2,1),
   (58, 2, 2),
   (59, 2, 3),
   (60, 2, 4),
   (61, 2, 5),
   (62, 2, 6),
   (63, 2, 7),
   (64, 2, 8),
   (65, 2, 9),
   (66, 2, 10),
   (67, 2, 11),
   (68, 2, 12),
   (69, 2, 13),
   (70, 2, 14),
   (71, 2, 15),
   (72, 2, 16),

-- contract dengagement
   (73, 10,1),
   (74, 10, 2),
   (75, 10, 3),
   (76, 10, 4),
   (77, 10, 5),
   (78, 10, 6),

-- attes honneur
   (79, 15,1),
   (80, 15, 2),
   (81, 15, 3),
   (82, 15, 4),
   (83, 15, 5),
   (84, 15, 6),

-- con domiciel
   (85, 17,1),
   (86, 17, 2),
   (87, 17, 3),
   (88, 17, 4),
   (89, 17, 5),
   (90, 17, 6),
   (91, 17, 7),
   (92, 17, 8),
   (93, 17, 9),

-- freelance normal person
   (94, 21,1),
   (95, 21, 2),
   (96, 21, 3),
   (97, 21, 4),
   (98, 21, 5),
   (99, 21, 6),
   (100, 21, 7),
   (101, 21, 8),
   (102, 21, 9),
   (103, 21, 10),

 -- freelance company
   (104, 22,1),
   (105, 22, 2),
   (106, 22, 3),
   (107, 22, 4),
   (108, 22, 5),
   (109, 22, 6),
   (110, 22, 7),
   (111, 22, 8),
   (112, 22, 9),
   (113, 22, 10),
   (114, 22, 11),

   -- achat de voiture
   (115, 7,1),
   (116, 7,2),
   (117, 7,3),
   (118, 7,4),
   (119, 7,5),
   (120, 7,6),
   (121, 7,7),
   (122, 7,8),
   (123, 7,9),
   (124, 7,10),
   (125, 7,11),
   (126, 7,12),
   (127, 7,13),
   (128, 7,14),
   (129, 7,15),
   (130, 7,16),

-- vente sample 
   (131, 9,1),
   (132, 9,2),
   (133, 9,3),
   (134, 9,4),
   (135, 9,5),
   (136, 9,6),
   (137, 9,7),
   (138, 9,8),
   (139, 9,9),

-- demande off
   (140, 18,1),
   (141, 18,2),
   (142, 18,3),
   (143, 18,4),
   (144, 18,5),
   (145, 18,6),
   (146, 18,7),
   (147, 18,8),
   (148, 18,9),

  -- procuration
   (149, 27,1),
   (150, 27,2),
   (151, 27,3),
   (152, 27,4),
   (153, 27,5),
   (154, 27,6),

-- CIVP
   (155, 24,1),
   (156, 24, 2),
   (157, 24, 3),
   (158, 24, 4),
   (159, 24, 5),
   (160, 24, 6),
   (161, 24, 7),
   (162, 24, 8),
   (163, 24, 9),
   (164, 24, 10),
   (165, 24, 11),
   (166, 24, 12),
   (167, 24, 13),
   (168, 24, 14),
   (169, 24, 15),
   (170, 24, 16),
   (171, 24, 17),
   (172, 24, 18),
   (173, 24, 19),
   (174, 24, 20),
   (175, 24, 21),
   (176, 24, 22),
   (177, 24, 23),
   (178, 24, 24),
   (179, 24, 25),
   (180, 24, 26),
   (181, 24, 27),
   (182, 24, 28),
   (183, 24, 29);


INSERT INTO etafakna.questions_has_contract_types_FR(questions_id, contract_types_id, order_question)
VALUES

-- Questions Demande Officielle
   (1, 18, 1),
   (2, 18, 2),
   (3, 18, 3),
   (4, 18, 4),
   (5, 18, 5),
   (6, 18, 6),
   (7, 18, 7),

-- CDD
   (8, 23, 1),
   (9, 23, 2),
   (10, 23, 3),
   (11, 23, 4),
   (12, 23, 5),
   (13, 23, 6),
   (14, 23, 7),
   (15, 23, 8),
   (16, 23, 9),
   (17, 23, 10),
   (18, 23, 11),
   (19, 23, 12),
   (20, 23, 13),
   (21, 23, 14),
   (22, 23, 15),
   (23, 23, 16),
   (24, 23, 17),
   (25, 23, 18),
   (26, 23, 19),
   (27, 23, 20),

-- CONTRACT DE LOCATION A USAGE Bureau
   (28, 25, 1),
   (29, 25, 2),
   (30, 25, 3),
   (31, 25, 4),
   (32, 25, 5),
   (33, 25, 6),
   (34, 25, 7),
   (35, 25, 8),
   (36, 25, 9),
   (37, 25, 10),
   (38, 25, 11),
   (39, 25, 12),

-- CONTRACT DE LOCATION  à usage d'habitation
   (40, 26, 1),
   (41, 26, 2),
   (42, 26, 3),
   (43, 26, 4),
   (44, 26, 5),
   (45, 26, 6),
   (46, 26, 7),
   (47, 26, 8),
   (48, 26, 9),
   (49, 26, 10),
   (50, 26, 11),
   (51, 26, 12),
   (52, 26, 13),
   (53, 26, 14),
   (54, 26, 15),
   (55, 26, 16),
   (56, 26, 17),
   (57, 26, 18),
   (58, 26, 19),
   (59, 26, 20),
   (60, 26, 21),
   (61, 26, 22),

-- CONTRACT DENGAGEMENT
  (62, 10, 1),
  (63, 10, 2),
  (64, 10, 3),
  (65, 10, 4),
  (66, 10, 5),
  (67, 10, 6),
  (68, 10, 7),
  (69, 10, 8),
  (70, 10, 9),
  (71, 10, 10),

-- Contrat de Domiciliation
  (72, 17, 1),
  (73, 17, 2),
  (74, 17, 3),
  (75, 17, 4),
  (76, 17, 5),
  (77, 17, 6),
  (78, 17, 7),
  (79, 17, 8),
  (80, 17, 9),
  (81, 17, 10),

-- Contrat de attestation de stage
  (82, 4, 1),
  (83, 4, 2),
  (84, 4, 3),
  (85, 4, 4),
  (86, 4, 5),
  (87, 4, 6),
  (88, 4, 7),
  (89, 4, 8),
  (90, 4, 9),
  (91, 4, 10),
  (92, 4, 11) ,

  -- Contract Devis Facture
  (93, 13, 1),
  (94, 13, 2),
  (95, 13, 3),
  (96, 13, 5),
  (97, 13, 6),
  (98, 13, 7),
  (99,13, 8),
  (100,13, 10),
  (101,13, 11),
  (102,13, 12),
  (103,13, 13),
  (104,13, 14),
  (105,13, 15),
  (106,13, 16),
  (107,13, 17),

--  civp
  (108, 24, 1),
  (109, 24, 2),
  (110, 24, 3),
  (111, 24, 4),
  (112, 24, 5),
  (113, 24, 6),
  (114,24, 7),
  (115,24, 8),
  (116,24, 9),
  (117,24, 10),
  (118,24, 11),
  (119,24, 12),
  (120,24, 13),
  (121,24, 14),
  (122,24,  15),
  (123,24,  16),
  (124,24,  17),
  (125,24,  18),
  (126,24,  19),
  (127,24,  20),
  (128,24,  21),
  (129,24,  22),
  (130,24,  23),
  (131,24,  24),
  (132,24,  25),
  (133,24,  26),
  (134,24,  27),
  (135,24,  28),
  (136,24,  29),
  (137,24,  30),
  (138,24,  31),
  (139,24,  32),
  (140,24,  33),
  (141,24,  34),
  (142,24,  35),
  (143,24,  36),

  -- Procuration
  (144, 27, 1),
  (145, 27, 2),
  (146, 27, 3),
  (147, 27, 4),
  (148, 27, 5),
  (149, 27, 6),
  (150,27, 7),
  (151,27, 8),
  (152,27, 9),
  (153,27, 10);


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
    "massoudiomar54321@gmail.com",
    "$2b$10$sIzEhADNfPcEOUCO7ILtAunEbf8Y9YVQt2/gTaZ0TvHvNA3bN6U1O",
    "Beja",
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
    "Commercial rental",
    "Location commercial",
    N'عقد كراء محل تجاري',
    "desc_fr",
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665949431/icons/cdd_qmrm8e.png",
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1666878560/5._Loc_commerciale_AR_ffffff_fzvxbe.docx",
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
    N'شهادة تربص',
    N'L`attestation de stage E-Tafakna, aussi appelée le certificat de stage, est un document remis au stagiaire permettant de valider une expérience professionnelle au sein de l`entreprise.',
    "desc_AR",
    "In the broadest sense, a training certificate is a document certifying that the holder has taken a specific course of training.",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665949431/icons/attestation_de_stage_sn9jhb.png",
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1669974474/Attestation-de-stage_n2_fffffffffffffffffffff_vskvis.docx",
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
    "Microcredit",
    N'Contrat de Prêt numéraire (microcrédit)',
    N'عقد قرض مالي',
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
    N'عقد بيع سيارة',
    "This is Employment Contract Description",
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665949430/icons/achat_voiture_j3ikzr.png",
    "temp_FR",
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1669115378/11.Vente_voiture_AR_mwvqsr.docx",
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
    N'عقد بيع',
    "This is Employment Contract Description",
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665949430/icons/achat_vente_r4ifpl.png",
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1664737567/Template_Contrat_de_location_bureau_n3_xvsszr.docx",
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1669206427/12.Vente_simple_AR_3_okpkna.docx",
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
    N'التزام',
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
    N'عقد شراكة',
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
    N'فاتورة/devis',
    "This is Employment Contract Description",
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665949431/icons/facture_devis_ox5oml.png",
    "https://res.cloudinary.com/dn6kxvylo/raw/upload/v1665755893/Template_facture_ymmtjd.xlsx",
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
    "Devis ",
    N'فاتورة/التسعير',
    "This is Employment Contract Description",
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665949431/icons/facture_devis_ox5oml.png",
    "https://res.cloudinary.com/dn6kxvylo/raw/upload/v1665755893/Template_facture_ymmtjd.xlsx",
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
    "Certificate of honor",
    N'Attestation honneur',
    N'تصريح على الشرف',
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
    N'شهادة في ايواء شركة',
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
    N'مطلب رسمي',
    N'Une demande Officielle E-Tafakna constitue effectivement une preuve réelle de la démarche engagée que l`on peut réaliser et apporter à toutes fins utiles.',
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665949431/icons/demande_ofiicielle_y3pgqq.png",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/raw/upload/v1665573149/WORD-CONTRACTS/Demande_officielle_n4_m4cbe4_cfrc9c.docx",
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1669283486/9._Demande_AR_2_xvle6d.docx",
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
    N'عقد عمل غير محدد المدة',
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
    "Freelancer",
    "Freelance",
  N'عقد عمل حر',
    "This is Freelancer Description",
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665949432/icons/freelance_zbfpcj.png",
    "temp_FR",
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1669103221/10._Freelance_AR_1_em839z.docx",
    "temp_EN",
    "Tunisia",
  "types",
    "null",
     "freelance"
  ),
  (
    0,
    5,
    "Normal person",
    "Personne normale",
  N'مستقل',
    "This is Freelancer Description",
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665949432/icons/freelance_zbfpcj.png",
    "temp_FR",
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1669113821/10._Freelance_AR_10_zdu8do.docx",
    "temp_EN",
    "Tunisia",
   "freelance",
    "freelance",
    "null"
  ),
   (
    0,
    5,
    "Company",
    N'Société',
  N'مستقل',
    "This is Freelancer Description",
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665949432/icons/freelance_zbfpcj.png",
    "temp_FR",
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1669113672/10._Freelance_AR_4_dkpgy7.docx",
    "temp_EN",
    "Tunisia",
    "freelance",
    "null",
    "freelance"
  ),
  (
    0,
    5,
    "CDD",
    "CDD",
    N'عقد عمل محدد المدة',
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
    N'عقد الإعداد للحياة المهنية',
    "CIVP",
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dfctzd9p3/image/upload/v1664457759/unnamed_2_1_ztst4g.png",
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1669992093/5.2_CIVP_FR_niw0gv_6_k65laa_3_zfn3oi.docx",
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1669905016/13._CIVP_AR_5_lshd1x.docx",
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
    N'تأجير للاستخدام المكتبي',
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
    N'عقد كراء محل سكني',
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
  ),(
    0,
    5,
    "Proxy",
    "Procuration",
    N'توكيل',
    N'Desc_FR',
    "desc_AR",
    "desc_EN",
    "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665949431/icons/demande_ofiicielle_y3pgqq.png",
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1669992230/10._Procuration_FR_753_2_rrzxje.docx",
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1669884981/14._Procuration_AR_qhjo5o.docx",
    "temp_EN",
    "Tunisia",
    "types",
    "null",
    "null"
    
  );

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
