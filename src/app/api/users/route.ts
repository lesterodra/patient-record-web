import prisma from "@/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../auth/[...nextauth]/option";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(JSON.stringify({ message: "Unauthenticated" }), {
        status: 401,
      });
    }

    const requestPage = request.nextUrl.searchParams.get("page");
    const requestLimit = request.nextUrl.searchParams.get("limit");
    const requestEmail = request.nextUrl.searchParams.get("email") ?? undefined;
    const requestDepartmentId =
      request.nextUrl.searchParams.get("departmentId");
    const page = requestPage ? parseInt(requestPage, 10) : 1;
    const limit = requestLimit ? parseInt(requestLimit, 10) : 10;
    const skip = (page - 1) * limit;
    const departmentId = requestDepartmentId
      ? Number(requestDepartmentId)
      : undefined;

    const whereCondition = { email: requestEmail, departmentId };
    const totalCount = await prisma.user.count({ where: whereCondition });
    const users = await prisma.user.findMany({
      where: whereCondition,
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
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(JSON.stringify({ message: "Unauthenticated" }), {
        status: 401,
      });
    }

    const {
      firstName,
      lastName,
      middleName,
      email,
      departmentId,
      username,
      status,
    } = await request.json();

    const user = await prisma.user.create({
      data: {
        username,
        firstName,
        lastName,
        middleName,
        email,
        departmentId,
        status,
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
