import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const requestPatientRecordId =
      request.nextUrl.searchParams.get("patientRecordId");
    const patientRecordId = requestPatientRecordId
      ? parseInt(requestPatientRecordId, 10)
      : 0;

    const attachments = await prisma.attachment.findMany({
      where: { patientRecordId },
    });

    return new NextResponse(JSON.stringify(attachments));
  } catch (error: any) {
    console.log({ error });

    return new NextResponse(JSON.stringify({ data: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
