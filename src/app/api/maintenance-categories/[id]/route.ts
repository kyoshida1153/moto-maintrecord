import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import getCurrentUser from "@/actions/getCurrentUser";

/* ###################################################################### */

// 取得

const maintenanceCategoryUniqueSelect =
  Prisma.validator<Prisma.MaintenanceCategorySelect>()({
    id: true,
    name: true,
  });

export type MaintenanceCategoryUniqueSelect = Prisma.BikeGetPayload<{
  select: typeof maintenanceCategoryUniqueSelect;
}>;

export async function GET(
  _request: NextRequest,
  context: RouteContext<"/api/maintenance-categories/[id]">,
) {
  // 認証チェック
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const userId = currentUser.id;

  // ここからDB操作
  try {
    const { id } = await context.params;

    const result = await prisma.maintenanceCategory.findUnique({
      select: maintenanceCategoryUniqueSelect,
      where: { id, userId },
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

// 編集

export type MaintenanceCategoryUpdateInput =
  Prisma.MaintenanceCategoryUpdateInput;

export async function PUT(
  request: NextRequest,
  context: RouteContext<"/api/maintenance-categories/[id]">,
) {
  // 認証チェック
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const userId = currentUser.id;

  // ここからDB操作
  try {
    const { name } = await request.json();
    const data: MaintenanceCategoryUpdateInput = { name };

    const { id } = await context.params;
    const result = await prisma.maintenanceCategory.update({
      data,
      where: { id, userId },
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
