import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const requestEmail = request.nextUrl.searchParams.get("email");
    const email = requestEmail;

    const user = await prisma.user.findFirstOrThrow({
      where: { email },
      select: {
        id: true,
        username: true,
        lastName: true,
        firstName: true,
        middleName: true,
        department: true,
        email: true,
        status: true,
        departmentId: true,
      },
    });

    return new NextResponse(
      JSON.stringify({
        isValid: !user?.username,
        data: { id: user?.id, firstName: user?.firstName },
      })
    );
  } catch (error: any) {
    console.log({ error });

    return new NextResponse(JSON.stringify({ data: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
