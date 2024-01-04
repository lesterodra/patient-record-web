import prisma from "@/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../auth/[...nextauth]/option";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(JSON.stringify({ message: "Unauthenticated" }), {
        status: 401,
      });
    }

    const { patientRecordId, dataUrl } = await request.json();

    await prisma.drawing.create({
      data: {
        patientRecordId,
        data: dataUrl,
      },
      select: { id: true },
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
