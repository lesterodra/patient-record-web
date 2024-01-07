import prisma from "@/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import authOptions from "../../auth/[...nextauth]/option";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID ?? "",
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY ?? "",
  secret: process.env.PUSHER_APP_SECRET ?? "",
  cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER ?? "",
  useTLS: true,
});

export async function GET(_: any, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(JSON.stringify({ message: "Unauthenticated" }), {
        status: 401,
      });
    }

    const response = await prisma.patientRecord.findFirstOrThrow({
      where: { id: Number(params.id) },
      include: { visualAcuities: true },
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

    const {
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
      autoRefractionByUserId,
      visualAcuityByUserId,
      refractionByUserId,
      intraOcularPressureByUserId,
    } = await request.json();

    const id = Number(params.id);

    const patientRecord = await prisma.patientRecord.findFirst({
      where: { id },
      include: { visualAcuities: true },
    });

    if (!patientRecord) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid patient record." }),
        {
          status: 400,
        }
      );
    }

    if (patientRecord.visualAcuities.length !== 2) {
      console.log("invalid visual acuities: record id =", id);
      throw new Error("internal error");
    }

    const response = await prisma.patientRecord.update({
      data: {
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
        dilateType,
        surgeries,
        surgeryNotes,
        autoRefractionByUserId,
        visualAcuityByUserId,
        refractionByUserId,
        intraOcularPressureByUserId,
      },
      where: { id },
    });

    const visualAcuityOd = visualAcuities.find(
      (visualAcuity: any) => visualAcuity.eyeType === "OD"
    );
    const visualAcuityOs = visualAcuities.find(
      (visualAcuity: any) => visualAcuity.eyeType === "OS"
    );

    await Promise.all([
      prisma.visualAcuity.updateMany({
        data: visualAcuityOd,
        where: { eyeType: "OD", patientRecordId: id },
      }),
      prisma.visualAcuity.updateMany({
        data: visualAcuityOs,
        where: { eyeType: "OS", patientRecordId: id },
      }),
    ]);

    try {
      if (medicalDoctorUserId !== patientRecord.medicalDoctorUserId) {
        pusher.trigger("dashboard", "updateDoctorRecordCount", { data: {} });
      }
    } catch (error) {
      console.log("Pusher error:", error);
    }

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
