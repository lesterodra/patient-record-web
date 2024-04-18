import prisma from "@/db";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../auth/[...nextauth]/option";
import * as logger from "@/utils/logger";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(JSON.stringify({ message: "Unauthenticated" }), {
        status: 401,
      });
    }

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
                firstName: {
                  contains: quickSearchInput,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
              {
                lastName: {
                  contains: quickSearchInput,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
              {
                middleName: {
                  contains: quickSearchInput,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
              {
                patientNo: {
                  contains: quickSearchInput,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
            ],
          }
        : {}),
      patientNo: { contains: patientNo, mode: Prisma.QueryMode.insensitive },
      firstName: { contains: firstName, mode: Prisma.QueryMode.insensitive },
      lastName: { contains: lastName, mode: Prisma.QueryMode.insensitive },
      middleName: { contains: middleName, mode: Prisma.QueryMode.insensitive },
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
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(JSON.stringify({ message: "Unauthenticated" }), {
        status: 401,
      });
    }

    const requestBody = await request.json();

    logger.info("create patient request", requestBody, session.user.username);

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
      sourceOfReferralNotes,
    } = requestBody;

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
          sourceOfReferralNotes,
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

      logger.info(
        "create patient success",
        { patientInformation },
        session.user.username
      );
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
