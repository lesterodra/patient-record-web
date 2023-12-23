import prisma from "@/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { firstName, lastName, middleName, departmentId, email, status } =
      await request.json();
    const id = Number(params.id);

    const user = await prisma.user.findFirst({ where: { id } });

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "Invalid user." }), {
        status: 400,
      });
    }

    await prisma.user.update({
      data: {
        firstName,
        lastName,
        middleName,
        departmentId,
        email,
        status,
      },
      where: { id },
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
