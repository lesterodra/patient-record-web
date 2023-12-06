import prisma from "@/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { body } = await request.json();
    const { password, username } = body;
    const id = Number(params.id);

    await prisma.user.update({
      data: {
        username,
        password: bcrypt.hashSync(password, 10),
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
