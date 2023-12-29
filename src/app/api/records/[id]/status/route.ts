import prisma from "@/db";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { body } = await request.json();
    const { status } = body;

    const id = Number(params.id);

    const patientRecord = await prisma.patientRecord.findFirst({
      where: { id },
    });

    if (!patientRecord) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid patient record." }),
        {
          status: 400,
        }
      );
    }

    await prisma.patientRecord.update({
      data: {
        status,
      },
      where: { id },
    });

    return new NextResponse(JSON.stringify({ message: "Successful" }), {
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
