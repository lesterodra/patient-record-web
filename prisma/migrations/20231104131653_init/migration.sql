-- CreateTable
CREATE TABLE `PatientInformation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patientNo` VARCHAR(191) NOT NULL,
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
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PatientInformation_patientNo_key`(`patientNo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PatientRecord` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reasonForVisit` VARCHAR(191) NOT NULL,
    `previousMedicines` VARCHAR(191) NULL,
    `autoRefractionOD` VARCHAR(191) NULL,
    `autoRefractionOs` VARCHAR(191) NULL,
    `appointmentDateTime` DATETIME(3) NOT NULL,
    `intraOcularPressureOD` VARCHAR(191) NULL,
    `intraOcularPressureOS` VARCHAR(191) NULL,
    `medicalDoctor` VARCHAR(191) NULL,
    `patientInformationId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VisualAcuity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `eyeType` VARCHAR(191) NOT NULL,
    `sc` VARCHAR(191) NULL,
    `ph` VARCHAR(191) NULL,
    `cc` VARCHAR(191) NULL,
    `ncc` VARCHAR(191) NULL,
    `j` VARCHAR(191) NULL,
    `patientRecordId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PatientRecord` ADD CONSTRAINT `PatientRecord_patientInformationId_fkey` FOREIGN KEY (`patientInformationId`) REFERENCES `PatientInformation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VisualAcuity` ADD CONSTRAINT `VisualAcuity_patientRecordId_fkey` FOREIGN KEY (`patientRecordId`) REFERENCES `PatientRecord`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
