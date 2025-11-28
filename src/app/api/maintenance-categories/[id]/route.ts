import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib";
import { Prisma } from "@prisma/client";
import { getCurrentUser } from "@/actions";
import { UpdateMaintenanceCategorySchema } from "@/validations";

/* ###################################################################### */

// 取得

const maintenanceCategoryUniqueSelect = {
  id: true,
  name: true,
} satisfies Prisma.MaintenanceCategorySelect;

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

    // バリデーションチェック
    const validated = UpdateMaintenanceCategorySchema.safeParse({
      name,
    });

    if (!validated.success) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    const { id } = await context.params;
    const result = await prisma.maintenanceCategory.update({
      data: {
        name: validated.data.name,
      },
      where: { id, userId },
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
    const result = await prisma.maintenanceCategory.update({
      data: {
        deletedAt: new Date(),
      },
      where: { id, userId },
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
