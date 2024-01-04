import authOptions from "@/app/api/auth/[...nextauth]/option";
import prisma from "@/db";
import { put } from "@vercel/blob";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(
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

    const formData = await request.formData();
    const file = formData.get("file");
    const filename = formData.get("filename");

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

    const { url } = await put(filename as string, file as Blob, {
      access: "public",
    });

    await prisma.attachment.create({
      data: {
        url,
        patientRecordId: id,
      },
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
