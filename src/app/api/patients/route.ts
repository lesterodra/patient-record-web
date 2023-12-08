import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const requestPage = request.nextUrl.searchParams.get("page");
    const requestLimit = request.nextUrl.searchParams.get("limit");
    const page = requestPage ? parseInt(requestPage, 10) : 1;
    const limit = requestLimit ? parseInt(requestLimit, 10) : 10;
    const skip = (page - 1) * limit;

    const totalPatientCount = await prisma.patientInformation.count();
    const patients = await prisma.patientInformation.findMany({
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
      personalMedicalHistories,
      previousSurgeries,
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
          personalMedicalHistories,
          previousSurgeries,
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
