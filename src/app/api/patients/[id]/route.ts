import prisma from "@/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import authOptions from "../../auth/[...nextauth]/option";
import * as logger from "@/utils/logger";

export async function GET(_: any, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(JSON.stringify({ message: "Unauthenticated" }), {
        status: 401,
      });
    }

    const response = await prisma.patientInformation.findFirstOrThrow({
      where: { id: Number(params.id) },
    });

    return new NextResponse(
      JSON.stringify({ message: "Successful", data: response }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.log({ error });

    return new NextResponse(JSON.stringify({ data: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(JSON.stringify({ message: "Unauthenticated" }), {
        status: 401,
      });
    }

    const id = Number(params.id);
    const requestBody = await request.json();

    logger.info(
      `update patient request: ${id}`,
      requestBody,
      session.user.username
    );

    const {
      lastName,
      firstName,
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

    const patient = await prisma.patientInformation.findFirst({
      where: { id },
    });

    if (!patient) {
      return new NextResponse(JSON.stringify({ message: "Invalid patient." }), {
        status: 400,
      });
    }

    const response = await prisma.patientInformation.update({
      data: {
        lastName,
        firstName,
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
      where: { id },
    });

    logger.info(`update patient success: ${id}`, {}, session.user.username);

    return new NextResponse(
      JSON.stringify({ message: "Successful", data: response }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.log({ error });

    return new NextResponse(JSON.stringify({ data: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
