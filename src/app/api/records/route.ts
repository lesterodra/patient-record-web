import prisma from "@/db";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../auth/[...nextauth]/option";

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
    const requestOrder = request.nextUrl.searchParams.get("sortOrder");
    const requestPatientInformationId = request.nextUrl.searchParams.get(
      "patientInformationId"
    );
    const requestQuickSearchInput =
      request.nextUrl.searchParams.get("quickSearchInput");
    const requestFollowUpDate =
      request.nextUrl.searchParams.get("followUpDate");

    const requestRecordNo = request.nextUrl.searchParams.get("recordNo");
    const requestPatientNo = request.nextUrl.searchParams.get("patientNo");
    const requestLastName = request.nextUrl.searchParams.get("lastName");
    const requestFirstName = request.nextUrl.searchParams.get("firstName");
    const requestMiddleName = request.nextUrl.searchParams.get("middleName");
    const requestBirthDate = request.nextUrl.searchParams.get("birthDate");
    const requestDateFrom = request.nextUrl.searchParams.get("dateFrom");
    const requestDateTo = request.nextUrl.searchParams.get("dateTo");
    const requestStatus = request.nextUrl.searchParams.get("status");
    const requestMedicalDoctorUserId = request.nextUrl.searchParams.get(
      "medicalDoctorUserId"
    );
    const requestSurgery = request.nextUrl.searchParams.get("surgery");

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
    const followUpDate = requestFollowUpDate || undefined;
    const status = requestStatus || undefined;
    const medicalDoctorUserId = requestMedicalDoctorUserId
      ? parseInt(requestMedicalDoctorUserId, 10)
      : undefined;
    const surgery = requestSurgery || undefined;

    if (dateToObject) {
      dateToObject.setDate(dateToObject.getDate() + 1);
    }

    const whereCondition: Prisma.PatientRecordWhereInput = {
      ...(quickSearchInput
        ? {
            OR: [
              {
                recordNo: {
                  contains: quickSearchInput,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
            ],
          }
        : {}),
      recordNo: { contains: recordNo, mode: Prisma.QueryMode.insensitive },
      patientInformationId,
      followUpDate,
      createdAt: {
        gte: dateFrom && new Date(dateFrom),
        lt: dateToObject,
      },
      surgeries: surgery ? { array_contains: [surgery] } : undefined,
      status,
      medicalDoctorUserId,
      patientInformation: {
        patientNo: { contains: patientNo, mode: Prisma.QueryMode.insensitive },
        lastName: { contains: lastName, mode: Prisma.QueryMode.insensitive },
        firstName: { contains: firstName, mode: Prisma.QueryMode.insensitive },
        middleName: {
          contains: middleName,
          mode: Prisma.QueryMode.insensitive,
        },
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
      include: {
        patientInformation: true,
        visualAcuities: true,
        medicalDoctorUser: true,
      },
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
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(JSON.stringify({ message: "Unauthenticated" }), {
        status: 401,
      });
    }

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
      medicalDoctorUserId,
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
      dilateType,
      surgeries,
      surgeryNotes,
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
          medicalDoctorUserId,
          refractionOd,
          refractionOdNegative,
          refractionOdX,
          refractionOs,
          refractionOsNegative,
          refractionOsX,
          refractionAdd,
          refractionPd,
          visitType,
          status: "1",
          dilateType,
          surgeries,
          surgeryNotes,
        },
        select: { id: true },
      });

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
