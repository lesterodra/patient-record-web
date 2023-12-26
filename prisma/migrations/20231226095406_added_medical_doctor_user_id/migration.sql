-- AlterTable
ALTER TABLE "patient_records" ADD COLUMN     "medicalDoctorUserId" INTEGER;

-- AddForeignKey
ALTER TABLE "patient_records" ADD CONSTRAINT "patient_records_medicalDoctorUserId_fkey" FOREIGN KEY ("medicalDoctorUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
