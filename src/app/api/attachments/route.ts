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
