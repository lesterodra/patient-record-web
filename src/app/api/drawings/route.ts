import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { patientRecordId, dataUrl } = await request.json();

    const drawing = await prisma.drawing.create({
      data: {
        patientRecordId,
        data: dataUrl,
      },
      select: { id: true },
    });

    console.log({ drawing });

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

export async function GET(request: NextRequest) {
  try {
    const requestPatientRecordId =
      request.nextUrl.searchParams.get("patientRecordId");
    const patientRecordId = requestPatientRecordId
      ? parseInt(requestPatientRecordId, 10)
      : 0;

    const drawings = await prisma.drawing.findMany({
      where: { patientRecordId },
    });

    return new NextResponse(JSON.stringify(drawings));
  } catch (error: any) {
    console.log({ error });

    return new NextResponse(JSON.stringify({ data: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
