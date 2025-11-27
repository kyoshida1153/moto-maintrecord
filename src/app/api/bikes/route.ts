import { NextResponse } from "next/server";
import { prisma } from "@/lib";
import { Prisma } from "@prisma/client";
import { getCurrentUser } from "@/actions";
import { BikeSchema } from "@/validations";

/* ###################################################################### */

// 一覧取得

const bikeSelect = {
  id: true,
  name: true,
  mileage: true,
  memo: true,
  imageUrl: true,
} satisfies Prisma.BikeSelect;

export type BikeSelect = Prisma.BikeGetPayload<{
  select: typeof bikeSelect;
}>;

export async function GET(): Promise<
  NextResponse<{ message: string; result?: BikeSelect[] }>
> {
  // 認証チェック
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const userId = currentUser.id;

  // ここからDB操作
  try {
    const result = await prisma.bike.findMany({
      select: bikeSelect,
      where: { userId, deletedAt: null },
      orderBy: { createdAt: "asc" },
    });

    if (result) {
      return NextResponse.json({ message: "Success", result }, { status: 201 });
    } else {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

/* ###################################################################### */

// 登録

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
    const { name, mileage, memo, imageUrl } = await request.json();

    // バリデーションチェック
    const validated = BikeSchema.safeParse({
      name,
      mileage,
      memo,
      imageUrl,
    });

    if (!validated.success) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    const result = await prisma.bike.create({
      data: {
        name,
        mileage,
        memo,
        imageUrl,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    if (result) {
      return NextResponse.json({ message: "Success" }, { status: 201 });
    } else {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
