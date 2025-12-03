import { NextResponse } from "next/server";
import { prisma } from "@/lib";
import { Prisma } from "@prisma/client";
import { getCurrentUser } from "@/lib/auth";
import { CreateMaintenanceCategorySchema } from "@/validations";

/* ###################################################################### */

// 一覧取得

const maintenanceCategorySelect = {
  id: true,
  name: true,
} satisfies Prisma.MaintenanceCategorySelect;

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

    const validated = CreateMaintenanceCategorySchema.safeParse({
      name,
    });

    if (!validated.success) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    const result = await prisma.maintenanceCategory.create({
      data: {
        name: validated.data.name,
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
