import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib";
import { Prisma } from "@prisma/client";
import { getCurrentUser } from "@/lib/auth";
import { UpdateBikeSchema } from "@/validations";

/* ###################################################################### */

// 取得

const bikeUniqueSelect = {
  id: true,
  name: true,
  mileage: true,
  memo: true,
  imageUrl: true,
} satisfies Prisma.BikeSelect;

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
      where: { id, userId, deletedAt: null },
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

// 編集

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

    // バリデーションチェック
    const validated = UpdateBikeSchema.safeParse({
      name,
      mileage,
      memo,
      imageUrl,
    });

    if (!validated.success) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    const { id } = await context.params;
    const result = await prisma.bike.update({
      data: {
        name: validated.data.name,
        mileage: validated.data.mileage,
        memo: validated.data.memo,
        imageUrl: validated.data.imageUrl,
      },
      where: { id, userId, deletedAt: null },
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

// 削除（論理削除）

export async function DELETE(
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
    const result = await prisma.bike.update({
      data: {
        deletedAt: new Date(),
      },
      where: { id, userId, deletedAt: null },
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
