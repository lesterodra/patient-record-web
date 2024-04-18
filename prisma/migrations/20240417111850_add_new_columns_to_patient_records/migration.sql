-- AlterTable
ALTER TABLE "patient_records" ADD COLUMN     "dilateTime" TEXT,
ADD COLUMN     "isConstric" BOOLEAN,
ADD COLUMN     "isDilate" BOOLEAN,
ADD COLUMN     "surgeryDilateType" TEXT;
