-- CreateTable
CREATE TABLE `patient_informations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patientNo` VARCHAR(191) NULL,
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `middleName` VARCHAR(191) NULL,
    `philHealthNo` VARCHAR(191) NULL,
    `height` VARCHAR(191) NULL,
    `weight` VARCHAR(191) NULL,
    `birthDate` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `gender` VARCHAR(191) NULL,
    `nationality` VARCHAR(191) NULL,
    `civilStatus` VARCHAR(191) NULL,
    `contactNo` VARCHAR(191) NULL,
    `knownAllergies` JSON NULL,
    `personalMedicalHistories` JSON NULL,
    `previousSurgeries` JSON NULL,
    `appointmentType` VARCHAR(191) NULL,
    `dilateType` VARCHAR(191) NULL,
    `sourceOfReferral` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `patient_informations_patientNo_key`(`patientNo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patient_records` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `recordNo` VARCHAR(191) NULL,
    `reasonForVisit` JSON NULL,
    `previousMedicines` TEXT NULL,
    `autoRefractionOD` VARCHAR(191) NULL,
    `autoRefractionOs` VARCHAR(191) NULL,
    `appointmentTime` VARCHAR(191) NULL,
    `intraOcularPressureOD` VARCHAR(191) NULL,
    `intraOcularPressureOS` VARCHAR(191) NULL,
    `medicalDoctor` VARCHAR(191) NULL,
    `patientInformationId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `patient_records_recordNo_key`(`recordNo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `visual_acuities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `eyeType` VARCHAR(191) NOT NULL,
    `sc` VARCHAR(191) NULL,
    `ph` VARCHAR(191) NULL,
    `cc` VARCHAR(191) NULL,
    `ncc` VARCHAR(191) NULL,
    `j` VARCHAR(191) NULL,
    `patientRecordId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `patient_records` ADD CONSTRAINT `patient_records_patientInformationId_fkey` FOREIGN KEY (`patientInformationId`) REFERENCES `patient_informations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `visual_acuities` ADD CONSTRAINT `visual_acuities_patientRecordId_fkey` FOREIGN KEY (`patientRecordId`) REFERENCES `patient_records`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
