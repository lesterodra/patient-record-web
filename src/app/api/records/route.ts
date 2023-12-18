import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const requestPage = request.nextUrl.searchParams.get("page");
    const requestLimit = request.nextUrl.searchParams.get("limit");
    const requestOrder = request.nextUrl.searchParams.get("sortOrder");
    const requestPatientInformationId = request.nextUrl.searchParams.get(
      "patientInformationId"
    );
    const requestQuickSearchInput =
      request.nextUrl.searchParams.get("quickSearchInput");

    const requestRecordNo = request.nextUrl.searchParams.get("recordNo");
    const requestPatientNo = request.nextUrl.searchParams.get("patientNo");
    const requestLastName = request.nextUrl.searchParams.get("lastName");
    const requestFirstName = request.nextUrl.searchParams.get("firstName");
    const requestMiddleName = request.nextUrl.searchParams.get("middleName");
    const requestBirthDate = request.nextUrl.searchParams.get("birthDate");
    const requestDateFrom = request.nextUrl.searchParams.get("dateFrom");
    const requestDateTo = request.nextUrl.searchParams.get("dateTo");

    const dateFrom = requestDateFrom || undefined;
    const dateTo = requestDateTo || undefined;
    const quickSearchInput = requestQuickSearchInput || undefined;
    const recordNo = requestRecordNo || undefined;
    const patientNo = requestPatientNo || undefined;
    const firstName = requestFirstName || undefined;
    const lastName = requestLastName || undefined;
    const middleName = requestMiddleName || undefined;
    const birthDate = requestBirthDate || undefined;
    const page = requestPage ? parseInt(requestPage, 10) : 1;
    const limit = requestLimit ? parseInt(requestLimit, 10) : 10;
    const patientInformationId = requestPatientInformationId
      ? parseInt(requestPatientInformationId, 10)
      : undefined;
    const skip = (page - 1) * limit;
    const orderBy = requestOrder ?? "desc";
    const dateToObject = dateTo && new Date(dateTo);

    if (dateToObject) {
      dateToObject.setDate(dateToObject.getDate() + 1);
    }

    const whereCondition = {
      ...(quickSearchInput
        ? {
            OR: [
              {
                recordNo: { contains: quickSearchInput },
              },
            ],
          }
        : {}),
      recordNo,
      patientInformationId,
      createdAt: {
        gte: dateFrom && new Date(dateFrom),
        lt: dateToObject,
      },
      patientInformation: {
        patientNo,
        lastName,
        firstName,
        middleName,
        birthDate,
      },
    };

    const totalRecordCount = await prisma.patientRecord.count({
      where: whereCondition,
    });
    const records = await prisma.patientRecord.findMany({
      where: whereCondition,
      skip,
      take: limit,
      orderBy: {
        id: orderBy,
      } as any,
      include: { patientInformation: true, visualAcuities: true },
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
      reasonForVisitNotes,
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
      visitType,
    } = await request.json();

    await prisma.$transaction(async (tx) => {
      const patientRecord = await tx.patientRecord.create({
        data: {
          patientInformationId,
          reasonForVisit,
          reasonForVisitNotes,
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
          visitType,
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
