import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { text } from "node:stream/consumers";

export async function GET(request: NextRequest) {
  //   const page_str = request.nextUrl.searchParams.get("page");
  //   const limit_str = request.nextUrl.searchParams.get("limit");
  //   const page = page_str ? parseInt(page_str, 10) : 1;
  //   const limit = limit_str ? parseInt(limit_str, 10) : 10;
  //   const skip = (page - 1) * limit;
  //   const feedbacks = await prisma.feedback.findMany({
  //     skip,
  //     take: limit,
  //   });
  //   let json_response = {
  //     status: "success",
  //     results: feedbacks.length,
  //     feedbacks,
  //   };
  //   return NextResponse.json(json_response);
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
