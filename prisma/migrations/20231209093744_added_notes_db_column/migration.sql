-- AlterTable
ALTER TABLE "patient_informations" ADD COLUMN     "knownAllergiesNotes" TEXT,
ADD COLUMN     "personalMedicalHistoriesNotes" TEXT,
ADD COLUMN     "previousSurgeriesNotes" TEXT;

-- AlterTable
ALTER TABLE "patient_records" ADD COLUMN     "reasonForVisitNotes" TEXT;
