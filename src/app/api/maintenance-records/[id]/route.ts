import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib";
import { Prisma } from "@prisma/client";
import { getCurrentUser } from "@/lib/auth";
import { UpdateMaintenanceRecordSchema } from "@/validations/UpdateMaintenanceRecordSchema";

/* ###################################################################### */

// 取得

const maintenanceRecordUniqueSelect = {
  id: true,
  calenderDate: true,
  isDone: true,
  title: true,
  cost: true,
  memo: true,
  mileage: true,
  bike: {
    select: { id: true, name: true, imageUrl: true },
  },
  maintenanceCategory: {
    select: { id: true, name: true },
  },
  maintenanceRecordImages: {
    select: { id: true, imageUrl: true },
    where: {
      deletedAt: null,
    },
  },
} satisfies Prisma.MaintenanceRecordSelect;

export type MaintenanceRecordUniqueSelect = Prisma.MaintenanceRecordGetPayload<{
  select: typeof maintenanceRecordUniqueSelect;
}>;

export async function GET(
  _request: NextRequest,
  context: RouteContext<"/api/maintenance-records/[id]">,
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

    const result = await prisma.maintenanceRecord.findFirst({
      select: maintenanceRecordUniqueSelect,
      where: {
        id,
        userId,
        deletedAt: null,
      },
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
  context: RouteContext<"/api/maintenance-records/[id]">,
) {
  // 認証チェック
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const userId = currentUser.id;

  // ここからDB操作
  try {
    const {
      bikeId,
      maintenanceCategoryId,
      calenderDate: calenderDateString,
      isDone,
      title,
      cost,
      memo,
      mileage,
      maintenanceRecordImageUrls,
    } = await request.json();

    const calenderDate = new Date(calenderDateString);
    if (isNaN(calenderDate.getTime())) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    // バリデーションチェック
    const validated = UpdateMaintenanceRecordSchema.safeParse({
      bikeId,
      maintenanceCategoryId,
      calenderDate,
      isDone,
      title,
      cost,
      memo,
      mileage,
      maintenanceRecordImageUrls,
    });

    if (!validated.success) {
      console.error(validated.error.issues);
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    const data = {
      calenderDate: validated.data.calenderDate,
      isDone: validated.data.isDone,
      title: validated.data.title,
      cost: validated.data.cost,
      memo: validated.data.memo,
      mileage: validated.data.mileage,
    };

    if (
      // 所有バイクが選択されている場合
      validated.data.bikeId
    ) {
      Object.assign(data, {
        bike: {
          connect: {
            id: validated.data.bikeId,
          },
        },
      });
    } else if (
      // 所有バイクが未選択の場合
      validated.data.bikeId === null
    ) {
      Object.assign(data, {
        bikeId: null,
      });
    }

    if (
      // カテゴリーが選択されている場合
      validated.data.maintenanceCategoryId
    ) {
      Object.assign(data, {
        maintenanceCategory: {
          connect: {
            id: validated.data.maintenanceCategoryId,
          },
        },
      });
    } else if (
      // カテゴリーが未選択の場合
      validated.data.maintenanceCategoryId === null
    ) {
      Object.assign(data, {
        maintenanceCategoryId: null,
      });
    }

    // 画像の変更: 無しにした場合
    if (validated.data.maintenanceRecordImageUrls === null) {
      Object.assign(data, {
        maintenanceRecordImages: {
          updateMany: {
            where: {
              deletedAt: null,
            },
            data: {
              deletedAt: new Date(),
            },
          },
        },
      });
    }

    // 画像の変更: 別の画像にした場合
    if (
      validated.data.maintenanceRecordImageUrls &&
      validated.data.maintenanceRecordImageUrls?.length > 0
    ) {
      Object.assign(data, {
        maintenanceRecordImages: {
          updateMany: {
            where: {
              deletedAt: null,
            },
            data: {
              deletedAt: new Date(),
            },
          },
          create: validated.data.maintenanceRecordImageUrls.map((url) => {
            return { imageUrl: url };
          }),
        },
      });
    }

    const { id } = await context.params;
    const result = await prisma.maintenanceRecord.update({
      data,
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
  context: RouteContext<"/api/maintenance-records/[id]">,
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
    const result = await prisma.maintenanceRecord.update({
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
