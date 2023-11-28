import prisma from "@/db";
import { NextResponse } from "next/server";

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
