import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import getCurrentUser from "@/actions/getCurrentUser";

/* ###################################################################### */

// 取得

const bikeUniqueSelect = Prisma.validator<Prisma.BikeSelect>()({
  id: true,
  name: true,
  mileage: true,
  memo: true,
  imageUrl: true,
});

export type BikeUniqueSelect = Prisma.BikeGetPayload<{
  select: typeof bikeUniqueSelect;
}>;

export async function GET(
  _request: NextRequest,
  context: RouteContext<"/api/bikes/[id]">,
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

    const result = await prisma.bike.findUnique({
      select: bikeUniqueSelect,
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

export type BikeUpdateInput = Prisma.BikeUpdateInput;

export async function PUT(
  request: NextRequest,
  context: RouteContext<"/api/bikes/[id]">,
) {
  // 認証チェック
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const userId = currentUser.id;

  // ここからDB操作
  try {
    const { name, mileage, memo, imageUrl } = await request.json();
    const data: BikeUpdateInput = {
      name,
      mileage,
      memo,
      imageUrl,
    };

    const { id } = await context.params;
    const result = await prisma.bike.update({
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
