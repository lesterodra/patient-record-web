import prisma from "@/db";
import { NextResponse } from "next/server";

export async function GET(_: any, { params }: { params: { id: string } }) {
  try {
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
    } = await request.json();

    const id = Number(params.id);

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
      },
      where: { id },
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
