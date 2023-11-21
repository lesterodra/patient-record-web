import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const requestPage = request.nextUrl.searchParams.get("page");
    const requestLimit = request.nextUrl.searchParams.get("limit");
    const requestOrder = request.nextUrl.searchParams.get("sortOrder");
    const page = requestPage ? parseInt(requestPage, 10) : 1;
    const limit = requestLimit ? parseInt(requestLimit, 10) : 10;
    const skip = (page - 1) * limit;
    const orderBy = requestOrder ?? "desc";

    const totalRecordCount = await prisma.patientRecord.count();
    const records = await prisma.patientRecord.findMany({
      skip,
      take: limit,
      orderBy: {
        id: orderBy,
      } as any,
      include: { patientInformation: true },
    });

    return new NextResponse(
      JSON.stringify({
        page,
        limit,
        totalRecords: totalRecordCount,
        totalPage: Math.ceil(totalRecordCount / limit),
        data: records,
      })
    );
  } catch (error: any) {
    console.log({ error });

    return new NextResponse(JSON.stringify({ data: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request: Request) {
  try {
    const {
      patientInformationId,
      reasonForVisit,
      previousMedicines,
      autoRefractionOD,
      autoRefractionOs,
      appointmentTime,
      intraOcularPressureOD,
      intraOcularPressureOS,
      medicalDoctor,
      visualAcuities,
      refractionOd,
      refractionOdNegative,
      refractionOdX,
      refractionOs,
      refractionOsNegative,
      refractionOsX,
      refractionAdd,
      refractionPd,
    } = await request.json();

    await prisma.$transaction(async (tx) => {
      const patientRecord = await tx.patientRecord.create({
        data: {
          patientInformationId,
          reasonForVisit,
          previousMedicines,
          autoRefractionOD,
          autoRefractionOs,
          appointmentTime,
          intraOcularPressureOD,
          intraOcularPressureOS,
          medicalDoctor,
          refractionOd,
          refractionOdNegative,
          refractionOdX,
          refractionOs,
          refractionOsNegative,
          refractionOsX,
          refractionAdd,
          refractionPd,
        },
        select: { id: true },
      });
      console.log({ patientRecord });

      const dateToday = new Date();
      await tx.patientRecord.update({
        data: {
          recordNo: `RC-${dateToday.getFullYear()}${(dateToday.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${patientRecord.id.toString().padStart(7, "0")}`,
        },
        where: { id: patientRecord.id },
      });

      await tx.visualAcuity.createMany({
        data: visualAcuities.map((visualAcuity: any) => ({
          ...visualAcuity,
          patientRecordId: patientRecord.id,
        })),
      });
    });
    return new NextResponse(JSON.stringify({ data: "Successful" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log({ error });

    return new NextResponse(JSON.stringify({ data: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
