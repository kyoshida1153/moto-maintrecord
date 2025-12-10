import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib";
import { Prisma } from "@prisma/client";
import { getCurrentUser } from "@/lib/auth";
import {
  UpdateMaintenanceCategorySchema,
  DeleteMaintenanceCategorySchema,
} from "@/validations";

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
  _req: NextRequest,
  ctx: RouteContext<"/api/maintenance-categories/[id]">,
) {
  // 認証チェック
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const userId = currentUser.id;

  // ここからDB操作
  try {
    const { id } = await ctx.params;

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
  req: NextRequest,
  ctx: RouteContext<"/api/maintenance-categories/[id]">,
) {
  // 認証チェック
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const userId = currentUser.id;

  // ここからDB操作
  try {
    const { id } = await ctx.params;
    const { name } = await req.json();

    // バリデーションチェック
    const validated = UpdateMaintenanceCategorySchema.safeParse({
      id,
      name,
    });

    if (!validated.success) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    const result = await prisma.maintenanceCategory.update({
      data: {
        name: validated.data.name,
      },
      where: { id: validated.data.id, userId, deletedAt: null },
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
  _req: NextRequest,
  ctx: RouteContext<"/api/maintenance-categories/[id]">,
) {
  // 認証チェック
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const userId = currentUser.id;

  // ここからDB操作
  try {
    const { id } = await ctx.params;

    // バリデーションチェック
    const validated = DeleteMaintenanceCategorySchema.safeParse({
      id,
    });

    if (!validated.success) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    const result = await prisma.maintenanceCategory.update({
      data: {
        deletedAt: new Date(),
      },
      where: { id: validated.data.id, userId, deletedAt: null },
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
