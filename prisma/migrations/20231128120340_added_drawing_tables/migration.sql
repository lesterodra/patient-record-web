-- CreateTable
CREATE TABLE "drawings" (
    "id" SERIAL NOT NULL,
    "data" TEXT,
    "patientRecordId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "drawings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "drawings" ADD CONSTRAINT "drawings_patientRecordId_fkey" FOREIGN KEY ("patientRecordId") REFERENCES "patient_records"("id") ON DELETE CASCADE ON UPDATE CASCADE;
