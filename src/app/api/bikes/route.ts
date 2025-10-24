import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import getCurrentUser from "@/actions/getCurrentUser";

const bikeSelect = Prisma.validator<Prisma.BikeSelect>()({
  id: true,
  name: true,
  mileage: true,
  memo: true,
  imageUrl: true,
});

export type BikeSelect = Prisma.BikeGetPayload<{
  select: typeof bikeSelect;
}>;

/**
 * 一覧取得
 */
export async function GET(): Promise<
  NextResponse<{ message: string; result?: BikeSelect[] }>
> {
  // 認証チェック
  const currentUser = await getCurrentUser();
  const userId: string = currentUser?.id ?? "";
  if (!currentUser && !userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // ここからDB操作
  try {
    const result = await prisma.bike.findMany({
      select: bikeSelect,
      where: { userId },
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

/**
 * 登録
 */
export async function POST(
  request: Request,
): Promise<NextResponse<{ message: string }>> {
  // 認証チェック
  const currentUser = await getCurrentUser();
  const userId: string = currentUser?.id ?? "";
  if (!currentUser && !userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // ここからDB操作
  try {
    const { name, mileage, memo, imageUrl } = await request.json();
    const result = await prisma.bike.create({
      data: { userId, name, mileage, memo, imageUrl },
    });

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
