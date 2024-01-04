import prisma from "@/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { validatePassword, validateUsername } from "@/utils/validation";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/option";

export async function PATCH(
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

    const { body } = await request.json();
    const { password, username, confirmPassword } = body;
    const id = Number(params.id);

    if (username) {
      const usernameValidationError = validateUsername(username);

      if (usernameValidationError) {
        return new NextResponse(
          JSON.stringify({ message: usernameValidationError }),
          {
            status: 400,
          }
        );
      }
    }

    if (password) {
      const passwordValidationError = validatePassword(
        password,
        confirmPassword
      );

      if (passwordValidationError) {
        return new NextResponse(
          JSON.stringify({ message: passwordValidationError }),
          {
            status: 400,
          }
        );
      }
    }

    const user = await prisma.user.findFirst({ where: { id } });
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "Invalid user." }), {
        status: 400,
      });
    }

    const userWithSameUsername = await prisma.user.findMany({
      select: { id: true, username: true },
      where: { username },
    });

    if (
      username &&
      (userWithSameUsername.length > 1 ||
        (userWithSameUsername.length > 0 && userWithSameUsername[0].id !== id))
    ) {
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
        password: password ? bcrypt.hashSync(password, 10) : undefined,
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
