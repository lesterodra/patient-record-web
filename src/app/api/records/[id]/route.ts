import prisma from "@/db";
import { NextResponse } from "next/server";

export async function GET(_: any, { params }: { params: { id: string } }) {
  try {
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
