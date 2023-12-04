import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    console.log("user list api");
    const requestPage = request.nextUrl.searchParams.get("page");
    const requestLimit = request.nextUrl.searchParams.get("limit");
    const requestEmail = request.nextUrl.searchParams.get("email");
    const page = requestPage ? parseInt(requestPage, 10) : 1;
    const limit = requestLimit ? parseInt(requestLimit, 10) : 10;
    const skip = (page - 1) * limit;

    const totalCount = await prisma.user.count();
    const users = await prisma.user.findMany({
      where: { email: requestEmail },
      select: {
        id: true,
        username: true,
        lastName: true,
        firstName: true,
        department: true,
      },
      skip,
      take: limit,
      orderBy: {
        id: "desc",
      },
    });

    return new NextResponse(
      JSON.stringify({
        page,
        limit,
        totalRecords: totalCount,
        totalPage: Math.ceil(totalCount / limit),
        data: users,
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

export async function POST(request: Request) {
  try {
    const { firstName, lastName, middleName, email, departmentId, username } =
      await request.json();

    const user = await prisma.user.create({
      data: {
        username,
        firstName,
        lastName,
        middleName,
        email,
        departmentId,
      },
      select: { id: true },
    });

    console.log("User created: ", user.id);

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
