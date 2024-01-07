import prisma from "@/db";
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

    const requestFollowUpDate =
      request.nextUrl.searchParams.get("followUpDate");

    const [noOfPatientsForFollowUp, doctors] = await Promise.all([
      prisma.patientRecord.count({
        where: { followUpDate: requestFollowUpDate },
      }),
      prisma.user.findMany({
        where: { department: { name: "Doctor" } },
      }),
    ]);

    const doctorRecords = await prisma.patientRecord.groupBy({
      by: ["medicalDoctorUserId"],
      where: {
        status: "1",
        medicalDoctorUserId: { in: doctors.map((doctor) => doctor.id) },
      },
      _count: {
        id: true,
      },
    });

    return new NextResponse(
      JSON.stringify({
        doctorRecords,
        noOfPatientsForFollowUp: noOfPatientsForFollowUp,
        forCheckupByDoctors: doctors.map((doctor) => ({
          id: doctor.id,
          name: `${doctor.firstName} ${doctor.lastName}`,
          count:
            doctorRecords.find(
              (record) => record.medicalDoctorUserId === doctor.id
            )?._count.id ?? 0,
        })),
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
