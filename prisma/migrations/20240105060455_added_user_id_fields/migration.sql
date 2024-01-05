-- AlterTable
ALTER TABLE "patient_records" ADD COLUMN     "autoRefractionByUserId" INTEGER,
ADD COLUMN     "intraOcularPressureByUserId" INTEGER,
ADD COLUMN     "refractionByUserId" INTEGER,
ADD COLUMN     "visualAcuityByUserId" INTEGER;

-- AddForeignKey
ALTER TABLE "patient_records" ADD CONSTRAINT "patient_records_autoRefractionByUserId_fkey" FOREIGN KEY ("autoRefractionByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_records" ADD CONSTRAINT "patient_records_visualAcuityByUserId_fkey" FOREIGN KEY ("visualAcuityByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_records" ADD CONSTRAINT "patient_records_refractionByUserId_fkey" FOREIGN KEY ("refractionByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_records" ADD CONSTRAINT "patient_records_intraOcularPressureByUserId_fkey" FOREIGN KEY ("intraOcularPressureByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
