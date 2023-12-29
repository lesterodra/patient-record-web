-- DropForeignKey
ALTER TABLE "patient_records" DROP CONSTRAINT "patient_records_patientInformationId_fkey";

-- AlterTable
ALTER TABLE "patient_records" ADD COLUMN     "dilateType" TEXT;

-- AddForeignKey
ALTER TABLE "patient_records" ADD CONSTRAINT "patient_records_patientInformationId_fkey" FOREIGN KEY ("patientInformationId") REFERENCES "patient_informations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
