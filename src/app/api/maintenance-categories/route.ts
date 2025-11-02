import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import getCurrentUser from "@/actions/getCurrentUser";

/* ###################################################################### */

// 一覧取得

const maintenanceCategorySelect =
  Prisma.validator<Prisma.MaintenanceCategorySelect>()({
    id: true,
    name: true,
  });

export type MaintenanceCategorySelect = Prisma.MaintenanceCategoryGetPayload<{
  select: typeof maintenanceCategorySelect;
}>;

export async function GET(): Promise<
  NextResponse<{ message: string; result?: MaintenanceCategorySelect[] }>
> {
  // 認証チェック
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const userId = currentUser.id;

  // ここからDB操作
  try {
    const result = await prisma.maintenanceCategory.findMany({
      select: maintenanceCategorySelect,
      where: { userId, deletedAt: null },
      orderBy: { createdAt: "asc" },
    });

    if (result) {
      return NextResponse.json({ message: "Success", result }, { status: 201 });
    } else {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }
  } catch {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

/* ###################################################################### */

// 登録

export type MaintenanceCategoryCreateInput =
  Prisma.MaintenanceCategoryCreateInput;

export async function POST(
  request: Request,
): Promise<NextResponse<{ message: string }>> {
  // 認証チェック
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const userId = currentUser.id;

  // ここからDB操作
  try {
    const { name } = await request.json();
    const data: MaintenanceCategoryCreateInput = {
      name,
      user: {
        connect: {
          id: userId,
        },
      },
    };

    const result = await prisma.maintenanceCategory.create({ data });

    if (result) {
      return NextResponse.json({ message: "Success" }, { status: 201 });
    } else {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }
  } catch {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
