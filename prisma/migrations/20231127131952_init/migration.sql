-- CreateTable
CREATE TABLE "patient_informations" (
    "id" SERIAL NOT NULL,
    "patientNo" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "middleName" TEXT,
    "philHealthNo" TEXT,
    "height" TEXT,
    "weight" TEXT,
    "birthDate" TEXT,
    "address" TEXT,
    "gender" TEXT,
    "nationality" TEXT,
    "civilStatus" TEXT,
    "contactNo" TEXT,
    "knownAllergies" JSONB,
    "personalMedicalHistories" JSONB,
    "previousSurgeries" JSONB,
    "appointmentType" TEXT,
    "dilateType" TEXT,
    "sourceOfReferral" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "patient_informations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient_records" (
    "id" SERIAL NOT NULL,
    "recordNo" TEXT,
    "reasonForVisit" JSONB,
    "previousMedicines" TEXT,
    "autoRefractionOD" TEXT,
    "autoRefractionOs" TEXT,
    "appointmentTime" TEXT,
    "intraOcularPressureOD" TEXT,
    "intraOcularPressureOS" TEXT,
    "medicalDoctor" TEXT,
    "patientInformationId" INTEGER NOT NULL,
    "refractionOd" TEXT,
    "refractionOdNegative" TEXT,
    "refractionOdX" TEXT,
    "refractionOs" TEXT,
    "refractionOsNegative" TEXT,
    "refractionOsX" TEXT,
    "refractionAdd" TEXT,
    "refractionPd" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "patient_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visual_acuities" (
    "id" SERIAL NOT NULL,
    "eyeType" TEXT NOT NULL,
    "sc" TEXT,
    "ph" TEXT,
    "cc" TEXT,
    "ncc" TEXT,
    "j" TEXT,
    "patientRecordId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "visual_acuities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "patient_informations_patientNo_key" ON "patient_informations"("patientNo");

-- CreateIndex
CREATE UNIQUE INDEX "patient_records_recordNo_key" ON "patient_records"("recordNo");

-- AddForeignKey
ALTER TABLE "patient_records" ADD CONSTRAINT "patient_records_patientInformationId_fkey" FOREIGN KEY ("patientInformationId") REFERENCES "patient_informations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visual_acuities" ADD CONSTRAINT "visual_acuities_patientRecordId_fkey" FOREIGN KEY ("patientRecordId") REFERENCES "patient_records"("id") ON DELETE CASCADE ON UPDATE CASCADE;
