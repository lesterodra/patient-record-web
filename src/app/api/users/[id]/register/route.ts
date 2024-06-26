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

    const user = await prisma.user.findFirst({ where: { id } });

    if (!user || user?.username !== null) {
      return new NextResponse(JSON.stringify({ message: "Invalid user." }), {
        status: 400,
      });
    }

    const existingUsernameCount = await prisma.user.count({
      where: { username },
    });

    if (existingUsernameCount > 0) {
      return new NextResponse(
        JSON.stringify({ message: "Username already in used!" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await prisma.user.update({
      data: {
        username,
        password: bcrypt.hashSync(password, 10),
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
