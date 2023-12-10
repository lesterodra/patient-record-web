import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const requestPage = request.nextUrl.searchParams.get("page");
    const requestLimit = request.nextUrl.searchParams.get("limit");
    const requestQuickSearchInput =
      request.nextUrl.searchParams.get("quickSearchInput");
    const requestPatientNo = request.nextUrl.searchParams.get("patientNo");
    const requestLastName = request.nextUrl.searchParams.get("lastName");
    const requestFirstName = request.nextUrl.searchParams.get("firstName");
    const requestMiddleName = request.nextUrl.searchParams.get("middleName");
    const requestBirthDate = request.nextUrl.searchParams.get("birthDate");

    const quickSearchInput = requestQuickSearchInput || undefined;
    const patientNo = requestPatientNo || undefined;
    const firstName = requestFirstName || undefined;
    const lastName = requestLastName || undefined;
    const middleName = requestMiddleName || undefined;
    const birthDate = requestBirthDate || undefined;
    const page = requestPage ? parseInt(requestPage, 10) : 1;
    const limit = requestLimit ? parseInt(requestLimit, 10) : 10;
    const skip = (page - 1) * limit;

    const whereCondition = {
      ...(quickSearchInput
        ? {
            OR: [
              {
                firstName: { contains: quickSearchInput },
              },
              {
                lastName: { contains: quickSearchInput },
              },
              {
                middleName: { contains: quickSearchInput },
              },
              {
                patientNo: { contains: quickSearchInput },
              },
            ],
          }
        : {}),
      patientNo: { contains: patientNo },
      firstName: { contains: firstName },
      lastName: { contains: lastName },
      middleName: { contains: middleName },
      birthDate,
    };

    const totalPatientCount = await prisma.patientInformation.count({
      where: whereCondition,
    });
    const patients = await prisma.patientInformation.findMany({
      where: whereCondition,
      skip,
      take: limit,
      orderBy: {
        id: "desc",
      },
    });

    return new NextResponse(
      JSON.stringify({
        page,
        limit,
        totalRecords: totalPatientCount,
        totalPage: Math.ceil(totalPatientCount / limit),
        data: patients,
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
      firstName,
      lastName,
      middleName,
      philHealthNo,
      height,
      weight,
      birthDate,
      address,
      province,
      municipality,
      barangay,
      gender,
      nationality,
      civilStatus,
      contactNo,
      knownAllergies,
      knownAllergiesNotes,
      personalMedicalHistories,
      personalMedicalHistoriesNotes,
      previousSurgeries,
      previousSurgeriesNotes,
      appointmentType,
      dilateType,
      sourceOfReferral,
    } = await request.json();

    await prisma.$transaction(async (tx) => {
      const patientInformation = await tx.patientInformation.create({
        data: {
          firstName,
          lastName,
          middleName,
          philHealthNo,
          height,
          weight,
          birthDate,
          address,
          province,
          municipality,
          barangay,
          gender,
          nationality,
          civilStatus,
          contactNo,
          knownAllergies,
          knownAllergiesNotes,
          personalMedicalHistories,
          personalMedicalHistoriesNotes,
          previousSurgeries,
          previousSurgeriesNotes,
          appointmentType,
          dilateType,
          sourceOfReferral,
        },
        select: { id: true },
      });

      const dateToday = new Date();
      await tx.patientInformation.update({
        data: {
          patientNo: `DRS-${dateToday.getFullYear()}${(dateToday.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${patientInformation.id
            .toString()
            .padStart(7, "0")}`,
        },
        where: { id: patientInformation.id },
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
